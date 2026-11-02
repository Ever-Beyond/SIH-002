import React from 'react';
import { Settings, Bell, Map, AlertTriangle, Sliders } from 'lucide-react';

export type SettingsTab = 'general' | 'notifications' | 'map' | 'risk' | 'preferences';

interface SettingsTabsProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

const TABS: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
  { id: 'general', label: 'General Info', icon: <Settings size={18} /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
  { id: 'map', label: 'Map Settings', icon: <Map size={18} /> },
  { id: 'risk', label: 'Risk Thresholds', icon: <AlertTriangle size={18} /> },
  { id: 'preferences', label: 'Preferences', icon: <Sliders size={18} /> },
];

export const SettingsTabs: React.FC<SettingsTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '250px' }}>
      {TABS.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            border: 'none',
            background: activeTab === tab.id ? 'var(--color-primary-subtle)' : 'transparent',
            color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-base)',
            fontWeight: activeTab === tab.id ? 600 : 400,
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.2s ease'
          }}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};
