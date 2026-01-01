import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toaster, ToastProvider, useToast } from '.';

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
    message: 'Toast message',
  },
} satisfies Story;

export const LongMessage = {
  args: {
    message:
      'This is a long toast message to see how the toast handles longer text content',
  },
} satisfies Story;
