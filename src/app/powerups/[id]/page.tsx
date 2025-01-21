import { Header } from '@/app/_components/header';
import { Button } from '@/components/button';
import { FooterNavigation } from '@/components/navigation';
import { css } from '@/styled-system/css';
import { use } from 'react';
import { getPowerup } from '../_actions/get-powerup';
import { DeleteConfirmButton } from './_components/delete-confirm-button';
import { EditPowerupButton } from './_components/edit-powerup-button';

const Page = (props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id: powerupId } = use(props.params);
  const powerup = use(getPowerup(powerupId));

  if (powerup.type === 'error') {
    throw new Error(powerup.error.message);
  }

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
              <EditPowerupButton
                id={powerup.data.id}
                name={powerup.data.title}
                description={powerup.data.description}
              />

              <DeleteConfirmButton
                id={powerup.data.id}
                name={powerup.data.title}
              />
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
            {powerup.data.title}
          </h1>
          {powerup.data.description && (
            <p
              className={css({ textStyle: 'Body.tertiary', color: 'gray.50' })}
            >
              {powerup.data.description}
            </p>
          )}
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
            <div className={css({ width: '[230px]' })}>つかった！</div>
          </Button>
        </div>
        <FooterNavigation />
      </div>
    </main>
  );
};

export default Page;
