'use client';

import { type ComponentProps, useId } from 'react';
import {
  Bar,
  BarChart,
  type BarProps,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import type { DailyAchievements } from '@/app/(private)/_actions/types/weekly-achievements';
import { token } from '@/styled-system/tokens';

const CustomXTick = ({
  x,
  y,
  payload,
  custom,
}: {
  x: number;
  y: number;
  payload: { value: string };
  custom: ChartElement;
}) => {
  const date = new Date(payload.value);
  const day = `${date.getDate()}`;
  const weekday = new Intl.DateTimeFormat('ja-JP', { weekday: 'short' }).format(
    date,
  );
  const textColor =
    custom.status === 'achieved'
      ? token('colors.background')
      : custom.status === 'no-data'
        ? token('colors.foreground.disabled')
        : token('colors.foreground');
  return (
    <g transform={`translate(${x},${y})`}>
      {/* border */}
      <rect
        x={-14}
        y={-6}
        fill={custom.isToday ? token('colors.foreground') : 'transparent'}
        width={28}
        height={40}
      />
      {/* background */}
      <rect
        x={-12}
        y={-4}
        fill={
          custom.status === 'achieved'
            ? token('colors.foreground')
            : token('colors.background')
        }
        width={24}
        height={36}
      />
      <text
        x={0}
        y={0}
        dy={8}
        textAnchor="middle"
        fill={textColor}
        fontSize={14}
      >
        {day}
      </text>
      <text
        x={0}
        y={20}
        dy={8}
        textAnchor="middle"
        fill={textColor}
        fontSize={14}
      >
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

type ChartElement = {
  date: DailyAchievements['dateString'];
  isToday?: DailyAchievements['isToday'];
  status: DailyAchievements['status'];
  powerup: number;
  quest: number;
  villain: number;
  epicwin: number;
  posNegRatio?: number;
};

export const TimeSeriesChart = ({
  onClickBar,
  data,
  showPosNegRatio = false,
}: {
  onClickBar: (date: string) => void;
  data: ChartElement[];
  showPosNegRatio?: boolean;
}) => {
  if (showPosNegRatio) {
    return (
      <ResponsiveContainer width="100%" height={150}>
        <ComposedChart
          data={data}
          barCategoryGap={4}
          style={{ overflow: 'visible' }}
          margin={{ top: 4, right: -20, left: -20, bottom: 12 }}
        >
          <XAxis
            interval={0}
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={(props: ComponentProps<typeof CustomXTick>) => {
              const customProp = data.find(
                (d) => d.date === props.payload.value,
              );
              // biome-ignore lint/complexity/noUselessFragments: Rechartsの型制約により空fragmentが必要
              if (!customProp) return <></>;
              return <CustomXTick {...props} custom={customProp} />;
            }}
          />
          <YAxis
            yAxisId="left"
            orientation="left"
            axisLine={false}
            tickLine={false}
            domain={[0, 'dataMax']}
            tick={{ fill: token('colors.foreground.disabled'), fontSize: 14 }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            axisLine={false}
            tickLine={false}
            domain={[0, 1]}
            tick={{ fill: token('colors.foreground.disabled'), fontSize: 14 }}
          />
          <CartesianGrid
            vertical={false}
            stroke={token('colors.chart.grid')}
            strokeDasharray="5 5"
          />
          <Bar
            yAxisId="left"
            fill={token('colors.entity.powerup')}
            dataKey="powerup"
            stackId="a"
            shape={(props: BarProps) => <NeonBar {...props} />}
            onTouchStart={(_, index) => onClickBar(data[index].date)}
          />
          <Bar
            yAxisId="left"
            dataKey="quest"
            stackId="a"
            fill={token('colors.entity.quest')}
            shape={(props: BarProps) => <NeonBar {...props} />}
            onTouchStart={(_, index) => onClickBar(data[index].date)}
          />
          <Bar
            yAxisId="left"
            dataKey="villain"
            stackId="a"
            fill={token('colors.entity.villain')}
            shape={(props: BarProps) => <NeonBar {...props} />}
            onTouchStart={(_, index) => onClickBar(data[index].date)}
          />
          <Bar
            yAxisId="left"
            dataKey="epicwin"
            stackId="a"
            fill={token('colors.entity.epicwin')}
            shape={(props: BarProps) => <NeonBar {...props} />}
            onTouchStart={(_, index) => onClickBar(data[index].date)}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="posNegRatio"
            stroke={token('colors.foreground')}
            strokeWidth={2}
            dot={{
              fill: token('colors.foreground'),
              strokeWidth: 1,
              stroke: token('colors.background'),
              r: 4,
            }}
            connectNulls={true}
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={150}>
      <BarChart
        data={data}
        barCategoryGap={4}
        style={{ overflow: 'visible' }}
        margin={{ top: 4, right: 40, left: -20, bottom: 12 }}
      >
        <XAxis
          interval={0}
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={(props: ComponentProps<typeof CustomXTick>) => {
            const customProp = data.find((d) => d.date === props.payload.value);
            // biome-ignore lint/complexity/noUselessFragments: Rechartsの型制約により空fragmentが必要
            if (!customProp) return <></>;
            return <CustomXTick {...props} custom={customProp} />;
          }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          domain={[0, 'dataMax']}
          tick={{ fill: token('colors.foreground.disabled'), fontSize: 14 }}
        />
        <CartesianGrid
          vertical={false}
          stroke={token('colors.chart.grid')}
          strokeDasharray="5 5"
        />
        <Bar
          fill={token('colors.entity.powerup')}
          dataKey="powerup"
          stackId="a"
          shape={(props: BarProps) => <NeonBar {...props} />}
          onTouchStart={(_, index) => onClickBar(data[index].date)}
        />
        <Bar
          dataKey="quest"
          stackId="a"
          fill={token('colors.entity.quest')}
          shape={(props: BarProps) => <NeonBar {...props} />}
          onTouchStart={(_, index) => onClickBar(data[index].date)}
        />
        <Bar
          dataKey="villain"
          stackId="a"
          fill={token('colors.entity.villain')}
          shape={(props: BarProps) => <NeonBar {...props} />}
          onTouchStart={(_, index) => onClickBar(data[index].date)}
        />
        <Bar
          dataKey="epicwin"
          stackId="a"
          fill={token('colors.entity.epicwin')}
          shape={(props: BarProps) => <NeonBar {...props} />}
          onTouchStart={(_, index) => onClickBar(data[index].date)}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
