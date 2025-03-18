import { css } from '@/styled-system/css';
import type { Meta, StoryObj } from '@storybook/react';
import { TimeSeriesChart } from './index';

const meta = {
  component: TimeSeriesChart,
  decorators: [
    (Story) => (
      <div
        className={css({
          height: '[fit-content]',
          backgroundColor: 'black',
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
      { date: '2024-03-11', powerup: 3, quest: 2, villain: 1 },
      { date: '2024-03-12', powerup: 4, quest: 2, villain: 1 },
      { date: '2024-03-13', powerup: 3, quest: 3, villain: 2 },
      { date: '2024-03-14', powerup: 5, quest: 3, villain: 2 },
      { date: '2024-03-15', powerup: 6, quest: 4, villain: 3 },
      { date: '2024-03-16', powerup: 7, quest: 5, villain: 4 },
      { date: '2024-03-17', powerup: 8, quest: 6, villain: 5 },
    ],
  },
} satisfies Story;
