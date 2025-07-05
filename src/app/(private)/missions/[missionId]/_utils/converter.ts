import type { EntityType } from '@/db/types/mission';

export const getEntity = (value: string) => {
  const parts = value.split('.');
  if (parts.length !== 2) {
    throw new Error(`Invalid entity value format: ${value}`);
  }
  const [itemType, id] = parts;
  if (!itemType || !id) {
    throw new Error(`Invalid entity value format: ${value}`);
  }
  // TODO: validate type
  const type = itemType as EntityType;
  return { type, id };
};

export const getEntityValue = (entity: { type: EntityType; id: string }) => {
  return `${entity.type}.${entity.id}`;
};
