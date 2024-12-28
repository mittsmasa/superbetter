import { AbTesting } from '@/assets/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import { IconButton } from './icon-button';

const meta = {
  component: IconButton,
  args: {
    type: 'button',
    onClick: fn(),
    children: <AbTesting />,
  },
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