import { css } from '@/styled-system/css';
import type { Meta, StoryObj } from '@storybook/react';
import { LinkBox } from '.';

const meta = {
  component: LinkBox,
  args: {
    href: 'https://example.com',
    children: (
      <div
        className={css({
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          width: '[100%]',
          gap: '8px',
        })}
      >
        <p>Link Box</p>
        <p>Link Box</p>
      </div>
    ),
  },
} satisfies Meta<typeof LinkBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
