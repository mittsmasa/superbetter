import { css } from '@/styled-system/css';
import type { Meta, StoryObj } from '@storybook/react';
import { MotionLink } from '.';

const meta = {
  component: MotionLink,
  args: {
    href: '#',
    children: 'リンク',
    className: css({
      borderColor: 'white',
      border: '1px solid',
      color: 'white',
      padding: '8px',
    }),
  },
} satisfies Meta<typeof MotionLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
