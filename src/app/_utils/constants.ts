import type { EntityType } from '@/db/types/mission';

export const ENTITY_ORDER = [
  'powerup',
  'quest',
  'villain',
  'epicwin',
] as const satisfies EntityType[];
