import React from 'react';
import { Card } from '../../../components';
import { MapPin, ShieldAlert, Truck, Package, AlertOctagon } from 'lucide-react';
import type { EmergencyData } from '../types';

interface EmergencyStatsGridProps {
  data: EmergencyData;
}

export const EmergencyStatsGrid: React.FC<EmergencyStatsGridProps> = ({ data }) => {
  const stats = [
    { label: 'Active Incidents', value: data.activeIncidents, icon: <AlertOctagon size={24} color="var(--color-danger)" /> },
    { label: 'Affected Districts', value: data.affectedDistricts.length, icon: <MapPin size={24} color="var(--color-warning)" /> },
    { label: 'Blocked Routes', value: data.blockedRoutes.length, icon: <ShieldAlert size={24} color="var(--color-danger)" /> },
    { label: 'Affected Vehicles', value: data.affectedVehicles.length, icon: <Truck size={24} color="var(--color-primary)" /> },
    { label: 'Critical Shipments', value: data.criticalShipments.length, icon: <Package size={24} color="var(--color-warning)" /> }
  ];

  return (
    <div className="grid-auto-fit" style={{ gap: '1rem' }}>
      {stats.map((stat, idx) => (
        <Card key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-full)' }}>
            {stat.icon}
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1 }}>{stat.value}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{stat.label}</div>
          </div>
        </Card>
      ))}
    </div>
  );
};
