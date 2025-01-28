import { getMission } from '@/app/_actions/get-mission';
import { getPowerups } from '@/app/_actions/get-powerup';
import { postPowerupHistory } from '@/app/_actions/post-powerup-history';
import { MissionEntities } from '@/app/_components/mission/entitity';
import { Zap } from '@/assets/icons';
import { Button } from '@/components/button';
import { FooterNavigation } from '@/components/navigation';
import { Radio } from '@/components/radio';
import { css } from '@/styled-system/css';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { Header } from '../../_components/header';
import { getEntity, getEntityValue } from './_utils/converter';

const Page = async (props: {
  params: Promise<{ missionId: string }>;
}) => {
  const { missionId } = await props.params;
  const mission = await getMission(missionId);
  if (mission.type === 'error') {
    throw new Error(mission.error.message);
  }
  return (
    <main
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '16px',
        height: '[100%]',
        overflow: 'auto',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        })}
      >
        <div
          className={css({
            backgroundColor: 'black',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'sticky',
            top: 0,
          })}
        >
          <Header />
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              px: '8px',
            })}
          >
            <h1 className={css({ textStyle: 'Heading.primary' })}>
              {mission.data.title}
            </h1>
            <div>
              {mission.data.description?.split('\n').map((line, i) => (
                <p
                  key={i}
                  className={css({
                    textAlign: 'center',
                    textStyle: 'Body.secondary',
                  })}
                >
                  {line}
                </p>
              ))}
            </div>
            <MissionEntities
              items={mission.data.missionConditions.map((mc) => ({
                id: mc.id,
                missionItemType: mc.itemType,
                completed: mc.completed,
              }))}
            />
          </div>
        </div>
        <form
          action={async (a) => {
            'use server';
            const val = a.get('entity') as string;
            const entity = getEntity(val);
            if (entity.type === 'powerup') {
              await postPowerupHistory(entity.id);
            }
            revalidatePath('/missions/[missionId]', 'page');
          }}
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            })}
          >
            <EntityList />
            <div
              className={css({
                backgroundColor: 'black',
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                position: 'sticky',
                py: '8px',
              })}
            >
              <Button type="submit">つかった / いどんだ / たたかった</Button>
            </div>
          </div>
        </form>
      </div>
      <div className={css({ position: 'sticky', bottom: 0, padding: '8px' })}>
        <FooterNavigation />
      </div>
    </main>
  );
};

export default Page;

const EntityList = async () => {
  const LIMIT = 3;
  const powerups = await getPowerups({ limit: LIMIT });
  if (powerups.type === 'error') {
    throw new Error(powerups.error.message);
  }
  const showMore = powerups.data.count > LIMIT;
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        px: '8px',
      })}
    >
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
        })}
      >
        <div
          className={css({
            alignItems: 'center',
            display: 'flex',
            gap: '8px',
          })}
        >
          <Zap className={css({ width: '[24px]', height: '[24px]' })} />
          <p
            className={css({
              textStyle: 'Body.secondary',
            })}
          >
            パワーアップアイテム
          </p>
        </div>
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        })}
      >
        {powerups.data.records.map((p) => (
          <Radio
            key={p.id}
            name="entity"
            value={getEntityValue({ type: 'powerup', id: p.id })}
            label={p.title}
          />
        ))}
      </div>
      {showMore && (
        <div className={css({ textAlign: 'center' })}>
          <Link
            href="/powerups"
            className={css({ padding: '12px', textStyle: 'Body.secondary' })}
          >
            もっとみる
          </Link>
        </div>
      )}
    </div>
  );
};
