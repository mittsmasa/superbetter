'use client';

import {
  Button,
  Drawer,
  IconButtonWithLabel,
  TextArea,
  TextInput,
  useDialog,
} from '@superbetter/ui';
import { useTransition } from 'react';
import { editQuest } from '@/app/(private)/quests/_actions/edit-quest';
import { Edit } from '@/assets/icons';
import { css } from '@/styled-system/css';

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
                flex: '1',
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
