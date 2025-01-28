import type { Meta, StoryObj } from '@storybook/react';
import { EditVillainButton } from '.';

const meta = {
  component: EditVillainButton,
  args: {
    id: 'id',
    name: 'name',
    description: 'description',
  },
} satisfies Meta<typeof EditVillainButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
