'use client';

import { Header } from '@/app/_components/header';
import { Edit, Trash } from '@/assets/icons';
import { Button } from '@/components/button';
import { Dialog } from '@/components/dialog';
import { IconButton } from '@/components/icon-button';
import { FooterNavigation } from '@/components/navigation';
import { useDialog } from '@/hooks/dialog';
import { css } from '@/styled-system/css';
import { use } from 'react';
import { EditPowerupDrawer } from './_components/edit-powerup-drawer';

const Page = (props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id: powerupId } = use(props.params);
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
            パワーブレスする
          </h1>
          <p className={css({ textStyle: 'Body.tertiary', color: 'gray.50' })}>
            パワーアップアイテムを使って、パワーブレスをする
          </p>
        </div>
      </div>
      <div className={css({ position: 'sticky', bottom: 0 })}>
        <div
          className={css({
            width: '[100%]',
            display: 'flex',
            justifyContent: 'center',
            py: '8px',
          })}
        >
          <Button>
            <div className={css({ width: '[230px]' })}>つかった！</div>
          </Button>
        </div>
        <FooterNavigation />
      </div>
      <EditPowerupDrawer
        itemName="あいてむのなまえ"
        itemDesc="あいてむのせつめい"
        ref={editDrawer.ref}
        onClose={editDrawer.close}
      />
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
              パワーブレスするあああああああああああああああああああああああああああaaaaaaああああああああああああああああああああああああああああああああああああああああああああああああああああああ
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
          <div
            className={css({
              display: 'flex',
              gap: '8px',
              justifyContent: 'center',
            })}
          >
            <Button>
              <div className={css({ width: '[100px]' })}>さくじょ</div>
            </Button>
            <Button onClick={deleteConfirm.close} variant="secondary">
              <div className={css({ width: '[100px]' })}>キャンセル</div>
            </Button>
          </div>
        </div>
      </Dialog>
    </main>
  );
};

export default Page;
