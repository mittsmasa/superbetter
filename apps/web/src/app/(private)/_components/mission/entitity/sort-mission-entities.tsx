import { ENTITY_ORDER } from '@/app/_utils/constants';
import type { MissionEntity } from '../../entity-icon';

export const sortMissionEntities: (
  a: MissionEntity,
  b: MissionEntity,
) => number = (a, b) => {
  const typeA = ENTITY_ORDER.indexOf(a.itemType);
  const typeB = ENTITY_ORDER.indexOf(b.itemType);
  return typeA - typeB;
};
