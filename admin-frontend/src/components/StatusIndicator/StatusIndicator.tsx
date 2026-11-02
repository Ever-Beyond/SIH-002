import React from 'react';
import { cn } from '../../utils/cn';
import styles from './StatusIndicator.module.css';

export interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: 'online' | 'offline' | 'warning' | 'idle';
  pulse?: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  className, status = 'idle', pulse = false, ...props
}) => {
  return (
    <div className={cn(styles.indicator, styles[status], pulse && styles.pulse, className)} {...props} />
  );
};
