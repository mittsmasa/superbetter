'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { Android, ScriptText, Zap } from '@/assets/icons';
import { Button } from '@/components/button';
import { Radio } from '@/components/radio';
import type { EntityType } from '@/db/types/mission';
import { css } from '@/styled-system/css';
import type { AllEntities } from '../../_actions/get-all-entities';
import { postEntityHistory } from '../../_actions/post-entity-history';
import { getEntity, getEntityValue } from '../../_utils/converter';

export const MissionForm = ({ entities }: { entities: AllEntities }) => {
  const { powerups, quests, villains, LIMIT } = entities;
  return (
    <form
      action={async (a) => {
        const val = a.get('entity') as string | null;
        if (!val) {
          return;
        }
        const entity = getEntity(val);
        await postEntityHistory(entity);
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
            entities={powerups.records}
            showMore={powerups.count > LIMIT}
            showMoreLink="/powerups"
          />
          <EntityList
            type="quest"
            entities={quests.records}
            showMore={quests.count > LIMIT}
            showMoreLink="/quests"
          />
          <EntityList
            type="villain"
            entities={villains.records}
            showMore={villains.count > LIMIT}
            showMoreLink="/villains"
          />
        </div>
        <div
          className={css({
            backgroundColor: 'background',
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
  type: EntityType;
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
} as const satisfies Record<EntityType, ReactNode>;

const Label = {
  powerup: 'パワーアップ',
  quest: 'クエスト',
  villain: 'ヴィラン',
  epicwin: '未定',
} as const satisfies Record<EntityType, string>;
