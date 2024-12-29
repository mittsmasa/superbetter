import type { Meta, StoryObj } from '@storybook/react';
import { PixelBorder } from '.';

const meta = {
  component: PixelBorder,
  decorators: [
    (Story) => (
      <div style={{ color: 'white' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    children: 'PixelBorder',
    color: 'colors.white',
  },
} satisfies Meta<typeof PixelBorder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
