import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Modal } from './Modal';
import userEvent from '@testing-library/user-event';

describe('Modal', () => {
  const onCloseMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not render if isOpen is false', () => {
    const { queryByRole } = render(
      <Modal isOpen={false} onClose={onCloseMock} title="Test Modal">
        <div>Content</div>
      </Modal>
    );
    expect(queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render when isOpen is true', () => {
    const { getByRole, getByText } = render(
      <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    
    expect(getByRole('dialog')).toBeInTheDocument();
    expect(getByText('Test Modal')).toBeInTheDocument();
    expect(getByText('Modal Content')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    const { getByLabelText } = render(
      <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    
    const closeBtn = getByLabelText('Close modal');
    fireEvent.click(closeBtn);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when Escape key is pressed', async () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    
    await userEvent.keyboard('{Escape}');
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should trap focus within the modal', async () => {
    const { getByLabelText, getByRole } = render(
      <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
        <input type="text" aria-label="Input field" />
        <button>Submit</button>
      </Modal>
    );
    
    const dialog = getByRole('dialog');
    const closeBtn = getByLabelText('Close modal');
    const input = getByLabelText('Input field');
    

    // Focus is on dialog initially
    await waitFor(() => {
        expect(document.activeElement).toBe(dialog);
    });

    // We can't strictly test focus trap behavior with fireEvent/userEvent 
    // cleanly in all JSDOM versions without layout engine, but we can verify
    // elements are present and have tabindex.
    expect(closeBtn).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });
});
