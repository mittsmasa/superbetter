import type { EntityType } from '@/db/types/mission';

export type AdventureLog = {
  id: string;
  type: EntityType;
  title: string;
};
