import type { Meta, StoryObj } from '@storybook/react';
import { Mission } from '.';

const meta = {
  args: {
    id: '1',
    items: [],
    title: 'デイリーミッション',
  },
  component: Mission,
} satisfies Meta<typeof Mission>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    items: [
      {
        completed: true,
        itemType: 'powerup',
      },
      {
        completed: true,
        itemType: 'powerup',
      },
      {
        completed: true,
        itemType: 'powerup',
      },
      {
        completed: true,
        itemType: 'quest',
      },
      {
        completed: true,
        itemType: 'villain',
      },
    ],
  },
} satisfies Story;

export const Incomplete = {
  args: {
    items: [
      {
        completed: false,
        itemType: 'powerup',
      },
      {
        completed: false,
        itemType: 'powerup',
      },
      {
        completed: false,
        itemType: 'powerup',
      },
      {
        completed: false,
        itemType: 'quest',
      },
      {
        completed: false,
        itemType: 'villain',
      },
    ],
  },
} satisfies Story;
