'use client';

import { Reorder } from '@/components/reorder';
import { useEffect, useState } from 'react';
import { EntityLink } from '../../_components/entity-link';

export const QuestList = ({
  quests,
}: {
  quests: {
    id: string;
    title: string;
    description?: string | null;
  }[];
}) => {
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
              title={q.title}
              description={q.description}
              // reorderHandleSlot={
              //   <EntityLinkReorderHandle
              //     onPointerDown={(e) => controls.start(e)}
              //     onPointerUp={async () => {
              //       await reorderQuests(orderedQuests);
              //     }}
              //   />
              // }
            />
          )}
        />
      ))}
    </Reorder.List>
  );
};
