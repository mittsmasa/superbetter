import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { AbTesting } from '@/assets/icons';
import { css } from '@/styled-system/css';
import { ExampleButton } from '.';

const meta = {
  component: ExampleButton,
  args: {
    onClick: fn(),
    children: 'ボタン',
  },
} satisfies Meta<typeof ExampleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithIcon = {
  args: {
    children: (
      <div
        className={css({ alignItems: 'center', display: 'flex', gap: '10px' })}
      >
        <AbTesting size={20} /> Test
      </div>
    ),
  },
} satisfies Story;
