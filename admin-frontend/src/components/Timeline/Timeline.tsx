import type { ReactNode } from 'react';
import styles from './Timeline.module.css';
import { cn } from '../../utils/cn';
import { Clock } from 'lucide-react';

interface TimelineProps {
  children: ReactNode;
  className?: string;
}

export const Timeline = ({ children, className }: TimelineProps) => {
  return (
    <ul className={cn(styles.timeline, className)}>
      {children}
    </ul>
  );
};

interface TimelineItemProps {
  title: string;
  description?: string;
  timestamp: string;
  status?: 'success' | 'warning' | 'danger' | 'neutral' | 'primary';
  icon?: ReactNode;
}

export const TimelineItem = ({ title, description, timestamp, status = 'primary', icon }: TimelineItemProps) => {
  
  const getNodeClass = () => {
    switch(status) {
      case 'success': return styles.nodeSuccess;
      case 'warning': return styles.nodeWarning;
      case 'danger': return styles.nodeDanger;
      case 'neutral': return styles.nodeNeutral;
      default: return '';
    }
  };

  return (
    <li className={styles.timelineItem}>
      <div className={cn(styles.node, getNodeClass())}>
        {icon || <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'currentColor' }} />}
      </div>
      <div className={styles.content}>
        <h4 className={styles.title}>{title}</h4>
        {description && <p className={styles.description}>{description}</p>}
        <span className={styles.timestamp}>
          <Clock size={12} />
          {timestamp}
        </span>
      </div>
    </li>
  );
};
