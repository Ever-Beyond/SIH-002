/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { useSettings } from '../../features/admin/hooks/useSettings';
import { 
  SettingsTabs,
  SettingsForm
} from '../../features/admin/components';
import type { SettingsTab } from '../../features/admin/components';
import { ErrorState, Spinner, Button } from '../../components';
import type { SystemSettingsConfig } from '../../features/admin/types';

const SystemSettings = () => {
  const {
    settings,
    isLoading,
    isMutating,
    error,
    updateSettings
  } = useSettings();

  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [localSettings, setLocalSettings] = useState<SystemSettingsConfig | null>(null);

  // Sync local settings when loaded
  useEffect(() => {
    if (settings && !localSettings) {
      setLocalSettings(settings);
    }
  }, [settings, localSettings]);

  const handleSave = async () => {
    if (localSettings) {
      await updateSettings(localSettings);
    }
  };

  const handleDiscard = () => {
    if (settings) {
      setLocalSettings(settings);
    }
  };

  const hasChanges = settings && localSettings ? JSON.stringify(settings) !== JSON.stringify(localSettings) : false;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem', height: '100%' }}>
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-base)', margin: '0 0 0.5rem 0' }}>
            System Settings
          </h1>
          <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.875rem' }}>
            Global configurations and system preferences.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {hasChanges && (
            <Button variant="outline" onClick={handleDiscard} disabled={isMutating}>
              Discard Changes
            </Button>
          )}
          <Button variant="primary" onClick={handleSave} disabled={!hasChanges || isMutating}>
            {isMutating ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>

      {error && <ErrorState title="Error Loading Settings" message={error} style={{ marginBottom: '1.5rem' }} />}

      {isLoading || !localSettings ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          <Spinner />
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '2rem', flex: 1, minHeight: 0 }}>
          <SettingsTabs 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
          
          <SettingsForm 
            settings={localSettings}
            onChange={setLocalSettings}
            activeTab={activeTab}
          />
        </div>
      )}
    </div>
  );
};

export default SystemSettings;
