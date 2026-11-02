import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Bell, User, Settings, LogOut, ChevronRight } from 'lucide-react';
import { Dropdown, DropdownItem, Tooltip, Badge } from '../../components';
import { useAuth } from '../../contexts';
import styles from './Header.module.css';

export interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onMenuClick} aria-label="Toggle menu">
          <Menu size={20} />
        </button>
        <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
          {pathnames.map((value, index) => {
            const isLast = index === pathnames.length - 1;
            const title = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');
            return (
              <React.Fragment key={value}>
                <span className={isLast ? styles.crumbActive : styles.crumb} aria-current={isLast ? 'page' : undefined}>{title}</span>
                {!isLast && <ChevronRight size={16} className={styles.crumbSeparator} aria-hidden="true" />}
              </React.Fragment>
            );
          })}
        </nav>
      </div>
      <div className={styles.right}>
        <Tooltip content="Notifications" position="bottom">
          <button className={styles.iconBtn} aria-label="View notifications">
            <Bell size={20} />
            <Badge variant="danger" className={styles.notificationBadge}>3</Badge>
          </button>
        </Tooltip>
        
        <Dropdown 
          align="right"
          trigger={
            <button className={styles.userBtn} aria-label="User menu">
              <div className={styles.avatar} aria-hidden="true">{user?.name.charAt(0) || 'U'}</div>
              <span className={styles.userName}>{user?.name || 'User'}</span>
            </button>
          }
        >
          <div className={styles.dropdownHeader}>
            <strong>{user?.name || 'User'}</strong>
            <div style={{fontSize: '0.75rem', color: 'var(--color-text-muted)'}}>{user?.email || ''}</div>
          </div>
          <DropdownItem><User size={16} className={styles.dropdownIcon} /> Profile</DropdownItem>
          <DropdownItem><Settings size={16} className={styles.dropdownIcon} /> Settings</DropdownItem>
          <DropdownItem style={{ color: 'var(--color-danger)' }} onClick={handleLogout}><LogOut size={16} className={styles.dropdownIcon} /> Logout</DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
};
