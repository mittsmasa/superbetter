import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ExampleButton } from '.';

const meta = {
  component: ExampleButton,
  parameters: {
    layout: 'centered',
  },
  args: {
    onClick: fn(),
    children: 'ボタン',
  },
} satisfies Meta<typeof ExampleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
