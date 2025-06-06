import type { Meta, StoryObj } from '@storybook/react';
import { CounterButton } from './index';

const meta = {
  component: CounterButton,
  args: {
    label: 'カウンター',
  },
} satisfies Meta<typeof CounterButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'count',
  },
};
