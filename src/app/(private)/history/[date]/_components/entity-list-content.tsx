'use client';

import { motion } from 'motion/react';
import { useState, useTransition } from 'react';
import { IconButton } from '@/components/icon-button';
import { Plus } from '@/components/icons';
import { useToast } from '@/components/toast';
import type { EntityType } from '@/db/types/mission';
import { css } from '@/styled-system/css';
import { EntityIcon } from '../../../_components/entity-icon';

type EntityListContentProps = {
  entityType: EntityType;
  entities: { id: string; title: string }[];
  onAddComplete: () => void;
};

export const EntityListContent = ({
  entityType,
  entities,
  onAddComplete,
}: EntityListContentProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { add: addToast } = useToast();

  const handleAdd = (_entityId: string) => {
    startTransition(async () => {
      // TODO: Phase 2で実装するpostアクションを呼び出す
      // 仮実装: 成功として処理
      await new Promise((resolve) => setTimeout(resolve, 300));

      addToast({ message: '追加しました' });
      onAddComplete();
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
        gap: '4px',
      })}
    >
      {entities.map((entity) => (
        <div
          key={entity.id}
          className={css({
            position: 'relative',
            overflow: 'hidden',
          })}
        >
          <motion.div
            layout
            initial={false}
            animate={{ x: selectedId === entity.id ? -80 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={() => setSelectedId(entity.id)}
            className={css({
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px',
              backgroundColor: 'background',
              cursor: 'pointer',
            })}
          >
            <EntityIcon itemType={entityType} completed size={24} />
            <p className={css({ textStyle: 'Body.primary' })}>{entity.title}</p>
          </motion.div>

          {selectedId === entity.id && (
            <div
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
