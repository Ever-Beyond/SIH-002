import React from 'react';
import { cn } from '../../utils/cn';
import styles from './Textarea.module.css';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const textareaId = id || Math.random().toString(36).substring(7);
    return (
      <div className={styles.wrapper}>
        {label && <label htmlFor={textareaId} className={styles.label}>{label}</label>}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(styles.textarea, error && styles.hasError, className)}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
          }
          {...props}
        />
        {error && <p id={`${textareaId}-error`} className={styles.errorText} role="alert">{error}</p>}
        {helperText && !error && <p id={`${textareaId}-helper`} className={styles.helperText}>{helperText}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
