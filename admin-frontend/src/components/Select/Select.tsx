import React from 'react';
import { cn } from '../../utils/cn';
import styles from './Select.module.css';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { label: string; value: string | number }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, id, options, ...props }, ref) => {
    const selectId = id || Math.random().toString(36).substring(7);
    return (
      <div className={styles.wrapper}>
        {label && <label htmlFor={selectId} className={styles.label} style={{ color: 'inherit' }}>{label}</label>}
        <select
          ref={ref}
          id={selectId}
          className={cn(styles.select, error && styles.hasError, className)}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
          }
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {error && <p id={`${selectId}-error`} className={styles.errorText} role="alert">{error}</p>}
        {helperText && !error && <p id={`${selectId}-helper`} className={styles.helperText}>{helperText}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';
