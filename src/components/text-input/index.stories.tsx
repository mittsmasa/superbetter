import type { Meta, StoryObj } from '@storybook/nextjs';
import { TextInput } from '.';

const meta = {
  component: TextInput,
  args: {
    label: 'Label',
    placeholder: 'Enter text',
    defaultValue: 'default value',
  },
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
