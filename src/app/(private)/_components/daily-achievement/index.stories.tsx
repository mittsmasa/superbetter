import type { Meta, StoryObj } from '@storybook/react';
import { DailyAchievement } from '.';

const meta = {
  component: DailyAchievement,
  args: {
    datetime: new Date('2024-12-30'),
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
