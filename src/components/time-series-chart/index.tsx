import { token } from '@/styled-system/tokens';
import { useId } from 'react';
import {
  Bar,
  BarChart,
  type BarProps,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { date: '2024-03-11', powerup: 30, quest: 20, villain: 10 },
  { date: '2024-03-12', powerup: 40, quest: 25, villain: 15 },
  { date: '2024-03-13', powerup: 35, quest: 30, villain: 20 },
  { date: '2024-03-14', powerup: 50, quest: 35, villain: 25 },
  { date: '2024-03-15', powerup: 60, quest: 40, villain: 30 },
] satisfies { date: string; powerup: number; quest: number; villain: number }[];

const CustomXTick = ({
  x,
  y,
  payload,
}: { x: number; y: number; payload: { value: string } }) => {
  const date = new Date(payload.value);
  const day = `${date.getDate()}`;
  const weekday = new Intl.DateTimeFormat('ja-JP', { weekday: 'short' }).format(
    date,
  );

  return (
    <g transform={`translate(${x},${y})`} fill="white">
      <text x={0} y={0} dy={10} textAnchor="middle" fill="white">
        {day}
      </text>
      <text x={0} y={20} dy={10} textAnchor="middle" fill="white">
        {weekday}
      </text>
    </g>
  );
};

const NeonBar = ({ fill, x, y, width, height }: BarProps) => {
  const id = useId();
  return (
    <>
      <defs>
        <filter id={id}>
          <feDropShadow
            in="SourceGraphic"
            dx="0"
            dy="0"
            stdDeviation="4"
            floodColor={fill}
          />
          <feDropShadow
            in="SourceGraphic"
            dx="0"
            dy="0"
            stdDeviation="8"
            floodColor={fill}
          />
        </filter>
      </defs>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        stroke={fill}
        strokeWidth={2}
        fill={fill}
        fillOpacity={0.2}
        filter={`url(#${id})`}
      />
    </>
  );
};

export const TimeSeriesChart = ({
  data,
}: {
  data: { date: string; powerup: number; quest: number; villain: number }[];
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        barCategoryGap={4}
        margin={{ top: 16, right: 16, left: -10, bottom: 10 }}
      >
        <XAxis
          interval={0}
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={(props) => <CustomXTick {...props} />}
        />
        <YAxis axisLine={false} tickLine={false} />
        <Bar
          fill={token('colors.yellow.300')}
          dataKey="powerup"
          stackId="a"
          shape={(props: BarProps) => <NeonBar {...props} />}
        />
        <Bar
          dataKey="quest"
          stackId="a"
          fill={token('colors.cyan.500')}
          shape={(props: BarProps) => <NeonBar {...props} />}
        />
        <Bar
          dataKey="villain"
          stackId="a"
          fill={token('colors.purple.600')}
          shape={(props: BarProps) => <NeonBar {...props} />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
