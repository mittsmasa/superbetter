import type { Meta, StoryObj } from '@storybook/nextjs';
import { EntityLink } from '.';

const meta = {
  component: EntityLink,
  args: {
    href: '#',
    title: 'たいとる',
    description: 'せつめい',
  },
} satisfies Meta<typeof EntityLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
