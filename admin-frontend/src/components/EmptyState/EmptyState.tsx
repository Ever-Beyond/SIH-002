import React from 'react';
import { FileQuestion } from 'lucide-react';
import { cn } from '../../utils/cn';
import styles from './EmptyState.module.css';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  className, title, description, icon = <FileQuestion size={48} />, action, ...props
}) => {
  return (
    <div className={cn(styles.emptyState, className)} {...props}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
};
