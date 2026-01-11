import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { EntityStats } from '.';

const meta = {
  component: EntityStats,
  args: {
    totalCount: 42,
    weeklyCount: 5,
    daysSinceCreation: 30,
    lastExecutedAt: new Date('2025-01-10T15:30:00'),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px', padding: '16px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EntityStats>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const NeverExecuted = {
  args: {
    totalCount: 0,
    weeklyCount: 0,
    daysSinceCreation: 7,
    lastExecutedAt: null,
  },
} satisfies Story;

export const NewEntity = {
  args: {
    totalCount: 1,
    weeklyCount: 1,
    daysSinceCreation: 0,
    lastExecutedAt: new Date(),
  },
} satisfies Story;

export const HighActivity = {
  args: {
    totalCount: 365,
    weeklyCount: 14,
    daysSinceCreation: 100,
    lastExecutedAt: new Date(),
  },
} satisfies Story;
