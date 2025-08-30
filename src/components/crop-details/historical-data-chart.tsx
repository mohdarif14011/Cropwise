'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Line, ComposedChart, Legend, Tooltip } from 'recharts';
import type { HistoricalDataPoint } from '@/lib/types';
import { ChartContainer, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';

interface HistoricalDataChartProps {
  data: HistoricalDataPoint[];
}

const chartConfig = {
  temperature: {
    label: 'Temperature (°C)',
    color: 'hsl(var(--chart-1))',
  },
  humidity: {
    label: 'Humidity (%)',
    color: 'hsl(var(--chart-2))',
  },
};

export default function HistoricalDataChart({ data }: HistoricalDataChartProps) {
    const formattedData = data.map(d => ({
        ...d,
        date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }));

  return (
    <ChartContainer config={chartConfig} className="h-72 w-full">
        <ComposedChart data={formattedData}>
            <CartesianGrid vertical={false} />
            <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 6)}
            />
             <YAxis yAxisId="left" stroke="hsl(var(--chart-1))" />
             <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend content={<ChartLegendContent />} />
            <Line type="monotone" dataKey="temperature" yAxisId="left" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false}/>
            <Bar dataKey="humidity" yAxisId="right" fill="hsl(var(--chart-2))" radius={4} />
      </ComposedChart>
    </ChartContainer>
  );
}
