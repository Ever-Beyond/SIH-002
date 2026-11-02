import React from 'react';
import { cn } from '../../utils/cn';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || Math.random().toString(36).substring(7);
    return (
      <div className={styles.wrapper}>
        {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
        <input
          ref={ref}
          id={inputId}
          className={cn(styles.input, error && styles.hasError, className)}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        {error && <p id={`${inputId}-error`} className={styles.errorText} role="alert">{error}</p>}
        {helperText && !error && <p id={`${inputId}-helper`} className={styles.helperText}>{helperText}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
