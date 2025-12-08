import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Loading } from '.';

const meta = {
  component: Loading,
  tags: ['skip-vrt'],
} satisfies Meta<typeof Loading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
