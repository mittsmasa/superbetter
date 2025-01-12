import { useDialog } from '@/hooks/dialog';
import { css } from '@/styled-system/css';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Dialog } from '.';

const meta = {
  component: Dialog,
  args: {
    ref: { current: null },
    onClose: fn(),
    children: 'ダイアログのなかみ',
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => {
    const { ref, show, close } = useDialog();
    return (
      <div className={css({ padding: '20px' })}>
        <button type="button" onClick={show}>
          開く
        </button>
        <Dialog ref={ref} onClose={close}>
          <h1>タイトル</h1>
          <div className={css({ display: 'flex' })}>
            <button type="button" onClick={close}>
              OK
            </button>
            <button type="button" onClick={close}>
              キャンセル
            </button>
          </div>
        </Dialog>
      </div>
    );
  },
} satisfies Story;
