import type { MissionItem } from '../../../../../types/mission';

export const getEntity = (value: string) => {
  const [itemType, id] = value.split('.');
  // TODO: validate type
  const type = itemType as MissionItem;
  return { type, id };
};

export const getEntityValue = (entity: {
  type: MissionItem;
  id: string;
}) => {
  return `${entity.type}.${entity.id}`;
};
