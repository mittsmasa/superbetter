'use client';

import { DeleteConfirmDialog } from '@/app/_components/delete-confirm-dialog';
import { Trash } from '@/assets/icons';
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
      <DeleteConfirmDialog
        dialog={deleteConfirm}
        itemName={props.name}
        onDelete={() => {
          deleteConfirm.close();
        }}
      />
    </>
  );
};
