import type { Meta, StoryObj } from '@storybook/nextjs';
import { fn } from 'storybook/test';
import { CalendarChart } from '.';

const meta = {
  component: CalendarChart,
  args: {
    month: new Date(2024, 0, 1), // 2024年1月
    onClick: fn(),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CalendarChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const LargeSize = {
  args: {
    size: 'lg',
  },
} satisfies Story;

export const SmallSize = {
  args: {
    size: 'sm',
  },
} satisfies Story;

export const WithCustomStyles = {
  args: {
    cellStyle: (date, _index) => {
      const isHighlighted = date.getDate() % 5 === 0;
      const isToday = date.getDate() === 15;

      if (isToday) {
        return {
          backgroundColor: '#4facfe',
          borderColor: '#333',
          opacity: 1,
        };
      }

      if (isHighlighted) {
        return {
          backgroundColor: '#f0f8ff',
          borderColor: '#00d4aa',
          opacity: 0.8,
        };
      }

      return {
        backgroundColor: '#ffffff',
        borderColor: '#666',
        opacity: 0.6,
      };
    },
  },
} satisfies Story;

export const CompactSize = {
  args: {
    size: 'sm',
  },
} satisfies Story;

export const CurrentMonth = {
  args: {
    month: new Date(), // 現在の月
    cellStyle: (date) => {
      const today = new Date();
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

      if (isToday) {
        return {
          backgroundColor: '#ff6b35',
          borderColor: '#333',
        };
      }

      return {};
    },
  },
} satisfies Story;

export const WeekdaysOnly = {
  args: {
    month: new Date(2024, 0, 1), // 2024年1月
    includeWeekends: false,
    cellStyle: (_date) => {
      // 平日のみなので土日の心配なし
      return {
        backgroundColor: '#e8f4fd',
        borderColor: '#1e88e5',
      };
    },
  },
} satisfies Story;

export const WithWeekends = {
  args: {
    month: new Date(2024, 0, 1), // 2024年1月
    includeWeekends: true,
    cellStyle: (date) => {
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // 日曜日または土曜日

      if (isWeekend) {
        return {
          backgroundColor: '#ffebee',
          borderColor: '#e57373',
          opacity: 0.7,
        };
      }

      return {
        backgroundColor: '#e8f4fd',
        borderColor: '#1e88e5',
      };
    },
  },
} satisfies Story;

export const WeekendLayoutTest = {
  args: {
    month: new Date(2024, 5, 1), // 2024年6月（土曜日スタート）
    includeWeekends: true,
    size: 'lg',
    cellStyle: (date) => {
      const dayOfWeek = date.getDay();

      // 曜日別に色分け
      const colors = {
        0: { bg: '#ffcdd2', border: '#d32f2f' }, // 日曜日（赤）
        1: { bg: '#e1f5fe', border: '#0277bd' }, // 月曜日（青）
        2: { bg: '#e8f5e8', border: '#388e3c' }, // 火曜日（緑）
        3: { bg: '#fff3e0', border: '#f57c00' }, // 水曜日（オレンジ）
        4: { bg: '#f3e5f5', border: '#7b1fa2' }, // 木曜日（紫）
        5: { bg: '#fce4ec', border: '#c2185b' }, // 金曜日（ピンク）
        6: { bg: '#e0f2f1', border: '#00695c' }, // 土曜日（ティール）
      };

      const color = colors[dayOfWeek as keyof typeof colors];

      return {
        backgroundColor: color.bg,
        borderColor: color.border,
      };
    },
  },
} satisfies Story;

export const MondayStartCalendar = {
  args: {
    month: new Date(2024, 8, 1), // 2024年9月（日曜日スタート、月曜始まりで6つの空白セル）
    includeWeekends: true,
    size: 'lg',
    cellStyle: (date) => {
      const dayOfWeek = date.getDay();
      const isFirstWeek = date.getDate() <= 7;

      // 最初の週を強調表示
      if (isFirstWeek) {
        return {
          backgroundColor: '#fff3e0',
          borderColor: '#f57c00',
          fontWeight: 'bold',
        };
      }

      // 週末は薄い色
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        return {
          backgroundColor: '#f5f5f5',
          borderColor: '#999',
        };
      }

      return {
        backgroundColor: '#ffffff',
        borderColor: '#ddd',
      };
    },
  },
} satisfies Story;
