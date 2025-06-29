import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from '.';

const meta = {
  args: {
    defaultValue: 'default value',
    label: 'Label',
    placeholder: 'Enter text',
  },
  component: TextArea,
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
