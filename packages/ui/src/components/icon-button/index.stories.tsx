import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { AbTesting } from '../icons';
import { IconButton } from '.';

const meta = {
  component: IconButton,
  args: {
    type: 'button',
    onClick: fn(),
    children: <AbTesting size={24} />,
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
