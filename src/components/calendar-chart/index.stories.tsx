import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { css } from '@/styled-system/css';
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
        return css({ borderColor: 'gray.900' });
      }

      if (isHighlighted) {
        return css({
          backgroundColor: 'entity.powerup',
          color: 'foreground.alt',
        });
      }

      return css({
        backgroundColor: 'entity.epicwin',
      });
    },
  },
} satisfies Story;

export const CompactSize = {
  args: {
    size: 'sm',
  },
} satisfies Story;

export const CurrentMonth = {
  tags: ['skip-vrt'],
  args: {
    month: new Date(), // 現在の月
    cellStyle: (date) => {
      const today = new Date();
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

      if (isToday) {
        return css({
          backgroundColor: 'entity.villain',
        });
      }

      return '';
    },
  },
} satisfies Story;

export const WeekdaysOnly = {
  args: {
    month: new Date(2024, 0, 1), // 2024年1月
    includeWeekends: false,
  },
} satisfies Story;

export const WithWeekends = {
  args: {
    month: new Date(2024, 0, 1), // 2024年1月
    includeWeekends: true,
  },
} satisfies Story;

export const WeekendLayoutTest = {
  args: {
    month: new Date(2024, 5, 1), // 2024年6月（土曜日スタート）
    includeWeekends: true,
    size: 'lg',
  },
} satisfies Story;

export const MondayStartCalendar = {
  args: {
    month: new Date(2024, 8, 1), // 2024年9月（日曜日スタート、月曜始まりで6つの空白セル）
    includeWeekends: true,
    size: 'lg',
  },
} satisfies Story;
