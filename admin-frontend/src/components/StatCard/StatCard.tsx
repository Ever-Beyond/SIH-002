import React from 'react';
import { cn } from '../../utils/cn';
import { Card } from '../Card';
import styles from './StatCard.module.css';

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatCard: React.FC<StatCardProps> = ({
  className, title, value, icon, trend, ...props
}) => {
  return (
    <Card className={cn(styles.statCard, className)} {...props}>
      <div className={styles.header}>
        <h4 className={styles.title}>{title}</h4>
        {icon && <div className={styles.icon}>{icon}</div>}
      </div>
      <div className={styles.content}>
        <div className={styles.value}>{value}</div>
        {trend && (
          <div className={cn(styles.trend, trend.isPositive ? styles.positive : styles.negative)}>
            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
          </div>
        )}
      </div>
    </Card>
  );
};
