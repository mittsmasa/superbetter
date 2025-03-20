import { css } from '@/styled-system/css';
import type { Meta, StoryObj } from '@storybook/react';
import { GlassScreen, GlassScreenProvider, useGlassScreen } from '.';
import { Button } from '../button';

const meta = {
  component: GlassScreen,
  args: {},
} satisfies Meta<typeof GlassScreen>;

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
  const { show, hide } = useGlassScreen();
  return (
    <div className={css({ display: 'flex', gap: '8px' })}>
      <Button onClick={show}>Show Screen</Button>
      <Button variant="secondary" onClick={hide}>
        Hide Screen
      </Button>
    </div>
  );
};
