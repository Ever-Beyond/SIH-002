import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Map, Users, Truck, AlertTriangle, 
  ShieldAlert, BarChart3, Settings, Shield, 
  MapPin, BrainCircuit, LocateFixed
} from 'lucide-react';
import { cn } from '../../utils/cn';
import styles from './Sidebar.module.css';

export interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <div className={cn(styles.overlay, isOpen && styles.overlayOpen)} onClick={onClose} />
      <aside className={cn(styles.sidebar, isOpen && styles.sidebarOpen)}>
        <div className={styles.logoContainer}>
          <ShieldAlert className={styles.logoIcon} size={28} />
          <h2 className={styles.logoText}>NER-SHIELD</h2>
        </div>
        
        <nav className={styles.nav} aria-label="Main Navigation">
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Overview</div>
            <NavLink to="/dashboard" onClick={onClose} className={({ isActive }) => cn(styles.link, isActive && styles.active)}>
              <LayoutDashboard size={18} /> Dashboard
            </NavLink>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Fleet & Logistics</div>
            <NavLink to="/fleet/live" onClick={onClose} className={({ isActive }) => cn(styles.link, isActive && styles.active)}>
              <LocateFixed size={18} /> Live Tracking
            </NavLink>
            <NavLink to="/fleet/drivers" onClick={onClose} className={({ isActive }) => cn(styles.link, isActive && styles.active)}>
              <Users size={18} /> Drivers
            </NavLink>
            <NavLink to="/logistics/shipments" onClick={onClose} className={({ isActive }) => cn(styles.link, isActive && styles.active)}>
              <Truck size={18} /> Shipments
            </NavLink>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Operations</div>
            <NavLink to="/accessibility/map" onClick={onClose} className={({ isActive }) => cn(styles.link, isActive && styles.active)}>
              <Map size={18} /> Accessibility GIS
            </NavLink>
            <NavLink to="/incidents" onClick={onClose} className={({ isActive }) => cn(styles.link, isActive && styles.active)}>
              <AlertTriangle size={18} /> Incidents
            </NavLink>
            <NavLink to="/emergency" onClick={onClose} className={({ isActive }) => cn(styles.link, isActive && styles.active)}>
              <ShieldAlert size={18} /> Command Center
            </NavLink>
            <NavLink to="/emergency/simulation" onClick={onClose} className={({ isActive }) => cn(styles.link, isActive && styles.active)}>
              <BrainCircuit size={18} /> Simulation Engine
            </NavLink>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>AI & Analytics</div>
            <NavLink to="/ai/predictions" onClick={onClose} className={({ isActive }) => cn(styles.link, isActive && styles.active)}>
              <BrainCircuit size={18} /> AI Dashboard
            </NavLink>
            <NavLink to="/ai/routes" onClick={onClose} className={({ isActive }) => cn(styles.link, isActive && styles.active)}>
              <Map size={18} /> AI Routes
            </NavLink>
            <NavLink to="/ai/risk-corridors" onClick={onClose} className={({ isActive }) => cn(styles.link, isActive && styles.active)}>
              <MapPin size={18} /> Risk Corridors
            </NavLink>
            <NavLink to="/analytics" end onClick={onClose} className={({ isActive }) => cn(styles.link, isActive && styles.active)}>
              <BarChart3 size={18} /> Analytics
            </NavLink>
            <NavLink to="/analytics/reports" onClick={onClose} className={({ isActive }) => cn(styles.link, isActive && styles.active)}>
              <BarChart3 size={18} /> Reports
            </NavLink>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Administration</div>
            <NavLink to="/admin/users" onClick={onClose} className={({ isActive }) => cn(styles.link, isActive && styles.active)}>
              <Users size={18} /> Users
            </NavLink>
            <NavLink to="/admin/roles" onClick={onClose} className={({ isActive }) => cn(styles.link, isActive && styles.active)}>
              <Shield size={18} /> Roles
            </NavLink>
            <NavLink to="/admin/settings" onClick={onClose} className={({ isActive }) => cn(styles.link, isActive && styles.active)}>
              <Settings size={18} /> Settings
            </NavLink>
          </div>
        </nav>
      </aside>
    </>
  );
};
