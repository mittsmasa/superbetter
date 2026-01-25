import type { EntityType } from '@/types/superbetter';

export const ENTITY_ORDER = [
  'powerup',
  'quest',
  'villain',
  'epicwin',
] as const satisfies EntityType[];
