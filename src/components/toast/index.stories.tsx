import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, Toaster, useToast } from '.';

const ToastButton = () => {
  const { add: toast } = useToast();
  return (
    <button
      type="button"
      onClick={() => toast({ message: 'トーストを表示する' })}
    >
      Show Toast
    </button>
  );
};

const meta = {
  render: () => {
    return (
      <ToastProvider>
        <ToastButton />
        <Toaster />
      </ToastProvider>
    );
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
