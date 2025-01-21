import type { Meta, StoryObj } from '@storybook/react';
import { EditPowerupButton } from '.';

const meta = {
  component: EditPowerupButton,
  args: {
    id: 'id',
    name: 'name',
    description: 'description',
  },
} satisfies Meta<typeof EditPowerupButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
