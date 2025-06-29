import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from '.';

const meta = {
  args: {
    children: 'ボタン',
    onClick: fn(),
    type: 'button',
  },
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Disabled = {
  args: { disabled: true },
} satisfies Story;

export const Secondary = {
  args: { variant: 'secondary' },
} satisfies Story;

export const SecondaryDisabled = {
  args: { disabled: true, variant: 'secondary' },
} satisfies Story;
