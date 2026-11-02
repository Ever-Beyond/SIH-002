import { Card, Skeleton } from '../../components';
import { LineChart, BarChart } from '../../components/Charts';
import { useAnalytics } from '../../features/analytics/hooks/useAnalytics';
import { Clock, Truck, ShieldAlert, Activity } from 'lucide-react';

const KpiDashboard = () => {
  const { data, isLoading, error } = useAnalytics();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
      <div className="page-header">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-base)', margin: 0 }}>
          Analytics & KPIs
        </h1>
      </div>

      {/* Top Level Metric Cards */}
      <div className="grid-auto-fit">
        <Card style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)' }}>
            <Clock size={18} /> <span>Avg Delivery Time</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>
            {isLoading ? <Skeleton shape="text" style={{ width: '80px', height: '36px' }} /> : `${data?.delivery.averageDeliveryTimeHours.toFixed(1)}h`}
          </div>
        </Card>
        
        <Card style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)' }}>
            <Activity size={18} color="var(--color-warning)" /> <span>Avg Delay</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>
            {isLoading ? <Skeleton shape="text" style={{ width: '80px', height: '36px' }} /> : `${data?.delivery.averageDelayMinutes}m`}
          </div>
        </Card>
        
        <Card style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)' }}>
            <Truck size={18} color="var(--color-primary)" /> <span>Fleet Utilization</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>
            {isLoading ? <Skeleton shape="text" style={{ width: '80px', height: '36px' }} /> : `${data?.fleet.vehicleUtilizationPercent}%`}
          </div>
        </Card>
        
        <Card style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)' }}>
            <ShieldAlert size={18} color="var(--color-danger)" /> <span>Route Disruption</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>
            {isLoading ? <Skeleton shape="text" style={{ width: '80px', height: '36px' }} /> : `${data?.risk.routeDisruptionRatePercent}%`}
          </div>
        </Card>
      </div>

      <div className="grid-layout-1-1">
        {/* Delivery Trends Line Chart */}
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.125rem', margin: 0, fontWeight: 600 }}>7-Day Delivery Trends</h2>
          <LineChart 
            data={data?.delivery.deliveryTimeHistory || []}
            xKey="date"
            lines={[
              { dataKey: 'avgTime', name: 'Avg Delivery Time (h)', color: 'var(--color-primary)' },
              { dataKey: 'avgDelay', name: 'Avg Delay (m)', color: 'var(--color-warning)' }
            ]}
            isLoading={isLoading}
            error={error}
          />
        </Card>

        {/* Incidents by District Bar Chart */}
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.125rem', margin: 0, fontWeight: 600 }}>Incidents by District</h2>
          <BarChart 
            data={data?.incidents.incidentsByDistrict || []}
            xKey="district"
            bars={[
              { dataKey: 'count', name: 'Total Incidents', color: 'var(--color-danger)' }
            ]}
            isLoading={isLoading}
            error={error}
          />
        </Card>

        {/* Critical Corridor Risk */}
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.125rem', margin: 0, fontWeight: 600 }}>Critical Corridor Risk</h2>
          <BarChart 
            data={data?.risk.criticalCorridorRisk || []}
            xKey="corridor"
            bars={[
              { dataKey: 'riskLevel', name: 'Risk Level (0-10)', color: 'var(--color-danger)' }
            ]}
            isLoading={isLoading}
            error={error}
          />
        </Card>
        
        {/* District Accessibility */}
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.125rem', margin: 0, fontWeight: 600 }}>District Accessibility Score</h2>
          <BarChart 
            data={data?.risk.districtAccessibility || []}
            xKey="district"
            layout="vertical"
            bars={[
              { dataKey: 'score', name: 'Accessibility Score', color: 'var(--color-success)' }
            ]}
            isLoading={isLoading}
            error={error}
          />
        </Card>
      </div>
    </div>
  );
};

export default KpiDashboard;
