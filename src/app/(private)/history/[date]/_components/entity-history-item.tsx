'use client';

import { motion } from 'motion/react';
import { useEffect, useRef, useState, useTransition } from 'react';
import { IconButton } from '@/components/icon-button';
import { Close, Trash } from '@/components/icons';
import { useToast } from '@/components/toast';
import type { EntityType } from '@/db/types/mission';
import { css } from '@/styled-system/css';
import { EntityIcon } from '../../../_components/entity-icon';

type EntityHistoryItemProps = {
  history: {
    id: string;
    type: EntityType;
    title: string;
    createdAt: Date;
  };
  isEditable: boolean;
};

export const EntityHistoryItem = ({
  history,
  isEditable,
}: EntityHistoryItemProps) => {
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { add: addToast } = useToast();

  const deleteAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
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
      // TODO: Phase 2で実装するdeleteアクションを呼び出す
      // 仮実装: 成功として処理
      await new Promise((resolve) => setTimeout(resolve, 300));

      addToast({ message: '削除しました' });
      setIsDeleteVisible(false);
    });
  };

  return (
    <div
      className={css({
        position: 'relative',
        overflow: 'hidden',
      })}
    >
      <motion.div
        layout
        initial={false}
        animate={{ x: isDeleteVisible ? -60 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px',
          backgroundColor: 'background',
        })}
      >
        <EntityIcon itemType={history.type} completed size={24} />
        <div className={css({ flex: '1' })}>
          <p className={css({ textStyle: 'Body.primary' })}>{history.title}</p>
        </div>
        {isEditable && (
          <IconButton
            onClick={() => setIsDeleteVisible((prev) => !prev)}
            size="sm"
          >
            <Close size={20} />
          </IconButton>
        )}
      </motion.div>

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
