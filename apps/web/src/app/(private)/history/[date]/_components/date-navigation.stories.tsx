import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DateNavigation } from './date-navigation';

const meta = {
  component: DateNavigation,
  args: {
    currentDate: new Date('2025-12-13'),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DateNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const DifferentDate = {
  args: {
    currentDate: new Date('2025-01-01'),
  },
} satisfies Story;
