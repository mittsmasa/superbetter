import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { EntityHistoryItem } from './entity-history-item';

const meta = {
  component: EntityHistoryItem,
  args: {
    history: {
      id: '1',
      type: 'quest' as const,
      title: 'テストクエスト',
      createdAt: new Date('2025-12-13T12:00:00'),
    },
    isEditable: true,
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px', padding: '16px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EntityHistoryItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const QuestEditable = {} satisfies Story;

export const QuestReadOnly = {
  args: {
    isEditable: false,
  },
} satisfies Story;

export const Powerup = {
  args: {
    history: {
      id: '2',
      type: 'powerup' as const,
      title: 'テストパワーアップ',
      createdAt: new Date('2025-12-13T12:00:00'),
    },
  },
} satisfies Story;

export const Villain = {
  args: {
    history: {
      id: '3',
      type: 'villain' as const,
      title: 'テストヴィラン',
      createdAt: new Date('2025-12-13T12:00:00'),
    },
  },
} satisfies Story;
