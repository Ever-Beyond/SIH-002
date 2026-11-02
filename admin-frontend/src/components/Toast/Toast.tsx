/* eslint-disable react-refresh/only-export-components */
import React, { type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react';
import { cn } from '../../utils/cn';
import styles from './Toast.module.css';
import { useNotificationStore } from '../../store/notificationStore';
import type { Toast } from '../../store/notificationStore';

// We export ToastProvider purely as a wrapper that mounts the portal.
// Components should use useNotificationStore().addToast directly,
// but we provide useToast for legacy compatibility.
export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const toasts = useNotificationStore((state) => state.toasts);
  const removeToast = useNotificationStore((state) => state.removeToast);

  return (
    <>
      {children}
      {createPortal(
        <div className={styles.toastContainer}>
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
          ))}
        </div>,
        document.body
      )}
    </>
  );
};

export const useToast = () => {
  const { addToast, removeToast } = useNotificationStore();
  return { addToast, removeToast };
};

const ToastItem: React.FC<{ toast: Toast; onRemove: () => void }> = ({ toast, onRemove }) => {
  const icons = {
    success: <CheckCircle className={styles.iconSuccess} size={20} />,
    error: <XCircle className={styles.iconError} size={20} />,
    warning: <AlertTriangle className={styles.iconWarning} size={20} />,
    info: <Info className={styles.iconInfo} size={20} />,
  };

  return (
    <div className={cn(styles.toast, styles[toast.type])}>
      <div className={styles.iconWrapper}>{icons[toast.type]}</div>
      <div className={styles.content}>
        <div className={styles.title}>{toast.title}</div>
        {toast.message && <div className={styles.message}>{toast.message}</div>}
      </div>
      <button className={styles.closeBtn} onClick={onRemove}>
        <X size={16} />
      </button>
    </div>
  );
};
