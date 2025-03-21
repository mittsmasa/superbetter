import type { EntityType } from '@/db/types/mission';

export const getEntity = (value: string) => {
  const [itemType, id] = value.split('.');
  // TODO: validate type
  const type = itemType as EntityType;
  return { type, id };
};

export const getEntityValue = (entity: {
  type: EntityType;
  id: string;
}) => {
  return `${entity.type}.${entity.id}`;
};
