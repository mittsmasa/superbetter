import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { QuickExecuteButton } from '.';

const meta = {
  component: QuickExecuteButton,
  args: {
    entityType: 'quest',
    onExecute: fn(async () => ({ type: 'ok' as const })),
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '16px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof QuickExecuteButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Quest = {} satisfies Story;

export const Powerup = {
  args: {
    entityType: 'powerup',
  },
} satisfies Story;

export const Villain = {
  args: {
    entityType: 'villain',
  },
} satisfies Story;
