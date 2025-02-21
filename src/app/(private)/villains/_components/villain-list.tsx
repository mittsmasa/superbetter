'use client';

import { Reorder } from '@/components/reorder';
import { useEffect, useState } from 'react';
import {
  EntityLink,
  EntityLinkReorderHandle,
} from '../../_components/entity-link';
import { reorderVillains } from '../_actions/reorder-villains';

export const VillainList = ({
  villains,
}: {
  villains: {
    id: string;
    title: string;
    description?: string | null;
  }[];
}) => {
  const [orderedVillains, setOrderedVillains] = useState(villains);
  useEffect(() => {
    setOrderedVillains(villains);
  }, [villains]);
  return (
    <Reorder.List
      values={villains}
      onReorder={setOrderedVillains}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        justifyContent: 'stretch',
      }}
    >
      {orderedVillains.map((q) => (
        <Reorder.ListItem
          key={q.id}
          value={q}
          renderItem={({ controls }) => (
            <EntityLink
              href={`/villains/${q.id}`}
              title={q.title}
              description={q.description}
              reorderHandleSlot={
                <EntityLinkReorderHandle
                  onPointerDown={(e) => controls.start(e)}
                  onPointerUp={async () => {
                    await reorderVillains(orderedVillains);
                  }}
                />
              }
            />
          )}
        />
      ))}
    </Reorder.List>
  );
};
