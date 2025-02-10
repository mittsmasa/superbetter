'use client';

import { DeleteConfirmDialog } from '@/app/(private)/_components/delete-confirm-dialog';
import { Trash } from '@/assets/icons';
import { IconButton } from '@/components/icon-button';
import { useDialog } from '@/hooks/dialog';
import { css } from '@/styled-system/css';
import { useRouter } from 'next/navigation';
import { deleteVillain } from '../../_actions/delete-villain';

export const DeleteConfirmButton = (props: { id: string; name: string }) => {
  const deleteConfirm = useDialog();
  const router = useRouter();
  return (
    <>
      <IconButton onClick={deleteConfirm.show}>
        <Trash className={css({ width: '[24px]', height: '[24px]' })} />
      </IconButton>
      <DeleteConfirmDialog
        dialog={deleteConfirm}
        itemName={props.name}
        onDelete={async () => {
          const res = await deleteVillain({ id: props.id });
          if (res.type === 'error') {
            throw new Error(res.error.message);
          }
          router.push('/villains');
          deleteConfirm.close();
        }}
      />
    </>
  );
};
