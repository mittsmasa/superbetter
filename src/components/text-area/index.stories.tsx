import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from '.';

const meta = {
  component: TextArea,
  args: {
    label: 'Label',
    placeholder: 'Enter text',
    defaultValue: 'default value',
  },
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
