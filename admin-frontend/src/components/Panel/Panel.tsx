import React from 'react';
import { cn } from '../../utils/cn';
import styles from './Panel.module.css';

export interface PanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  headerAction?: React.ReactNode;
}

export const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ className, title, headerAction, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(styles.panel, className)} {...props}>
        {(title || headerAction) && (
          <div className={styles.header}>
            <div className={styles.title}>{title}</div>
            {headerAction && <div className={styles.action}>{headerAction}</div>}
          </div>
        )}
        <div className={styles.content}>{children}</div>
      </div>
    );
  }
);
Panel.displayName = 'Panel';
