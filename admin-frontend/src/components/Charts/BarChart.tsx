import React from 'react';
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ChartContainer } from './ChartContainer';

interface BarChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  bars: { dataKey: string; color: string; name?: string }[];
  isLoading?: boolean;
  error?: string | null;
  height?: number | string;
  layout?: 'horizontal' | 'vertical';
}

export const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  xKey, 
  bars, 
  isLoading, 
  error, 
  height = 300,
  layout = 'horizontal'
}) => {
  const isEmpty = !data || data.length === 0;

  return (
    <ChartContainer isLoading={isLoading} error={error} isEmpty={isEmpty} height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} layout={layout} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          {layout === 'horizontal' ? (
            <>
              <XAxis dataKey={xKey} stroke="var(--color-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
            </>
          ) : (
            <>
              <XAxis type="number" stroke="var(--color-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey={xKey} type="category" stroke="var(--color-text-muted)" fontSize={12} tickLine={false} axisLine={false} width={100} />
            </>
          )}
          <Tooltip 
            cursor={{ fill: 'var(--color-bg-subtle)' }}
            contentStyle={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}
          />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
          {bars.map((bar, idx) => (
            <Bar key={idx} dataKey={bar.dataKey} name={bar.name || bar.dataKey} fill={bar.color} radius={[4, 4, 0, 0]} />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
