'use client';

import { Reorder } from '@superbetter/ui';
import { useEffect, useState } from 'react';
import { useSortable } from '@/app/_components/sortable/provider';
import { postVillainHistory } from '@/app/(private)/_actions/post-villain-history';
import { EntityLink, EntityLinkReorderHandle } from '@/components/entity-link';
import { QuickExecuteButton } from '@/components/quick-execute-button';
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
  const { sortable } = useSortable();
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
      {orderedVillains.map((v) => (
        <Reorder.ListItem
          key={v.id}
          value={v}
          renderItem={({ controls }) => (
            <EntityLink
              href={`/villains/${v.id}`}
              disabled={sortable}
              title={v.title}
              description={v.description}
              enableQuickAction={!sortable}
              quickActionSlot={
                <QuickExecuteButton
                  entityType="villain"
                  onExecute={() => postVillainHistory(v.id)}
                />
              }
              reorderHandleSlot={
                sortable && (
                  <EntityLinkReorderHandle
                    onPointerDown={(e) => controls.start(e)}
                    onPointerUp={async () => {
                      await reorderVillains(orderedVillains);
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
