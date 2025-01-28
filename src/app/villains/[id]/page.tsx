'use client';

import { Header } from '@/app/_components/header';
import { Edit, Trash } from '@/assets/icons';
import { Button } from '@/components/button';
import { IconButton } from '@/components/icon-button';
import { FooterNavigation } from '@/components/navigation';
import { useDialog } from '@/hooks/dialog';
import { css } from '@/styled-system/css';
import { DeleteConfirmDialog } from '../../_components/delete-confirm-dialog';
import { EditVillainDrawer } from './_components/edit-villain-drawer';

const Page = async (props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id: villainId } = await props.params;
  const editDrawer = useDialog();
  const deleteConfirm = useDialog();
  return (
    <main
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '16px',
        height: '[100%]',
        padding: '8px',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        })}
      >
        <Header
          rightSlot={
            <div className={css({ display: 'flex', gap: '8px' })}>
              <IconButton onClick={editDrawer.show}>
                <Edit className={css({ width: '[24px]', height: '[24px]' })} />
              </IconButton>
              <IconButton onClick={deleteConfirm.show}>
                <Trash className={css({ width: '[24px]', height: '[24px]' })} />
              </IconButton>
            </div>
          }
        />
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            px: '12px',
          })}
        >
          <h1 className={css({ textStyle: 'Body.primary' })}>
            シゴトへの憂うつなきもち
          </h1>
          <p className={css({ textStyle: 'Body.tertiary', color: 'gray.50' })}>
            あいてむのせつめい
          </p>
        </div>
      </div>
      <div className={css({ position: 'sticky', bottom: 0 })}>
        <div
          className={css({
            width: '[100%]',
            display: 'flex',
            justifyContent: 'center',
            py: '24px',
          })}
        >
          <Button>
            <div className={css({ width: '[230px]' })}>たたかった！</div>
          </Button>
        </div>
        <FooterNavigation />
      </div>
      <EditVillainDrawer
        itemName="あいてむのなまえ"
        itemDesc="あいてむのせつめい"
        ref={editDrawer.ref}
        onClose={editDrawer.close}
      />
      <DeleteConfirmDialog
        dialog={deleteConfirm}
        itemName="あいてむのなまえ"
        onDelete={() => {
          console.log('delete');
          deleteConfirm.close();
        }}
      />
    </main>
  );
};

export default Page;
