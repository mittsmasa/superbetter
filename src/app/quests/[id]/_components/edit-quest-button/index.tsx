'use client';

import { editQuest } from '@/app/quests/_actions/edit-quest';
import { Edit } from '@/assets/icons';
import { Button } from '@/components/button';
import { Drawer } from '@/components/drawer';
import { IconButton } from '@/components/icon-button';
import { TextArea } from '@/components/text-area';
import { TextInput } from '@/components/text-input';
import { useDialog } from '@/hooks/dialog';
import { css } from '@/styled-system/css';
import { useTransition } from 'react';

export const EditQuestButton = ({
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
      <IconButton onClick={dialog.show}>
        <Edit className={css({ width: '[24px]', height: '[24px]' })} />
      </IconButton>
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
                const { type } = await editQuest({
                  questId: id,
                  name,
                  description,
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
                label="クエストのなまえ *"
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
