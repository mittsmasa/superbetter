import type { Meta, StoryObj } from '@storybook/react-vite';
import { useDialog } from '../../hooks/use-dialog';
import { css } from '../../styled-system/css';
import { Dialog } from '.';

const meta = {
  component: Dialog,
  args: {
    ref: { current: null },
    children: 'Dialog content',
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
          Open
        </button>
        <Dialog ref={ref}>
          <h1>Title</h1>
          <div className={css({ display: 'flex' })}>
            <button type="button" onClick={close}>
              OK
            </button>
            <button type="button" onClick={close}>
              Cancel
            </button>
          </div>
        </Dialog>
      </div>
    );
  },
} satisfies Story;
