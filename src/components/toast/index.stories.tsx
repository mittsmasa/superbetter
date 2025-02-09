import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, Toaster, useToast } from '.';

const ToastButton = ({ message }: { message: string }) => {
  const { add: toast } = useToast();
  return (
    <button type="button" onClick={() => toast({ message })}>
      Show Toast
    </button>
  );
};

const meta = {
  argTypes: {
    message: { control: 'text' },
  },
  render: (args) => {
    return (
      <ToastProvider>
        <ToastButton message={args.message} />
        <Toaster />
      </ToastProvider>
    );
  },
} satisfies Meta<{ message: string }>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    message: 'トーストを表示する',
  },
} satisfies Story;

export const LongMessage = {
  args: {
    message:
      'トーストを表示するときに、メッセージが長い場合はどうなるか確認する',
  },
} satisfies Story;
