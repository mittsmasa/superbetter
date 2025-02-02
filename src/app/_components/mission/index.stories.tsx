import type { Meta, StoryObj } from '@storybook/react';
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
        id: '1',
        itemType: 'powerup',
        completed: true,
      },
      {
        id: '2',
        itemType: 'powerup',
        completed: true,
      },
      {
        id: '3',
        itemType: 'powerup',
        completed: true,
      },
      {
        id: '4',
        itemType: 'quest',
        completed: true,
      },
      {
        id: '5',
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
        id: '1',
        itemType: 'powerup',
        completed: false,
      },
      {
        id: '2',
        itemType: 'powerup',
        completed: false,
      },
      {
        id: '3',
        itemType: 'powerup',
        completed: false,
      },
      {
        id: '4',
        itemType: 'quest',
        completed: false,
      },
      {
        id: '5',
        itemType: 'villain',
        completed: false,
      },
    ],
  },
} satisfies Story;
