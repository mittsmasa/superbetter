import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { GlassScreen } from '.';

const meta = {
  component: GlassScreen,
  args: {},
} satisfies Meta<typeof GlassScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => (
    <>
      <GlassScreen />
      <button type="button" onClick={fn()}>
        Click me
      </button>
    </>
  ),
} satisfies Story;
