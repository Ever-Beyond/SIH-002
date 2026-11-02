import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import styles from './Spinner.module.css';

export interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
}

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48
};

export const Spinner: React.FC<SpinnerProps> = ({ className, size = 'md', ...props }) => {
  const numericSize = typeof size === 'string' ? sizeMap[size] : size;
  return (
    <Loader2 className={cn(styles.spinner, className)} size={numericSize} {...props} />
  );
};
