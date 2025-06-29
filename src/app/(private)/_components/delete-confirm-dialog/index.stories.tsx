import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useEffect } from 'react';
import { useDialog } from '@/hooks/dialog';
import { DeleteConfirmDialog } from '.';

const meta = {
  args: {
    dialog: { close: fn(() => {}), ref: { current: null }, show: fn(() => {}) },
    itemName: 'アイテムめい',
    onDelete: fn(),
  },
  component: DeleteConfirmDialog,
} satisfies Meta<typeof DeleteConfirmDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: (args) => {
    const dialog = useDialog();
    useEffect(() => {
      dialog.show();
    }, [dialog]);
    return <DeleteConfirmDialog {...args} dialog={dialog} />;
  },
} satisfies Story;
