import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from '.';

const meta = {
  args: {
    defaultValue: 0,
  },
  component: NumberInput,
} satisfies Meta<typeof NumberInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    variant: 'primary',
  },
} satisfies Story;

export const Secondary = {
  args: {
    variant: 'secondary',
  },
} satisfies Story;

export const WithMinMax = {
  args: {
    max: 10,
    min: 0,
  },
} satisfies Story;

export const WithStep = {
  args: {
    step: 5,
  },
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
} satisfies Story;

export const WithLabel = {
  args: {
    'aria-label': '数量',
    name: 'quantity',
  },
} satisfies Story;
