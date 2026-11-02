import React from 'react';
import { Card, Input, Select } from '../../../components';
import type { SystemSettingsConfig } from '../types';

interface SettingsFormProps {
  settings: SystemSettingsConfig;
  onChange: (settings: SystemSettingsConfig) => void;
  activeTab: string;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ settings, onChange, activeTab }) => {
  
  const updateGeneral = (field: keyof SystemSettingsConfig['general'], value: string) => {
    onChange({ ...settings, general: { ...settings.general, [field]: value } });
  };

  const updateNotifications = (field: keyof SystemSettingsConfig['notifications'], value: boolean) => {
    onChange({ ...settings, notifications: { ...settings.notifications, [field]: value } });
  };

  const updateMap = <K extends keyof SystemSettingsConfig['map']>(field: K, value: SystemSettingsConfig['map'][K]) => {
    onChange({ ...settings, map: { ...settings.map, [field]: value } });
  };

  const updateRisk = (field: keyof SystemSettingsConfig['risk'], value: number) => {
    onChange({ ...settings, risk: { ...settings.risk, [field]: value } });
  };

  const updatePreferences = (field: keyof SystemSettingsConfig['preferences'], value: string) => {
    onChange({ ...settings, preferences: { ...settings.preferences, [field]: value } });
  };

  // Helper for rendering a boolean toggle switch
  const renderToggle = (label: string, checked: boolean, onChange: (val: boolean) => void) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
      <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{label}</span>
      <label style={{ position: 'relative', display: 'inline-block', width: '40px', height: '24px' }}>
        <input 
          type="checkbox" 
          checked={checked} 
          onChange={e => onChange(e.target.checked)} 
          style={{ opacity: 0, width: 0, height: 0 }}
        />
        <span style={{
          position: 'absolute',
          cursor: 'pointer',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: checked ? 'var(--color-primary)' : 'var(--color-border)',
          transition: '.4s',
          borderRadius: '24px'
        }}>
          <span style={{
            position: 'absolute',
            content: '""',
            height: '16px',
            width: '16px',
            left: checked ? '20px' : '4px',
            bottom: '4px',
            backgroundColor: 'white',
            transition: '.4s',
            borderRadius: '50%'
          }} />
        </span>
      </label>
    </div>
  );

  return (
    <Card style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
      
      {activeTab === 'general' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '500px' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>General Information</h3>
          <Input 
            label="Organization Name" 
            value={settings.general.organizationName} 
            onChange={e => updateGeneral('organizationName', e.target.value)} 
          />
          <Input 
            label="Support Email" 
            type="email"
            value={settings.general.supportEmail} 
            onChange={e => updateGeneral('supportEmail', e.target.value)} 
          />
        </div>
      )}

      {activeTab === 'notifications' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '500px' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>Notification Channels</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {renderToggle('Enable Email Alerts', settings.notifications.emailAlerts, v => updateNotifications('emailAlerts', v))}
            {renderToggle('Enable SMS Alerts', settings.notifications.smsAlerts, v => updateNotifications('smsAlerts', v))}
            {renderToggle('Enable In-App Desktop Notifications', settings.notifications.inAppAlerts, v => updateNotifications('inAppAlerts', v))}
          </div>
        </div>
      )}

      {activeTab === 'map' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '500px' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>Map Behaviors</h3>
          <Select 
            label="Default Map View"
            value={settings.map.defaultView}
            onChange={e => updateMap('defaultView', e.target.value as 'satellite' | 'terrain' | 'street')}
            options={[
              { label: 'Satellite', value: 'satellite' },
              { label: 'Terrain', value: 'terrain' },
              { label: 'Street', value: 'street' }
            ]}
          />
          <Input 
            label="Auto-Refresh Interval (seconds)" 
            type="number"
            min={10}
            max={300}
            value={settings.map.refreshInterval.toString()} 
            onChange={e => updateMap('refreshInterval', parseInt(e.target.value))} 
          />
          <div style={{ marginTop: '0.5rem' }}>
            {renderToggle('Show Traffic Overlay by Default', settings.map.showTrafficOverlay, v => updateMap('showTrafficOverlay', v))}
          </div>
        </div>
      )}

      {activeTab === 'risk' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '500px' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>Risk Thresholds</h3>
          <Input 
            label="Critical Incident Severity Threshold (0-100)" 
            type="number"
            min={1}
            max={100}
            value={settings.risk.criticalIncidentThreshold.toString()} 
            onChange={e => updateRisk('criticalIncidentThreshold', parseInt(e.target.value))} 
          />
          <p style={{ margin: '-1rem 0 0 0', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            Incidents scoring above this threshold will trigger emergency protocols.
          </p>
          
          <Input 
            label="High Risk Corridor Score (0-100)" 
            type="number"
            min={1}
            max={100}
            value={settings.risk.highRiskCorridorScore.toString()} 
            onChange={e => updateRisk('highRiskCorridorScore', parseInt(e.target.value))} 
          />
          <p style={{ margin: '-1rem 0 0 0', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            Corridors scoring above this threshold will be flagged in red on the map.
          </p>
        </div>
      )}

      {activeTab === 'preferences' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '500px' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>System Preferences</h3>
          <Select 
            label="System Language"
            value={settings.preferences.language}
            onChange={e => updatePreferences('language', e.target.value as 'en' | 'hi' | 'as')}
            options={[
              { label: 'English', value: 'en' },
              { label: 'Hindi', value: 'hi' },
              { label: 'Assamese', value: 'as' }
            ]}
          />
          <Select 
            label="Timezone"
            value={settings.preferences.timezone}
            onChange={e => updatePreferences('timezone', e.target.value)}
            options={[
              { label: 'Asia/Kolkata (IST)', value: 'Asia/Kolkata' },
              { label: 'UTC', value: 'UTC' }
            ]}
          />
          <Select 
            label="Theme Preference"
            value={settings.preferences.theme}
            onChange={e => updatePreferences('theme', e.target.value as 'light' | 'dark' | 'system')}
            options={[
              { label: 'System Default', value: 'system' },
              { label: 'Light', value: 'light' },
              { label: 'Dark', value: 'dark' }
            ]}
          />
        </div>
      )}

    </Card>
  );
};
