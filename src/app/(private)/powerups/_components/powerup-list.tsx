'use client';

import { Reorder } from '@/components/reorder';
import { useEffect, useState } from 'react';
import {
  EntityLink,
  EntityLinkReorderHandle,
} from '../../_components/entity-link';
import { reorderPowerups } from '../_actions/reorder-powerups';

export const PowerupList = ({
  powerups,
}: {
  powerups: {
    id: string;
    title: string;
    description?: string | null;
  }[];
}) => {
  const [orderedPowerups, setOrderedPowerups] = useState(powerups);
  useEffect(() => {
    setOrderedPowerups(powerups);
  }, [powerups]);
  return (
    <Reorder.List
      values={powerups}
      onReorder={setOrderedPowerups}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        justifyContent: 'stretch',
      }}
    >
      {orderedPowerups.map((p) => (
        <Reorder.ListItem
          key={p.id}
          value={p}
          renderItem={({ controls }) => (
            <EntityLink
              href={`/powerups/${p.id}`}
              title={p.title}
              description={p.description}
              reorderHandleSlot={
                <EntityLinkReorderHandle
                  onPointerDown={(e) => controls.start(e)}
                  onPointerUp={async () => {
                    await reorderPowerups(orderedPowerups);
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
