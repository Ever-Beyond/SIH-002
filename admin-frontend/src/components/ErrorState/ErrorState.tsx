import React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from '../Button';
import styles from './ErrorState.module.css';

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  className, title = 'An error occurred', message, onRetry, ...props
}) => {
  return (
    <div className={cn(styles.errorState, className)} {...props}>
      <AlertCircle className={styles.icon} size={32} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
      {onRetry && <Button variant="outline" onClick={onRetry} className={styles.retryBtn}>Try Again</Button>}
    </div>
  );
};
