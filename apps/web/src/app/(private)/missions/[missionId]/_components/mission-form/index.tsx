'use client';

import { Button, Radio } from '@superbetter/ui';
import Link from 'next/link';
import { type ComponentProps, useTransition } from 'react';
import { IconMap } from '@/components/entity-icon/entity-icon-map';
import type { EntityType } from '@/db/types/mission';
import { useEntityFeedback } from '@/hooks/feedback';
import { css } from '@/styled-system/css';
import type { AllEntities } from '../../_actions/get-all-entities';
import { postEntityHistory } from '../../_actions/post-entity-history';
import { getEntity, getEntityValue } from '../../_utils/converter';

export const MissionForm = ({ entities }: { entities: AllEntities }) => {
  const { powerups, quests, villains, LIMIT } = entities;
  const [isPending, startTransition] = useTransition();
  const { triggerFeedback } = useEntityFeedback();
  return (
    <form
      action={async (a) => {
        const val = a.get('entity') as string | null;
        if (!val) {
          return;
        }
        const entity = getEntity(val);
        startTransition(async () => {
          await postEntityHistory(entity);
          triggerFeedback(entity.type);
        });
      }}
      className={css({
        display: 'flex',
        flexDirection: 'column',
        height: '[100%]',
        // div:last-child is submit button container
        '& > div:last-child': {
          display: 'none',
        },
        '&:has(input:checked) > div:last-child': {
          display: 'flex',
        },
      })}
    >
      <div
        className={css({
          flex: '1',
          minHeight: '[0]',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '16px',
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
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'background',
          display: 'flex',
          justifyContent: 'center',
          padding: '16px',
          borderTop: '1px solid',
          borderColor: 'interactive.border',
        })}
      >
        <Button disabled={isPending} type="submit">
          {isPending ? '送信中...' : 'つかった / いどんだ / たたかった'}
        </Button>
      </div>
    </form>
  );
};

const EntityList = <T extends string>({
  type,
  entities,
  showMore,
  showMoreLink,
}: {
  type: EntityType;
  entities: { id: string; title: string }[];
  showMore: boolean;
  showMoreLink: ComponentProps<typeof Link<T>>['href'];
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
          {IconMap[type]}
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

const Label = {
  powerup: 'パワーアップ',
  quest: 'クエスト',
  villain: 'ヴィラン',
  epicwin: 'エピックウィン',
} as const satisfies Record<EntityType, string>;
