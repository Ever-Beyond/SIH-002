import React from 'react';
import { cn } from '../../utils/cn';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const checkboxId = id || Math.random().toString(36).substring(7);
    return (
      <div className={styles.wrapper}>
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            ref={ref}
            id={checkboxId}
            className={cn(styles.checkbox, error && styles.hasError, className)}
            {...props}
          />
          {label && <label htmlFor={checkboxId} className={styles.label}>{label}</label>}
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';
