'use client';

import { useEffect, useState } from 'react';
import { Drawer } from '@/components/drawer';
import { IconButton } from '@/components/icon-button';
import { Plus } from '@/components/icons';
import type { EntityType } from '@/db/types/mission';
import { useDialog } from '@/hooks/dialog';
import { css } from '@/styled-system/css';
import { EntityHistoryItem } from './entity-history-item';
import type { EntityHistoryLog } from './entity-history-section';
import { EntityListContent } from './entity-list-content';

type EntityHistorySectionContentProps = {
  title: string;
  entityType: EntityType;
  histories: EntityHistoryLog[];
  isEditable: boolean;
  availableEntities: { id: string; title: string }[];
  targetDate: Date;
};

export const EntityHistorySectionContent = ({
  title,
  entityType,
  histories,
  isEditable,
  availableEntities,
  targetDate,
}: EntityHistorySectionContentProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { ref, show, close } = useDialog();

  const sortedHistories = [...histories].sort(
    (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
  );

  useEffect(() => {
    if (isDrawerOpen) {
      show();
    } else {
      close();
    }
  }, [isDrawerOpen, show, close]);

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      })}
    >
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8px',
        })}
      >
        <h2 className={css({ textStyle: 'Heading.secondary' })}>{title}</h2>
        {isEditable && (
          <IconButton onClick={() => setIsDrawerOpen(true)} size="md">
            <Plus size={24} />
          </IconButton>
        )}
      </div>

      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        })}
      >
        {sortedHistories.length === 0 && (
          <p
            className={css({
              textAlign: 'center',
              textStyle: 'Body.tertiary',
              padding: '16px',
            })}
          >
            記録がありません
          </p>
        )}

        {sortedHistories.map((history) => (
          <EntityHistoryItem
            key={history.id}
            history={history}
            isEditable={isEditable}
            targetDate={targetDate}
          />
        ))}
      </div>

      <Drawer ref={ref} onClose={() => setIsDrawerOpen(false)}>
        <EntityListContent
          entityType={entityType}
          entities={availableEntities}
          onAddComplete={() => setIsDrawerOpen(false)}
          targetDate={targetDate}
        />
      </Drawer>
    </div>
  );
};
