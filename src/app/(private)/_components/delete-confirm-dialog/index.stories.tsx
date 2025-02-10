import { useDialog } from '@/hooks/dialog';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useEffect } from 'react';
import { DeleteConfirmDialog } from '.';

const meta = {
  component: DeleteConfirmDialog,
  args: {
    dialog: { ref: { current: null }, show: fn(() => {}), close: fn(() => {}) },
    itemName: 'アイテムめい',
    onDelete: fn(),
  },
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
