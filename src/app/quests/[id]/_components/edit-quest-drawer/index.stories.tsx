import { useDialog } from '@/hooks/dialog';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useEffect } from 'react';
import { EditQuestDrawer } from '.';

const meta = {
  component: EditQuestDrawer,
  args: {
    itemName: 'item name',
    itemDesc: 'item desc',
    ref: { current: null },
    onClose: fn(),
  },
} satisfies Meta<typeof EditQuestDrawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: (props) => {
    const drawer = useDialog();
    useEffect(() => {
      drawer.show();
    }, [drawer.show]);
    return (
      <>
        <button type="button" onClick={drawer.show}>
          Open Drawer
        </button>
        <EditQuestDrawer {...props} ref={drawer.ref} onClose={drawer.close} />
      </>
    );
  },
} satisfies Story;
