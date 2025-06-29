'use client';

import { useTransition } from 'react';
import { editVillain } from '@/app/(private)/villains/_actions/edit-villain';
import { Edit } from '@/assets/icons';
import { Button } from '@/components/button';
import { Drawer } from '@/components/drawer';
import { IconButtonWithLabel } from '@/components/icon-button/with-label';
import { TextArea } from '@/components/text-area';
import { TextInput } from '@/components/text-input';
import { useDialog } from '@/hooks/dialog';
import { css } from '@/styled-system/css';

export const EditVillainButton = ({
  id,
  name,
  description,
}: {
  id: string;
  name: string;
  description: string | null;
}) => {
  const dialog = useDialog();
  const [isPending, startTransition] = useTransition();
  return (
    <>
      <IconButtonWithLabel onClick={dialog.show} label="へんしゅう" size="md">
        <Edit />
      </IconButtonWithLabel>
      <Drawer ref={dialog.ref} onClose={dialog.close}>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            height: '[100%]',
          })}
        >
          <form
            action={async (f) => {
              const name = f.get('item-name') as string;
              const description = f.get('item-desc') as string | null;
              startTransition(async () => {
                const { type } = await editVillain({
                  description,
                  name,
                  villainId: id,
                });
                if (type === 'ok') {
                  dialog.close();
                  return;
                }
                alert('エラーがおきました');
              });
            }}
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              height: '[100%]',
              justifyContent: 'space-between',
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
                defaultValue={name}
                name="item-name"
              />
              <TextArea
                label="せつめい"
                defaultValue={description ?? ''}
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
              <Button type="submit" disabled={isPending}>
                <div className={css({ width: '[230px]' })}>かくてい</div>
              </Button>
            </div>
          </form>
        </div>
      </Drawer>
    </>
  );
};
