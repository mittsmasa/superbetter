import { Header } from '@/app/_components/header';
import { Edit, Trash } from '@/assets/icons';
import { Button } from '@/components/button';
import { IconButton } from '@/components/icon-button';
import { FooterNavigation } from '@/components/navigation';
import { css } from '@/styled-system/css';
import { use } from 'react';

const Page = (props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id: powerupId } = use(props.params);
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
              <IconButton>
                <Edit className={css({ width: '[24px]', height: '[24px]' })} />
              </IconButton>
              <IconButton>
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
    </main>
  );
};

export default Page;
