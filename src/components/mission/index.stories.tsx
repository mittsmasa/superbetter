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
        missionItemType: 'powerup',
        completed: true,
      },
      {
        id: '2',
        missionItemType: 'powerup',
        completed: true,
      },
      {
        id: '3',
        missionItemType: 'powerup',
        completed: true,
      },
      {
        id: '4',
        missionItemType: 'quest',
        completed: true,
      },
      {
        id: '5',
        missionItemType: 'villain',
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
        missionItemType: 'powerup',
        completed: false,
      },
      {
        id: '2',
        missionItemType: 'powerup',
        completed: false,
      },
      {
        id: '3',
        missionItemType: 'powerup',
        completed: false,
      },
      {
        id: '4',
        missionItemType: 'quest',
        completed: false,
      },
      {
        id: '5',
        missionItemType: 'villain',
        completed: false,
      },
    ],
  },
} satisfies Story;
