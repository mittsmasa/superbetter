import type { Meta, StoryObj } from '@storybook/react';
import { MotionLink } from '.';

const meta = {
  args: {
    children: 'リンク',
    href: '#',
  },
  component: MotionLink,
} satisfies Meta<typeof MotionLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
