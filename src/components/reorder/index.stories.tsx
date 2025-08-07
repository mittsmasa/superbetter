import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import {
  EntityLink,
  EntityLinkReorderHandle,
} from '@/app/(private)/_components/entity-link';
import { Reorder } from '.';

const meta = {
  render: () => {
    const [items, setItems] = useState([0, 1, 2, 3]);
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
              <EntityLink
                href="#"
                title={item.toString()}
                disabled
                description="hogehoge"
                reorderHandleSlot={
                  <EntityLinkReorderHandle
                    onPointerDown={(e) => controls.start(e)}
                    onPointerUp={() => {}}
                  />
                }
              />
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
