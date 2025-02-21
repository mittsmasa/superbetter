'use client';

import { DeleteConfirmDialog } from '@/app/(private)/_components/delete-confirm-dialog';
import { Archive } from '@/assets/icons';
import { IconButton } from '@/components/icon-button';
import { useDialog } from '@/hooks/dialog';
import { css } from '@/styled-system/css';
import { useRouter } from 'next/navigation';
import { archivePowerup } from '../../_actions/archive-powerup';

export const DeleteConfirmButton = (props: { id: string; name: string }) => {
  const deleteConfirm = useDialog();
  const router = useRouter();
  return (
    <>
      <IconButton onClick={deleteConfirm.show}>
        <Archive className={css({ width: '[24px]', height: '[24px]' })} />
      </IconButton>
      <DeleteConfirmDialog
        dialog={deleteConfirm}
        itemName={props.name}
        onDelete={async () => {
          const res = await archivePowerup({ id: props.id });
          if (res.type === 'error') {
            throw new Error(res.error.message);
          }
          router.push('/powerups');
          deleteConfirm.close();
        }}
      />
    </>
  );
};
