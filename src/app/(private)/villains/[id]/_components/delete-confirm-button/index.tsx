'use client';

import { useRouter } from 'next/navigation';
import { DeleteConfirmDialog } from '@/app/(private)/_components/delete-confirm-dialog';
import { Archive } from '@/assets/icons';
import { IconButtonWithLabel } from '@/components/icon-button/with-label';
import { useDialog } from '@/hooks/dialog';
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
