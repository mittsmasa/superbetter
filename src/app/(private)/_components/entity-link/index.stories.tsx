import type { Meta, StoryObj } from '@storybook/react';
import { EntityLink } from '.';

const meta = {
  args: {
    description: 'せつめい',
    href: '#',
    title: 'たいとる',
  },
  component: EntityLink,
} satisfies Meta<typeof EntityLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
