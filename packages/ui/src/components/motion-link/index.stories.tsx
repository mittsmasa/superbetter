import type { Meta, StoryObj } from '@storybook/react-vite';
import { MotionLink } from '.';

const meta = {
  component: MotionLink,
  args: {
    href: '#',
    children: 'リンク',
  },
} satisfies Meta<typeof MotionLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
