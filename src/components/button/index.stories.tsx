import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from '.';

const meta = {
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: {
    type: 'button',
    children: 'ボタン',
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Disabled = {
  args: { disabled: true },
} satisfies Story;
