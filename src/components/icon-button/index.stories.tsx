import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { AbTesting } from '@/assets/icons';
import { IconButton } from '.';

const meta = {
  args: {
    children: <AbTesting />,
    onClick: fn(),
    type: 'button',
  },
  component: IconButton,
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default = {
  args: {},
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
} satisfies Story;

export const Active = {
  args: {
    active: true,
  },
} satisfies Story;
