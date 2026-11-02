import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';
import { ShieldAlert } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.leftPane}>
        <div className={styles.brand}>
          <ShieldAlert size={48} color="white" />
          <h1 className={styles.brandName}>NER-SHIELD</h1>
          <p className={styles.brandTagline}>AI-Based Smart Logistics & Accessibility Intelligence</p>
        </div>
        <div className={styles.overlay} />
      </div>
      
      <div className={styles.rightPane}>
        <Outlet />
      </div>
    </div>
  );
};
