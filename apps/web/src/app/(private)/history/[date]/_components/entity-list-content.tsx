'use client';

import { motion } from 'motion/react';
import { useEffect, useRef, useState, useTransition } from 'react';
import { postPowerupHistoryAtDate } from '@/app/(private)/_actions/post-powerup-history-at-date';
import { postQuestHistoryAtDate } from '@/app/(private)/_actions/post-quest-history-at-date';
import { postVillainHistoryAtDate } from '@/app/(private)/_actions/post-villain-history-at-date';
import { IconButton } from '@/components/icon-button';
import { Plus } from '@/components/icons';
import { useToast } from '@/components/toast';
import type { EntityType } from '@/db/types/mission';
import { css, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';
import { EntityIcon } from '../../../_components/entity-icon';

type EntityListContentProps = {
  entityType: EntityType;
  entities: { id: string; title: string }[];
  onAddComplete: () => void;
  targetDate: Date;
};

export const EntityListContent = ({
  entityType,
  entities,
  onAddComplete,
  targetDate,
}: EntityListContentProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { add: addToast } = useToast();
  const deleteAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        deleteAreaRef.current &&
        !deleteAreaRef.current.contains(event.target as Node)
      ) {
        setSelectedId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleAdd = (entityId: string) => {
    startTransition(async () => {
      let result:
        | Awaited<ReturnType<typeof postQuestHistoryAtDate>>
        | Awaited<ReturnType<typeof postPowerupHistoryAtDate>>
        | Awaited<ReturnType<typeof postVillainHistoryAtDate>>
        | undefined;
      if (entityType === 'quest') {
        result = await postQuestHistoryAtDate(entityId, targetDate);
      } else if (entityType === 'powerup') {
        result = await postPowerupHistoryAtDate(entityId, targetDate);
      } else if (entityType === 'villain') {
        result = await postVillainHistoryAtDate(entityId, targetDate);
      }

      if (result?.type === 'ok') {
        addToast({ message: '追加しました' });
        onAddComplete();
      } else {
        addToast({ message: result?.error.message || '追加に失敗しました' });
      }
    });
  };

  if (entities.length === 0) {
    return (
      <div
        className={css({
          padding: '16px',
          textAlign: 'center',
          textStyle: 'Body.tertiary',
        })}
      >
        エンティティがありません
      </div>
    );
  }

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      })}
    >
      {entities.map((entity) => (
        <div key={entity.id} className={css({ position: 'relative' })}>
          <motion.button
            layout
            initial={false}
            tabIndex={0}
            animate={{ x: selectedId === entity.id ? -40 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={() => setSelectedId(entity.id)}
            className={cx(
              pixelBorder({
                borderWidth: 2,
                borderColor: 'interactive.border',
              }),
              css({
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px',
                backgroundColor: 'interactive.background',
                cursor: 'pointer',
                width: '[100%]',
              }),
            )}
          >
            <EntityIcon itemType={entityType} completed size={24} />
            <p className={css({ textStyle: 'Body.primary' })}>{entity.title}</p>
          </motion.button>

          {selectedId === entity.id && (
            <div
              ref={deleteAreaRef}
              className={css({
                position: 'absolute',
                right: 0,
                top: 0,
                height: '[100%]',
                display: 'flex',
                alignItems: 'center',
                paddingRight: '8px',
              })}
            >
              <IconButton
                onClick={() => handleAdd(entity.id)}
                disabled={isPending}
                size="md"
                active
              >
                <Plus size={24} />
              </IconButton>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
