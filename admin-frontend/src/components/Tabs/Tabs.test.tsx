import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Tabs } from './Tabs';
import userEvent from '@testing-library/user-event';

describe('Tabs', () => {
  const mockTabs = [
    { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
    { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
    { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div> },
  ];

  it('renders default tab content', () => {
    const { getByText, getByRole } = render(<Tabs tabs={mockTabs} />);
    
    expect(getByText('Content 1')).toBeInTheDocument();
    
    const firstTabBtn = getByRole('tab', { name: 'Tab 1' });
    expect(firstTabBtn).toHaveAttribute('aria-selected', 'true');
  });

  it('changes content on click', () => {
    const { getByText, getByRole, queryByText } = render(<Tabs tabs={mockTabs} />);
    
    const secondTabBtn = getByRole('tab', { name: 'Tab 2' });
    fireEvent.click(secondTabBtn);
    
    expect(getByText('Content 2')).toBeInTheDocument();
    expect(queryByText('Content 1')).not.toBeInTheDocument();
    expect(secondTabBtn).toHaveAttribute('aria-selected', 'true');
  });

  it('supports keyboard navigation', async () => {
    const { getByRole, getByText } = render(<Tabs tabs={mockTabs} />);
    const firstTabBtn = getByRole('tab', { name: 'Tab 1' });
    
    firstTabBtn.focus();
    
    await userEvent.keyboard('{ArrowRight}');
    expect(getByText('Content 2')).toBeInTheDocument();
    expect(getByRole('tab', { name: 'Tab 2' })).toHaveFocus();
    
    await userEvent.keyboard('{ArrowLeft}');
    expect(getByText('Content 1')).toBeInTheDocument();
    expect(getByRole('tab', { name: 'Tab 1' })).toHaveFocus();
  });
});
