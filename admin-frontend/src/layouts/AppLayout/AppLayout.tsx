import React, { useState, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { Header } from '../Header';
import { Spinner } from '../../components';
import styles from './AppLayout.module.css';

export const AppLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className={styles.mainContent}>
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className={styles.pageContent}>
          <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><Spinner size="lg" /></div>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};
