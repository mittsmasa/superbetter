import { getEntityStats } from '@/app/(private)/_actions/get-entity-stats';
import { getVillain } from '@/app/(private)/_actions/get-villain';
import { EntityStats } from '@/components/entity-stats';
import { Header } from '@/components/header';
import { css } from '@/styled-system/css';
import { DeleteConfirmButton } from './_components/delete-confirm-button';
import { EditVillainButton } from './_components/edit-villain-button';
import { ExecuteButton } from './_components/execute-button';

const Page = async (props: PageProps<'/villains/[id]'>) => {
  const { id: villainId } = await props.params;
  const villain = await getVillain(villainId);

  if (villain.type === 'error') {
    throw new Error(villain.error.message);
  }

  const stats = await getEntityStats(
    'villain',
    villainId,
    villain.data.createdAt,
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
              <EditVillainButton
                id={villain.data.id}
                name={villain.data.title}
                description={villain.data.description}
              />
              <DeleteConfirmButton
                id={villain.data.id}
                name={villain.data.title}
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
            {villain.data.title}
          </h1>
          {villain.data.description && (
            <p
              className={css({
                textStyle: 'Body.tertiary',
                color: 'foreground',
                whiteSpace: 'pre-wrap',
              })}
            >
              {villain.data.description}
            </p>
          )}
        </div>
        {stats.type === 'ok' && (
          <EntityStats
            totalCount={villain.data.count}
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
        <ExecuteButton villainId={villainId} />
      </div>
    </main>
  );
};

export default Page;
