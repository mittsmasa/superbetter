'use client';

import { IconButtonWithLabel, useDialog } from '@superbetter/ui';
import { useRouter } from 'next/navigation';
import { DeleteConfirmDialog } from '@/app/(private)/_components/delete-confirm-dialog';
import { Archive } from '@/assets/icons';
import { archiveQuest } from '../../_actions/archive-quest';

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
          const res = await archiveQuest({ id: props.id });
          if (res.type === 'error') {
            throw new Error(res.error.message);
          }
          router.push('/quests');
          deleteConfirm.close();
        }}
      />
    </>
  );
};
