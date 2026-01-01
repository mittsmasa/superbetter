import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { css } from '../../styled-system/css';
import { Reorder } from '.';

const meta = {
  render: () => {
    const [items, setItems] = useState([
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
    ]);
    return (
      <Reorder.List
        values={items}
        onReorder={setItems}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          justifyContent: 'stretch',
        }}
      >
        {items.map((item) => (
          <Reorder.ListItem
            key={item}
            value={item}
            renderItem={({ controls }) => (
              <div
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  backgroundColor: 'background',
                  border: '2px solid',
                  borderColor: 'primary',
                  borderRadius: '8px',
                })}
              >
                <button
                  type="button"
                  onPointerDown={(e) => controls.start(e)}
                  className={css({
                    cursor: 'grab',
                    padding: '4px 8px',
                    backgroundColor: 'secondary',
                    border: 'none',
                    borderRadius: '4px',
                    _active: { cursor: 'grabbing' },
                  })}
                >
                  ⋮⋮
                </button>
                <span>{item}</span>
              </div>
            )}
          />
        ))}
      </Reorder.List>
    );
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
