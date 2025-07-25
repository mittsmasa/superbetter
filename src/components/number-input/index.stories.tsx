import type { Meta, StoryObj } from '@storybook/nextjs';
import { NumberInput } from '.';

const meta = {
  component: NumberInput,
  args: {
    defaultValue: 0,
  },
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
    min: 0,
    max: 10,
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
