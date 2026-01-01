import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { css } from '../../styled-system/css';
import { Button } from '../button';
import { GlassScreenProvider, useGlassScreen } from '.';

const meta = {
  args: {},
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => (
    <GlassScreenProvider>
      <ScreenButton />
    </GlassScreenProvider>
  ),
} satisfies Story;

const ScreenButton = () => {
  const [isShow, setIsShow] = useState(false);
  useGlassScreen(isShow);
  return (
    <div className={css({ display: 'flex', gap: '8px' })}>
      <Button onClick={() => setIsShow(true)}>Show Screen</Button>
      <Button variant="secondary" onClick={() => setIsShow(false)}>
        Hide Screen
      </Button>
    </div>
  );
};
