'use client';

import { IconButton, useToast } from '@superbetter/ui';
import { Close, Trash } from '@superbetter/ui/icons';
import { motion } from 'motion/react';
import { useEffect, useRef, useState, useTransition } from 'react';
import { deletePowerupHistory } from '@/app/(private)/_actions/delete-powerup-history';
import { deleteQuestHistory } from '@/app/(private)/_actions/delete-quest-history';
import { deleteVillainHistory } from '@/app/(private)/_actions/delete-villain-history';
import { EntityIcon } from '@/components/entity-icon';
import { css, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';
import type { EntityType } from '@/types/superbetter';

type EntityHistoryItemProps = {
  history: {
    id: string;
    type: EntityType;
    title: string;
    createdAt: Date;
  };
  isEditable: boolean;
  targetDate: Date;
};

export const EntityHistoryItem = ({
  history,
  isEditable,
  targetDate,
}: EntityHistoryItemProps) => {
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { add: addToast } = useToast();

  const deleteAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      event.stopPropagation();
      if (
        deleteAreaRef.current &&
        !deleteAreaRef.current.contains(event.target as Node)
      ) {
        setIsDeleteVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    startTransition(async () => {
      let result:
        | Awaited<ReturnType<typeof deleteQuestHistory>>
        | Awaited<ReturnType<typeof deletePowerupHistory>>
        | Awaited<ReturnType<typeof deleteVillainHistory>>
        | undefined;
      if (history.type === 'quest') {
        result = await deleteQuestHistory(history.id, targetDate);
      } else if (history.type === 'powerup') {
        result = await deletePowerupHistory(history.id, targetDate);
      } else if (history.type === 'villain') {
        result = await deleteVillainHistory(history.id, targetDate);
      }

      if (result?.type === 'ok') {
        addToast({ message: '削除しました' });
        setIsDeleteVisible(false);
      } else {
        addToast({ message: result?.error.message || '削除に失敗しました' });
      }
    });
  };

  return (
    <div
      className={css({
        position: 'relative',
      })}
    >
      <motion.button
        layout
        initial={false}
        animate={{ x: isDeleteVisible ? -40 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => {
          e.stopPropagation();
          setIsDeleteVisible(true);
        }}
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
        <EntityIcon itemType={history.type} completed size={18} />
        <div className={css({ flex: '1' })}>
          <p
            className={css({ textStyle: 'Body.secondary', textAlign: 'left' })}
          >
            {history.title}
          </p>
        </div>
        {isEditable && <Close size={20} />}
      </motion.button>

      {isDeleteVisible && (
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
            onClick={handleDelete}
            disabled={isPending}
            size="md"
            active
          >
            <Trash size={24} />
          </IconButton>
        </div>
      )}
    </div>
  );
};
