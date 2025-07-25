import type { Meta, StoryObj } from '@storybook/nextjs';
import { Header } from '.';

const meta = {
  component: Header,
  args: {},
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
