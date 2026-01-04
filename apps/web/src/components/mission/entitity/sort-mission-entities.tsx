import { ENTITY_ORDER } from '@/utils/constants';
import type { EntityIconProps } from '../../entity-icon';

export const sortMissionEntities: (
  a: EntityIconProps,
  b: EntityIconProps,
) => number = (a, b) => {
  const typeA = ENTITY_ORDER.indexOf(a.itemType);
  const typeB = ENTITY_ORDER.indexOf(b.itemType);
  return typeA - typeB;
};
