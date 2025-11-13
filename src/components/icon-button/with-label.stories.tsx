import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { AbTesting } from '@/assets/icons';
import { IconButtonWithLabel } from './with-label';

const meta = {
  component: IconButtonWithLabel,
  args: {
    onClick: fn(),
    children: <AbTesting />,
    size: 'md',
    label: 'アイコンボタン',
  },
} satisfies Meta<typeof IconButtonWithLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
