import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { css } from '@/styled-system/css';
import { EntityIcon } from '.';

const meta = {
  component: EntityIcon,
  args: {
    itemType: 'powerup',
    completed: false,
  },
  argTypes: {
    itemType: {
      control: 'select',
      options: ['powerup', 'quest', 'villain', 'epicwin'],
    },
    completed: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof EntityIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const AllTypes: Story = {
  render: () => (
    <div
      className={css({
        display: 'flex',
        gap: '4',
        flexDirection: 'column',
      })}
    >
      <div
        className={css({
          display: 'flex',
          gap: '4',
          alignItems: 'center',
        })}
      >
        <span className={css({ minW: '[24px]' })}>Powerup:</span>
        <EntityIcon itemType="powerup" completed={false} />
        <EntityIcon itemType="powerup" completed={true} />
      </div>
      <div
        className={css({
          display: 'flex',
          gap: '4',
          alignItems: 'center',
        })}
      >
        <span className={css({ minW: '[24px]' })}>Quest:</span>
        <EntityIcon itemType="quest" completed={false} />
        <EntityIcon itemType="quest" completed={true} />
      </div>
      <div
        className={css({
          display: 'flex',
          gap: '4',
          alignItems: 'center',
        })}
      >
        <span className={css({ minW: '[24px]' })}>Villain:</span>
        <EntityIcon itemType="villain" completed={false} />
        <EntityIcon itemType="villain" completed={true} />
      </div>
      <div
        className={css({
          display: 'flex',
          gap: '4',
          alignItems: 'center',
        })}
      >
        <span className={css({ minWidth: '[100px]' })}>Epic Win:</span>
        <EntityIcon itemType="epicwin" completed={false} />
        <EntityIcon itemType="epicwin" completed={true} />
      </div>
    </div>
  ),
};

export const WithAnimation: Story = {
  render: () => {
    const [completed, setCompleted] = useState(false);

    return (
      <div
        className={css({
          display: 'flex',
          gap: '4',
          flexDirection: 'column',
          alignItems: 'flex-start',
        })}
      >
        <EntityIcon itemType="powerup" completed={completed} />
        <button
          type="button"
          onClick={() => setCompleted(!completed)}
          className={css({
            px: '4',
            py: '2',
            bg: '[#3b82f6]',
            color: 'white',
            rounded: 'md',
            cursor: 'pointer',
            _hover: {
              bg: '[#2563eb]',
            },
          })}
        >
          Toggle Completed (Current: {completed ? 'Completed' : 'Not Completed'}
          )
        </button>
      </div>
    );
  },
};
