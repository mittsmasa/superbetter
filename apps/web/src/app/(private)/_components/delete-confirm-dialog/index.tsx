'use client';
import { Button } from '@/components/button';
import { Dialog } from '@/components/dialog';
import type { useDialog } from '@/hooks/dialog';

import { css } from '@/styled-system/css';

export const DeleteConfirmDialog = ({
  dialog,
  itemName,
  onDelete,
}: {
  dialog: ReturnType<typeof useDialog>;
  itemName: string;
  onDelete: () => void;
}) => {
  return (
    <Dialog ref={dialog.ref}>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        })}
      >
        <div>
          <p className={css({ textAlign: 'center', lineClamp: 3 })}>
            {itemName}
          </p>
          <p
            className={css({
              textAlign: 'center',
              textStyle: 'Body.secondary',
            })}
          >
            をアーカイブしますか
          </p>
        </div>
        <div
          className={css({
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
          })}
        >
          <Button onClick={() => onDelete()}>
            <div className={css({ width: '[100px]' })}>アーカイブ</div>
          </Button>
          <Button onClick={dialog.close} variant="secondary">
            <div className={css({ width: '[100px]' })}>キャンセル</div>
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
