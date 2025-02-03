import { getMission } from '@/app/_actions/get-mission';
import { getPowerups } from '@/app/_actions/get-powerup';
import { getQuests } from '@/app/_actions/get-quest';
import { getVillains } from '@/app/_actions/get-villain';
import { postPowerupHistory } from '@/app/_actions/post-powerup-history';
import { postQuestHistory } from '@/app/_actions/post-quest-history';
import { postVillainHistory } from '@/app/_actions/post-villain-history';
import { MissionEntities } from '@/app/_components/mission/entitity';
import { Android, ScriptText, Zap } from '@/assets/icons';
import { Button } from '@/components/button';
import { FooterNavigation } from '@/components/navigation';
import { Radio } from '@/components/radio';
import type { AdventureItem } from '@/db/types/mission';
import { css } from '@/styled-system/css';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import type { ReactNode } from 'react';
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
                itemType: mc.itemType,
                completed: mc.completed,
              }))}
            />
          </div>
        </div>
        <Form />
      </div>
      <div className={css({ position: 'sticky', bottom: 0, padding: '8px' })}>
        <FooterNavigation />
      </div>
    </main>
  );
};

export default Page;

const Form = async () => {
  const LIMIT = 5;
  const powerups = await getPowerups({ limit: LIMIT });
  const quests = await getQuests({ limit: LIMIT });
  const villains = await getVillains({ limit: LIMIT });
  if (powerups.type === 'error') {
    throw new Error(powerups.error.message);
  }
  if (quests.type === 'error') {
    throw new Error(quests.error.message);
  }
  if (villains.type === 'error') {
    throw new Error(villains.error.message);
  }

  return (
    <form
      action={async (a) => {
        'use server';
        const val = a.get('entity') as string | null;
        if (!val) {
          return;
        }
        const entity = getEntity(val);
        if (entity.type === 'powerup') {
          await postPowerupHistory(entity.id);
        } else if (entity.type === 'quest') {
          await postQuestHistory(entity.id);
        } else if (entity.type === 'villain') {
          await postVillainHistory(entity.id);
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
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          })}
        >
          <EntityList
            type="powerup"
            entities={powerups.data.records}
            showMore={powerups.data.count > LIMIT}
            showMoreLink="/powerups"
          />
          <EntityList
            type="quest"
            entities={quests.data.records}
            showMore={quests.data.count > LIMIT}
            showMoreLink="/quests"
          />
          <EntityList
            type="villain"
            entities={villains.data.records}
            showMore={villains.data.count > LIMIT}
            showMoreLink="/villains"
          />
        </div>
        <div
          className={css({
            backgroundColor: 'black',
            display: 'flex',
            justifyContent: 'center',
            py: '8px',
          })}
        >
          <Button type="submit">つかった / いどんだ / たたかった</Button>
        </div>
      </div>
    </form>
  );
};

const EntityList = ({
  type,
  entities,
  showMore,
  showMoreLink,
}: {
  type: AdventureItem;
  entities: { id: string; title: string }[];
  showMore: boolean;
  showMoreLink: string;
}) => {
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
          {Icon[type]}
          <p
            className={css({
              textStyle: 'Body.secondary',
            })}
          >
            {Label[type]}
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
        {entities.map((p) => (
          <Radio
            required
            key={p.id}
            name="entity"
            value={getEntityValue({ type, id: p.id })}
            label={p.title}
          />
        ))}
      </div>
      {showMore && (
        <div className={css({ textAlign: 'center' })}>
          <Link
            href={showMoreLink}
            className={css({ padding: '12px', textStyle: 'Body.secondary' })}
          >
            もっとみる
          </Link>
        </div>
      )}
    </div>
  );
};

const Icon = {
  powerup: <Zap className={css({ width: '[20px]' })} />,
  quest: <ScriptText className={css({ width: '[20px]' })} />,
  villain: <Android className={css({ width: '[20px]' })} />,
  epicwin: <>未定</>,
} as const satisfies Record<AdventureItem, ReactNode>;

const Label = {
  powerup: 'パワーアップ',
  quest: 'クエスト',
  villain: 'ヴィラン',
  epicwin: '未定',
} as const satisfies Record<AdventureItem, string>;
