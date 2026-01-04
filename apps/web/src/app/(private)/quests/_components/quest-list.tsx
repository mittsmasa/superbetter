'use client';

import { Reorder } from '@superbetter/ui';
import { useEffect, useState } from 'react';
import { useSortable } from '@/app/_components/sortable/provider';
import { EntityLink, EntityLinkReorderHandle } from '@/components/entity-link';
import { reorderQuests } from '../_actions/reorder-quests';

export const QuestList = ({
  quests,
}: {
  quests: {
    id: string;
    title: string;
    description?: string | null;
  }[];
}) => {
  const { sortable } = useSortable();
  const [orderedQuests, setOrderedQuests] = useState(quests);
  useEffect(() => {
    setOrderedQuests(quests);
  }, [quests]);
  return (
    <Reorder.List
      values={quests}
      onReorder={setOrderedQuests}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        justifyContent: 'stretch',
      }}
    >
      {orderedQuests.map((q) => (
        <Reorder.ListItem
          key={q.id}
          value={q}
          renderItem={({ controls }) => (
            <EntityLink
              href={`/quests/${q.id}`}
              disabled={sortable}
              title={q.title}
              description={q.description}
              reorderHandleSlot={
                sortable && (
                  <EntityLinkReorderHandle
                    onPointerDown={(e) => controls.start(e)}
                    onPointerUp={async () => {
                      await reorderQuests(orderedQuests);
                    }}
                  />
                )
              }
            />
          )}
        />
      ))}
    </Reorder.List>
  );
};
