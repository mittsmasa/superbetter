import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { AbTesting } from '@/assets/icons';
import { IconButtonWithLabel } from './with-label';

const meta = {
  args: {
    children: <AbTesting />,
    label: 'アイコンボタン',
    onClick: fn(),
    size: 'md',
  },
  component: IconButtonWithLabel,
} satisfies Meta<typeof IconButtonWithLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
