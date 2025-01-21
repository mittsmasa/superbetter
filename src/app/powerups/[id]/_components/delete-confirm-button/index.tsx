'use client';

import { Trash } from '@/assets/icons';
import { Button } from '@/components/button';
import { Dialog } from '@/components/dialog';
import { IconButton } from '@/components/icon-button';
import { useDialog } from '@/hooks/dialog';
import { css } from '@/styled-system/css';

export const DeleteConfirmButton = (props: { id: string; name: string }) => {
  const deleteConfirm = useDialog();
  return (
    <>
      <IconButton onClick={deleteConfirm.show}>
        <Trash className={css({ width: '[24px]', height: '[24px]' })} />
      </IconButton>
      <Dialog ref={deleteConfirm.ref}>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          })}
        >
          <div>
            <p className={css({ textAlign: 'center', lineClamp: 3 })}>
              {props.name}
            </p>
            <p
              className={css({
                textAlign: 'center',
                textStyle: 'Body.secondary',
              })}
            >
              を削除しますか
            </p>
          </div>
          <form
            action={async () => {}}
            className={css({
              display: 'flex',
              gap: '8px',
              justifyContent: 'center',
            })}
          >
            <Button type="submit">
              <div className={css({ width: '[100px]' })}>さくじょ</div>
            </Button>
            <Button
              type="button"
              onClick={deleteConfirm.close}
              variant="secondary"
            >
              <div className={css({ width: '[100px]' })}>キャンセル</div>
            </Button>
          </form>
        </div>
      </Dialog>
    </>
  );
};
