import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from '.';

const meta = {
  args: {
    defaultValue: 'default value',
    label: 'Label',
    placeholder: 'Enter text',
  },
  component: TextInput,
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
