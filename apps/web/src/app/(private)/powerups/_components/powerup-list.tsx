'use client';

import { Reorder } from '@superbetter/ui';
import { useEffect, useState } from 'react';
import { useSortable } from '@/app/_components/sortable/provider';
import { postPowerupHistory } from '@/app/(private)/_actions/post-powerup-history';
import { EntityLink, EntityLinkReorderHandle } from '@/components/entity-link';
import { QuickExecuteButton } from '@/components/quick-execute-button';
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
  const { sortable } = useSortable();
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
              disabled={sortable}
              title={p.title}
              description={p.description}
              enableQuickAction={!sortable}
              quickActionSlot={
                <QuickExecuteButton
                  entityType="powerup"
                  onExecute={() => postPowerupHistory(p.id)}
                />
              }
              reorderHandleSlot={
                sortable && (
                  <EntityLinkReorderHandle
                    onPointerDown={(e) => controls.start(e)}
                    onPointerUp={async () => {
                      await reorderPowerups(orderedPowerups);
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
