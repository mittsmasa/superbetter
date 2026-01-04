import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useDialog } from '@superbetter/ui';
import { useEffect } from 'react';
import { fn } from 'storybook/test';
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
  tags: ['skip-vrt'],
} satisfies Story;
