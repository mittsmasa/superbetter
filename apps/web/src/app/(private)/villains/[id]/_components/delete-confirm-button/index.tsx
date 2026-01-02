'use client';

import { IconButtonWithLabel, useDialog } from '@superbetter/ui';
import { useRouter } from 'next/navigation';
import { Archive } from '@/assets/icons';
import { DeleteConfirmDialog } from '@/components/delete-confirm-dialog';
import { archiveVillain } from '../../_actions/archive-villain';

export const DeleteConfirmButton = (props: { id: string; name: string }) => {
  const deleteConfirm = useDialog();
  const router = useRouter();
  return (
    <>
      <IconButtonWithLabel
        onClick={deleteConfirm.show}
        label="アーカイブ"
        size="md"
      >
        <Archive />
      </IconButtonWithLabel>
      <DeleteConfirmDialog
        dialog={deleteConfirm}
        itemName={props.name}
        onDelete={async () => {
          const res = await archiveVillain({ id: props.id });
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
