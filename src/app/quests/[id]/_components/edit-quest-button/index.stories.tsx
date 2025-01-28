import type { Meta, StoryObj } from '@storybook/react';
import { EditQuestButton } from '.';

const meta = {
  component: EditQuestButton,
  args: {
    id: 'id',
    name: 'name',
    description: 'description',
  },
} satisfies Meta<typeof EditQuestButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
