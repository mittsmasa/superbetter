import type { AdventureLog } from './adventure-log';

export type DailyAchievements = {
  /** @example "2024-01-01"  */
  dateString: string;
  date: Date;
  adventureLogs: AdventureLog[];
  status: 'no-data' | 'achieved' | 'not-achieved';
  isToday?: boolean;
};

export type WeekelyAchievements = DailyAchievements[];
