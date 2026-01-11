import { getEntityStats } from '@/app/(private)/_actions/get-entity-stats';
import { EntityStats } from '@/components/entity-stats';
import { Header } from '@/components/header';
import { css } from '@/styled-system/css';
import { getPowerup } from '../../_actions/get-powerup';
import { DeleteConfirmButton } from './_components/delete-confirm-button';
import { EditPowerupButton } from './_components/edit-powerup-button';
import { ExecuteButton } from './_components/execute-button';

const Page = async (props: PageProps<'/powerups/[id]'>) => {
  const { id: powerupId } = await props.params;
  const powerup = await getPowerup(powerupId);

  if (powerup.type === 'error') {
    throw new Error(powerup.error.message);
  }

  const stats = await getEntityStats(
    'powerup',
    powerupId,
    powerup.data.createdAt,
  );

  return (
    <main
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '16px',
        height: '[100%]',
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
              className={css({
                textStyle: 'Body.tertiary',
                color: 'foreground',
                whiteSpace: 'pre-wrap',
              })}
            >
              {powerup.data.description}
            </p>
          )}
        </div>
        {stats.type === 'ok' && (
          <EntityStats
            totalCount={powerup.data.count}
            weeklyCount={stats.data.weeklyCount}
            daysSinceCreation={stats.data.daysSinceCreation}
            lastExecutedAt={stats.data.lastExecutedAt}
          />
        )}
      </div>
      <div
        className={css({
          width: '[100%]',
          display: 'flex',
          justifyContent: 'center',
          py: '24px',
        })}
      >
        <ExecuteButton powerupId={powerupId} />
      </div>
    </main>
  );
};

export default Page;
