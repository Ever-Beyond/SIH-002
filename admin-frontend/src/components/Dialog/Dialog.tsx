import React from 'react';
import { Modal, type ModalProps } from '../Modal';

export interface DialogProps extends Omit<ModalProps, 'title' | 'footer'> {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  isDestructive?: boolean;
}

export const Dialog: React.FC<DialogProps> = ({
  title, description, confirmLabel = 'Confirm', cancelLabel = 'Cancel', 
  onConfirm, isDestructive, children, ...props
}) => {
  const footer = (
    <>
      <button className="button outline" onClick={props.onClose}>{cancelLabel}</button>
      <button className={`button ${isDestructive ? 'danger' : 'primary'}`} onClick={onConfirm}>
        {confirmLabel}
      </button>
    </>
  );

  return (
    <Modal title={title} footer={footer} size="sm" {...props}>
      {description && <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>{description}</p>}
      {children}
    </Modal>
  );
};
