import type { Meta, StoryObj } from '@storybook/react';
import { Mission } from '.';

const meta = {
  component: Mission,
  args: {
    children: 'ミッション',
  },
} satisfies Meta<typeof Mission>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
