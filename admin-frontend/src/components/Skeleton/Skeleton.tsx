import React from 'react';
import { cn } from '../../utils/cn';
import styles from './Skeleton.module.css';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: 'rect' | 'circle' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, shape = 'rect', ...props }) => {
  return <div className={cn(styles.skeleton, styles[shape], className)} {...props} />;
};
