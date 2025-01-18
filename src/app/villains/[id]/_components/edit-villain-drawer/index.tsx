'use client';
import { Button } from '@/components/button';
import { Drawer } from '@/components/drawer';
import { TextArea } from '@/components/text-area';
import { TextInput } from '@/components/text-input';
import { css } from '@/styled-system/css';
import type { ComponentProps } from 'react';

export const EditVillainDrawer = ({
  itemName,
  itemDesc,
  ref,
  onClose,
}: {
  itemName: string;
  itemDesc: string;
} & Pick<ComponentProps<typeof Drawer>, 'ref' | 'onClose'>) => {
  return (
    <Drawer ref={ref} onClose={onClose}>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          height: '[100%]',
        })}
      >
        <form
          action={async (f) => {
            console.log(f.get('item-name'));
            console.log(f.get('item-desc'));
            onClose();
          }}
          className={css({
            display: 'flex',
            flexDirection: 'column',
            height: '[100%]',
            justifyContent: 'space-between',
            gap: '16px',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            })}
          >
            <TextInput
              required
              label="ヴィランのなまえ *"
              defaultValue={itemName}
              name="item-name"
            />
            <TextArea
              label="せつめい"
              defaultValue={itemDesc}
              name="item-desc"
            />
          </div>
          <div
            className={css({
              display: 'flex',
              justifyContent: 'center',
              py: '24px',
            })}
          >
            <Button type="submit">
              <div className={css({ width: '[230px]' })}>かくてい</div>
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  );
};
