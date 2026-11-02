import React, { useEffect } from 'react';
import { useNotificationStore, type Toast } from '../store/notificationStore';
import { AlertCircle, CheckCircle, Info, X, XCircle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useNotificationStore();

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      zIndex: 9999,
      pointerEvents: 'none' // Let clicks pass through empty space
    }}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: Toast; onDismiss: () => void }> = ({ toast, onDismiss }) => {
  // Auto dismiss after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success': return <CheckCircle size={20} color="#10b981" />;
      case 'error': return <XCircle size={20} color="#ef4444" />;
      case 'warning': return <AlertCircle size={20} color="#f59e0b" />;
      default: return <Info size={20} color="#3b82f6" />;
    }
  };

  const getBackgroundColor = () => {
    const isDark = document.documentElement.classList.contains('dark');
    return isDark ? '#1f2937' : '#ffffff';
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success': return '#10b981';
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      default: return '#3b82f6';
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      backgroundColor: getBackgroundColor(),
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      borderLeft: `4px solid ${getBorderColor()}`,
      minWidth: '300px',
      maxWidth: '400px',
      pointerEvents: 'auto', // Re-enable pointer events for the toast itself
      animation: 'slideInRight 0.3s ease-out forwards'
    }}>
      <div style={{ marginTop: '2px' }}>
        {getIcon()}
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: 'var(--color-text-base)' }}>
          {toast.title}
        </h4>
        <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
          {toast.message}
        </p>
      </div>
      <button 
        onClick={onDismiss}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          color: 'var(--color-text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4px'
        }}
      >
        <X size={16} />
      </button>
      
      {/* Basic animation styles injected directly */}
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
