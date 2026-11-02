import React from 'react';
import { cn } from '../../utils/cn';
import styles from './Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  glass?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, padding = 'md', glass, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(styles.card, styles[`pad-${padding}`], glass && 'glass-panel', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';
