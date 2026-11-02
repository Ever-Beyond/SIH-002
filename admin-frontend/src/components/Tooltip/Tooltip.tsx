import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import styles from './Tooltip.module.css';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content, children, position = 'top', className
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className={styles.container}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={cn(styles.tooltip, styles[position], className)} role="tooltip">
          {content}
        </div>
      )}
    </div>
  );
};
