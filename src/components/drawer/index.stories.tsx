import { useDialog } from '@/hooks/dialog';
import { css } from '@/styled-system/css';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Drawer } from '.';

const meta = {
  title: 'components/drawer',
  component: Drawer,
  args: {
    onClose: fn(),
    ref: { current: null },
  },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    bodySlot: (
      <div
        className={css({
          height: '[100dvh]', // スクロロールが必要なくらい長く
        })}
      >
        ここがボディ
      </div>
    ),
    footerSlot: (
      <div>
        <p>ここがフッター</p>
      </div>
    ),
  },
  render: (props) => {
    const { ref, show, close } = useDialog();
    return (
      <div>
        <button type="button" onClick={show}>
          開く
        </button>
        <Drawer {...props} ref={ref} onClose={close} />
      </div>
    );
  },
} satisfies Story;
