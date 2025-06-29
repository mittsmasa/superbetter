import type { Meta, StoryObj } from '@storybook/react';
import { useDialog } from '@/hooks/dialog';
import { css } from '@/styled-system/css';
import { Dialog } from '.';

const meta = {
  args: {
    children: 'ダイアログのなかみ',
    ref: { current: null },
  },
  component: Dialog,
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
        <Dialog ref={ref}>
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
