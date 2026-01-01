import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useDialog } from '../../hooks/use-dialog';
import { css } from '../../styled-system/css';
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
    children: (
      <div
        className={css({
          height: '[100dvh]',
        })}
      >
        Body content
      </div>
    ),
  },
  render: (props) => {
    const { ref, show, close } = useDialog();
    return (
      <div>
        <button type="button" onClick={show}>
          Open
        </button>
        <Drawer {...props} ref={ref} onClose={close} />
      </div>
    );
  },
} satisfies Story;
