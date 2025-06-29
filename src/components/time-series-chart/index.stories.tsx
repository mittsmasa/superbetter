import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { css } from '@/styled-system/css';
import { TimeSeriesChart } from './index';

const meta = {
  args: { onClickBar: fn },
  component: TimeSeriesChart,
  decorators: [
    (Story) => (
      <div
        className={css({
          backgroundColor: 'background',
          height: '[fit-content]',
        })}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TimeSeriesChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    data: [
      {
        date: '2024-03-11',
        isToday: false,
        powerup: 3,
        quest: 2,
        status: 'achieved',
        villain: 1,
      },
      {
        date: '2024-03-12',
        isToday: false,
        powerup: 0,
        quest: 0,
        status: 'no-data',
        villain: 0,
      },
      {
        date: '2024-03-13',
        isToday: false,
        powerup: 1,
        quest: 1,
        status: 'not-achieved',
        villain: 1,
      },
      {
        date: '2024-03-14',
        isToday: false,
        powerup: 5,
        quest: 3,
        status: 'achieved',
        villain: 2,
      },
      {
        date: '2024-03-15',
        isToday: false,
        powerup: 6,
        quest: 4,
        status: 'achieved',
        villain: 3,
      },
      {
        date: '2024-03-16',
        isToday: false,
        powerup: 7,
        quest: 5,
        status: 'achieved',
        villain: 4,
      },
      {
        date: '2024-03-17',
        isToday: true,
        powerup: 8,
        quest: 6,
        status: 'achieved',
        villain: 5,
      },
    ],
  },
} satisfies Story;
