import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { css } from '@/styled-system/css';
import { TimeSeriesChart } from './index';

const meta = {
  component: TimeSeriesChart,
  args: { onClickBar: fn() },
  decorators: [
    (Story) => (
      <div
        className={css({
          height: '[fit-content]',
          width: '[400px]',
          backgroundColor: 'background',
        })}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TimeSeriesChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseData = [
  {
    date: '2024-03-11',
    powerup: 3,
    quest: 2,
    villain: 1,
    epicwin: 1,
    isToday: false,
    status: 'achieved' as const,
  },
  {
    date: '2024-03-12',
    powerup: 0,
    quest: 0,
    villain: 0,
    epicwin: 0,
    isToday: false,
    status: 'no-data' as const,
  },
  {
    date: '2024-03-13',
    powerup: 1,
    quest: 1,
    villain: 1,
    epicwin: 0,
    isToday: false,
    status: 'not-achieved' as const,
  },
  {
    date: '2024-03-14',
    powerup: 5,
    quest: 3,
    villain: 2,
    epicwin: 2,
    isToday: false,
    status: 'achieved' as const,
  },
  {
    date: '2024-03-15',
    powerup: 6,
    quest: 4,
    villain: 3,
    epicwin: 1,
    isToday: false,
    status: 'achieved' as const,
  },
  {
    date: '2024-03-16',
    powerup: 7,
    quest: 5,
    villain: 4,
    epicwin: 3,
    isToday: false,
    status: 'achieved' as const,
  },
  {
    date: '2024-03-17',
    powerup: 8,
    quest: 6,
    villain: 5,
    epicwin: 2,
    isToday: true,
    status: 'achieved' as const,
  },
];

export const Default = {
  args: {
    data: baseData,
  },
} satisfies Story;

export const WithPosNegRatio = {
  args: {
    data: baseData.map((item, index) => ({
      ...item,
      posNegRatio: [0.2, undefined, 0.4, 0.7, 0.6, 0.8, 0.9][index],
    })),
    showPosNegRatio: true,
  },
} satisfies Story;

export const PosNegRatioTrend = {
  args: {
    data: [
      {
        date: '2024-03-11',
        powerup: 1,
        quest: 0,
        villain: 2,
        epicwin: 0,
        isToday: false,
        status: 'not-achieved' as const,
        posNegRatio: 0.1,
      },
      {
        date: '2024-03-12',
        powerup: 2,
        quest: 1,
        villain: 1,
        epicwin: 0,
        isToday: false,
        status: 'not-achieved' as const,
        posNegRatio: 0.3,
      },
      {
        date: '2024-03-13',
        powerup: 3,
        quest: 2,
        villain: 1,
        epicwin: 1,
        isToday: false,
        status: 'achieved' as const,
        posNegRatio: 0.5,
      },
      {
        date: '2024-03-14',
        powerup: 4,
        quest: 3,
        villain: 0,
        epicwin: 2,
        isToday: false,
        status: 'achieved' as const,
        posNegRatio: 0.7,
      },
      {
        date: '2024-03-15',
        powerup: 5,
        quest: 4,
        villain: 0,
        epicwin: 3,
        isToday: false,
        status: 'achieved' as const,
        posNegRatio: 0.8,
      },
      {
        date: '2024-03-16',
        powerup: 3,
        quest: 2,
        villain: 1,
        epicwin: 1,
        isToday: false,
        status: 'achieved' as const,
        posNegRatio: 0.6,
      },
      {
        date: '2024-03-17',
        powerup: 6,
        quest: 5,
        villain: 0,
        epicwin: 4,
        isToday: true,
        status: 'achieved' as const,
        posNegRatio: 0.9,
      },
    ],
    showPosNegRatio: true,
  },
} satisfies Story;

// 期間ごとのデータ生成ヘルパー
const generatePeriodData = (days: number) => {
  const today = new Date();
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (days - 1 - i));
    const dateStr = date.toISOString().split('T')[0];
    const isToday = i === days - 1;
    const hasData = Math.random() > 0.2;
    return {
      date: dateStr,
      powerup: hasData ? Math.floor(Math.random() * 5) : 0,
      quest: hasData ? Math.floor(Math.random() * 4) : 0,
      villain: hasData ? Math.floor(Math.random() * 3) : 0,
      epicwin: hasData ? Math.floor(Math.random() * 2) : 0,
      isToday,
      status: hasData
        ? Math.random() > 0.3
          ? ('achieved' as const)
          : ('not-achieved' as const)
        : ('no-data' as const),
      posNegRatio: hasData ? Math.random() * 0.6 + 0.3 : undefined,
    };
  });
};

export const TwoWeeks = {
  args: {
    data: generatePeriodData(14),
    showPosNegRatio: true,
  },
  tags: ['!vrt'],
} satisfies Story;

export const OneMonth = {
  args: {
    data: generatePeriodData(31),
    showPosNegRatio: true,
  },
  tags: ['!vrt'],
} satisfies Story;

export const TwoMonths = {
  args: {
    data: generatePeriodData(60),
    showPosNegRatio: true,
  },
  tags: ['!vrt'],
} satisfies Story;

export const ThreeMonths = {
  args: {
    data: generatePeriodData(90),
    showPosNegRatio: true,
  },
  tags: ['!vrt'],
} satisfies Story;
