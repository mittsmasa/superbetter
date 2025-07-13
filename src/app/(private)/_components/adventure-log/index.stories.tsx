import type { Meta, StoryObj } from '@storybook/nextjs';
import { AdventureLog } from '.';

const meta = {
  component: AdventureLog,
  args: {
    heading: '本日の冒険ログ',
    logs: [
      { id: '1', type: 'powerup', title: 'パワーブレスする' },
      { id: '2', type: 'quest', title: 'クエストをクリアする' },
      { id: '3', type: 'villain', title: 'ヴィランを倒す' },
      { id: '4', type: 'epicwin', title: 'エピックウィンを達成する' },
    ],
  },
} satisfies Meta<typeof AdventureLog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
