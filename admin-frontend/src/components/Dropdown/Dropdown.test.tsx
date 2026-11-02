import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Dropdown, DropdownItem } from './Dropdown';
import userEvent from '@testing-library/user-event';

describe('Dropdown', () => {
  it('should not render children when closed', () => {
    const { queryByText } = render(
      <Dropdown trigger={<button>Open</button>}>
        <DropdownItem>Item 1</DropdownItem>
      </Dropdown>
    );
    expect(queryByText('Item 1')).not.toBeInTheDocument();
  });

  it('should render children when clicked', () => {
    const { getByText, getByRole } = render(
      <Dropdown trigger={<span>Open</span>}>
        <DropdownItem>Item 1</DropdownItem>
      </Dropdown>
    );
    
    const trigger = getByRole('button', { name: 'Open' });
    fireEvent.click(trigger);
    
    expect(getByText('Item 1')).toBeInTheDocument();
  });

  it('should toggle on Enter or Space key', async () => {
    const { getByText, queryByText } = render(
      <Dropdown trigger={<span>Open</span>}>
        <DropdownItem>Item 1</DropdownItem>
      </Dropdown>
    );
    
    const container = getByText('Open').parentElement!;
    container.focus();
    
    await userEvent.keyboard('{Enter}');
    expect(getByText('Item 1')).toBeInTheDocument();
    
    await userEvent.keyboard('{Escape}');
    expect(queryByText('Item 1')).not.toBeInTheDocument();
  });

  it('should close on outside click', () => {
    const { getByText, getByRole, queryByText } = render(
      <div>
        <div data-testid="outside">Outside</div>
        <Dropdown trigger={<span>Open</span>}>
          <DropdownItem>Item 1</DropdownItem>
        </Dropdown>
      </div>
    );
    
    const trigger = getByRole('button', { name: 'Open' });
    fireEvent.click(trigger);
    expect(getByText('Item 1')).toBeInTheDocument();
    
    fireEvent.mouseDown(getByText('Outside'));
    expect(queryByText('Item 1')).not.toBeInTheDocument();
  });
});
