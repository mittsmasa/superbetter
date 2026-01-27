import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { EntityLink } from '.';

const meta = {
  component: EntityLink,
  args: {
    href: '#',
    title: 'たいとる',
    description: 'せつめい',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px', padding: '16px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EntityLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithQuickAction = {
  args: {
    enableQuickAction: true,
    entityType: 'powerup',
    onExecute: async () => ({ type: 'ok' }) as const,
  },
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
} satisfies Story;

export const LongDescription = {
  args: {
    title: '長いタイトルのテスト',
    description:
      'これは非常に長い説明文です。複数行にわたって表示されるかどうかをテストしています。lineClampが3に設定されているため、3行を超える場合は省略されます。',
  },
} satisfies Story;

export const WithQuickActionLongDescription = {
  args: {
    enableQuickAction: true,
    entityType: 'quest',
    onExecute: async () => ({ type: 'ok' }) as const,
    title: '長いタイトルのテスト',
    description:
      'これは非常に長い説明文です。クイックアクションが有効な状態で複数行にわたって表示されるかどうかをテストしています。',
  },
} satisfies Story;
