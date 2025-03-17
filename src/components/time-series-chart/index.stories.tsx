import { css } from '@/styled-system/css';
import type { Meta, StoryObj } from '@storybook/react';
import TimeSeriesChart from './index';

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

export const Default: Story = {
  args: {},
};
