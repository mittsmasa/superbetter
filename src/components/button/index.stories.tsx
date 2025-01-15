import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from '.';

const meta = {
  component: Button,
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

export const Secondary = {
  args: { variant: 'secondary' },
} satisfies Story;

export const SecondaryDisabled = {
  args: { variant: 'secondary', disabled: true },
} satisfies Story;
