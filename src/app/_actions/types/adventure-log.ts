import type { AdventureItem } from '@/db/types/mission';

export type AdventureLog = {
  id: string;
  type: AdventureItem;
  title: string;
};
