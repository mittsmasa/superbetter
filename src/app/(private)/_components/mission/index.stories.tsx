import type { Meta, StoryObj } from '@storybook/nextjs';
import { Mission } from '.';

const meta = {
  component: Mission,
  args: {
    id: '1',
    title: 'デイリーミッション',
    items: [],
  },
} satisfies Meta<typeof Mission>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    items: [
      {
        itemType: 'powerup',
        completed: true,
      },
      {
        itemType: 'powerup',
        completed: true,
      },
      {
        itemType: 'powerup',
        completed: true,
      },
      {
        itemType: 'quest',
        completed: true,
      },
      {
        itemType: 'villain',
        completed: true,
      },
    ],
  },
} satisfies Story;

export const Incomplete = {
  args: {
    items: [
      {
        itemType: 'powerup',
        completed: false,
      },
      {
        itemType: 'powerup',
        completed: false,
      },
      {
        itemType: 'powerup',
        completed: false,
      },
      {
        itemType: 'quest',
        completed: false,
      },
      {
        itemType: 'villain',
        completed: false,
      },
    ],
  },
} satisfies Story;
