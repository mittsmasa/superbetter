import type { Meta, StoryObj } from '@storybook/nextjs';
import { DailyAchievement } from '.';

const meta = {
  component: DailyAchievement,
  args: {
    date: new Date('2024-12-30'),
    dateString: '2024-12-30',
    adventureLogs: [],
  },
} satisfies Meta<typeof DailyAchievement>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    status: 'not-achieved',
  },
} satisfies Story;

export const Achieved = {
  args: {
    status: 'achieved',
  },
} satisfies Story;

export const NoData = {
  args: {
    status: 'no-data',
  },
} satisfies Story;

export const Today = {
  args: {
    status: 'achieved',
    isToday: true,
  },
} satisfies Story;
