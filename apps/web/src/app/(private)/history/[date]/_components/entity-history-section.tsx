import type { EntityType } from '@/db/types/mission';
import { getPowerups } from '../../../_actions/get-powerup';
import { getQuests } from '../../../_actions/get-quest';
import { getVillains } from '../../../_actions/get-villain';
import { EntityHistorySectionContent } from './entity-history-section-content';

export type EntityHistoryLog = {
  id: string;
  type: EntityType;
  title: string;
  createdAt: Date;
};

type EntityHistorySectionProps = {
  title: string;
  entityType: EntityType;
  histories: EntityHistoryLog[];
  isEditable: boolean;
  targetDate: Date;
};

export const EntityHistorySection = async ({
  title,
  entityType,
  histories,
  isEditable,
  targetDate,
}: EntityHistorySectionProps) => {
  // 編集可能な場合のみ、追加可能なエンティティ一覧を取得
  let availableEntities: { id: string; title: string }[] = [];
  if (isEditable) {
    let result:
      | Awaited<ReturnType<typeof getQuests>>
      | Awaited<ReturnType<typeof getPowerups>>
      | Awaited<ReturnType<typeof getVillains>>
      | undefined;
    if (entityType === 'quest') {
      result = await getQuests();
    } else if (entityType === 'powerup') {
      result = await getPowerups();
    } else if (entityType === 'villain') {
      result = await getVillains();
    }

    if (result?.type === 'ok') {
      availableEntities = result.data.records;
    }
  }

  return (
    <EntityHistorySectionContent
      title={title}
      entityType={entityType}
      histories={histories}
      isEditable={isEditable}
      availableEntities={availableEntities}
      targetDate={targetDate}
    />
  );
};
