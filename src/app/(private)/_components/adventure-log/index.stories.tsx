import type { Meta, StoryObj } from '@storybook/react';
import { AdventureLog } from '.';

const meta = {
  args: {
    heading: '本日の冒険ログ',
    logs: [
      { id: '1', title: 'パワーブレスする', type: 'powerup' },
      { id: '2', title: 'クエストをクリアする', type: 'quest' },
      { id: '3', title: 'ヴィランを倒す', type: 'villain' },
      { id: '4', title: 'エピックウィンを達成する', type: 'epicwin' },
    ],
  },
  component: AdventureLog,
} satisfies Meta<typeof AdventureLog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
