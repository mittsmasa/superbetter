import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CelebrationEffect } from '.';

const CelebrationButton = ({
  intensity,
}: {
  intensity: 'light' | 'medium' | 'heavy';
}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setShow(true)}>
        Show Celebration ({intensity})
      </button>
      {show && (
        <CelebrationEffect
          intensity={intensity}
          onComplete={() => setShow(false)}
        />
      )}
    </>
  );
};

const meta = {
  component: CelebrationEffect,
  title: 'Components/CelebrationEffect',
  argTypes: {
    intensity: {
      control: 'select',
      options: ['light', 'medium', 'heavy'],
    },
  },
  render: (args) => {
    return <CelebrationButton intensity={args.intensity ?? 'medium'} />;
  },
} satisfies Meta<{ intensity: 'light' | 'medium' | 'heavy' }>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light = {
  args: {
    intensity: 'light',
  },
} satisfies Story;

export const Medium = {
  args: {
    intensity: 'medium',
  },
} satisfies Story;

export const Heavy = {
  args: {
    intensity: 'heavy',
  },
} satisfies Story;
