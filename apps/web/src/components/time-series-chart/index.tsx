'use client';

import { type ComponentProps, useId, useMemo } from 'react';
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

const getTickInterval = (dataLength: number): number => {
  // 31日以上は月初のみ表示するため、interval=0で全てレンダリング
  if (dataLength > 30) return 0;
  // 約7つのラベルが表示されるよう動的に計算
  return Math.max(0, Math.ceil(dataLength / 7) - 1);
};

const getTickSize = (
  dataLength: number,
): { width: number; height: number; fontSize: number } => {
  if (dataLength <= 7) return { width: 28, height: 40, fontSize: 14 };
  if (dataLength <= 14) return { width: 24, height: 36, fontSize: 12 };
  if (dataLength <= 30) return { width: 20, height: 32, fontSize: 11 };
  // 31日以上は月名のみ表示
  return { width: 0, height: 20, fontSize: 11 };
};

// 日付文字列をローカルタイムゾーンの日付としてパース
// 対応フォーマット: YYYY/M/D または YYYY-MM-DD
const parseDateString = (dateString: string): Date => {
  const separator = dateString.includes('/') ? '/' : '-';
  const [year, month, day] = dateString.split(separator).map(Number);
  return new Date(year, month - 1, day);
};

const CustomXTick = ({
  x,
  y,
  payload,
  custom,
  tickSize,
  dataLength,
  isFirstData,
}: {
  x: number;
  y: number;
  payload: { value: string };
  custom: ChartElement;
  tickSize: { width: number; height: number; fontSize: number };
  dataLength: number;
  isFirstData: boolean;
}) => {
  const date = parseDateString(payload.value);
  const dayOfMonth = date.getDate();

  // 31日以上の場合は月初または左端のみ月名を表示
  if (dataLength > 30) {
    // 月初（1日〜3日）または最初のデータの場合のみ月名を表示
    if ((dayOfMonth <= 3 && dayOfMonth >= 1) || isFirstData) {
      const monthName = new Intl.DateTimeFormat('ja-JP', {
        month: 'short',
      }).format(date);
      return (
        <g transform={`translate(${x},${y})`}>
          <rect
            x={-20}
            y={-4}
            fill={token('colors.background')}
            width={40}
            height={20}
          />
          <text
            x={0}
            y={8}
            textAnchor="middle"
            fill={token('colors.foreground')}
            fontSize={11}
          >
            {monthName}
          </text>
        </g>
      );
    }
    // 月初以外は何も表示しない
    // biome-ignore lint/complexity/noUselessFragments: Rechartsの型制約により空fragmentが必要
    return <></>;
  }

  // 30日以下は従来の表示
  const day = `${dayOfMonth}`;
  const weekday = new Intl.DateTimeFormat('ja-JP', { weekday: 'short' }).format(
    date,
  );
  const textColor =
    custom.status === 'achieved'
      ? token('colors.background')
      : custom.status === 'no-data'
        ? token('colors.foreground.disabled')
        : token('colors.foreground');

  const halfWidth = tickSize.width / 2;
  const innerWidth = tickSize.width - 4;
  const innerHeight = tickSize.height - 4;

  return (
    <g transform={`translate(${x},${y})`}>
      {/* border */}
      <rect
        x={-halfWidth}
        y={-6}
        fill={custom.isToday ? token('colors.foreground') : 'transparent'}
        width={tickSize.width}
        height={tickSize.height}
      />
      {/* background */}
      <rect
        x={-halfWidth + 2}
        y={-4}
        fill={
          custom.status === 'achieved'
            ? token('colors.foreground')
            : token('colors.background')
        }
        width={innerWidth}
        height={innerHeight}
      />
      <text
        x={0}
        y={0}
        dy={tickSize.fontSize * 0.6}
        textAnchor="middle"
        fill={textColor}
        fontSize={tickSize.fontSize}
      >
        {day}
      </text>
      <text
        x={0}
        y={tickSize.fontSize + 4}
        dy={tickSize.fontSize * 0.6}
        textAnchor="middle"
        fill={textColor}
        fontSize={tickSize.fontSize}
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
        strokeWidth={0}
        fill={fill}
        fillOpacity={0.6}
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
  const tickInterval = useMemo(
    () => getTickInterval(data.length),
    [data.length],
  );
  const tickSize = useMemo(() => getTickSize(data.length), [data.length]);

  if (showPosNegRatio) {
    return (
      <ResponsiveContainer width="100%" height={150}>
        <ComposedChart
          data={data}
          barCategoryGap={0}
          style={{ overflow: 'visible' }}
          margin={{ top: 4, right: -20, left: -20, bottom: 12 }}
        >
          <XAxis
            interval={tickInterval}
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={(props: ComponentProps<typeof CustomXTick>) => {
              const customProp = data.find(
                (d) => d.date === props.payload.value,
              );
              // biome-ignore lint/complexity/noUselessFragments: Rechartsの型制約により空fragmentが必要
              if (!customProp) return <></>;
              return (
                <CustomXTick
                  {...props}
                  custom={customProp}
                  tickSize={tickSize}
                  dataLength={data.length}
                  isFirstData={props.payload.value === data[0]?.date}
                />
              );
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
        barCategoryGap={0}
        style={{ overflow: 'visible' }}
        margin={{ top: 4, right: 40, left: -20, bottom: 12 }}
      >
        <XAxis
          interval={tickInterval}
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={(props: ComponentProps<typeof CustomXTick>) => {
            const customProp = data.find((d) => d.date === props.payload.value);
            // biome-ignore lint/complexity/noUselessFragments: Rechartsの型制約により空fragmentが必要
            if (!customProp) return <></>;
            return (
              <CustomXTick
                {...props}
                custom={customProp}
                tickSize={tickSize}
                dataLength={data.length}
                isFirstData={props.payload.value === data[0]?.date}
              />
            );
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
