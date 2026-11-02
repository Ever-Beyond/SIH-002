import React from 'react';
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ChartContainer } from './ChartContainer';

interface LineChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  lines: { dataKey: string; color: string; name?: string }[];
  isLoading?: boolean;
  error?: string | null;
  height?: number | string;
}

export const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  xKey, 
  lines, 
  isLoading, 
  error, 
  height = 300 
}) => {
  const isEmpty = !data || data.length === 0;

  return (
    <ChartContainer isLoading={isLoading} error={error} isEmpty={isEmpty} height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey={xKey} stroke="var(--color-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="var(--color-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}
          />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
          {lines.map((line, idx) => (
            <Line 
              key={idx} 
              type="monotone" 
              dataKey={line.dataKey} 
              name={line.name || line.dataKey} 
              stroke={line.color} 
              strokeWidth={3}
              activeDot={{ r: 6 }} 
              dot={false}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
