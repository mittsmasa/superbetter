import type { Meta, StoryObj } from '@storybook/react';
import { css } from '@/styled-system/css';
import { Popover } from '.';

const meta = {
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => {
    return (
      <Popover.Root>
        <Popover.Trigger
          renderItem={({ setOpen, getReferenceProps, refs }) => (
            <button
              ref={refs.setReference}
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              {...getReferenceProps()}
            >
              Open
            </button>
          )}
        />
        <Popover.Content
          renderItem={({ getFloatingProps, floatingStyles, refs }) => (
            <div
              {...getFloatingProps()}
              style={floatingStyles}
              ref={refs.setFloating}
              className={css({
                backgroundColor: 'background',
                padding: '20px',
              })}
            >
              <div style={{ height: '200px', width: '200px' }}>Content</div>
            </div>
          )}
        />
      </Popover.Root>
    );
  },
} satisfies Story;
