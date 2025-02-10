import type { AdventureItem } from '@/db/types/mission';

export const getEntity = (value: string) => {
  const [itemType, id] = value.split('.');
  // TODO: validate type
  const type = itemType as AdventureItem;
  return { type, id };
};

export const getEntityValue = (entity: {
  type: AdventureItem;
  id: string;
}) => {
  return `${entity.type}.${entity.id}`;
};
