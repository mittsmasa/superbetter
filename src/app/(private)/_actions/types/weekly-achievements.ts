import type { AdventureLog } from './adventure-log';

export type DailyAchievements = {
  datetime: Date;
  adventureLogs: AdventureLog[];
  status: 'no-data' | 'achieved' | 'not-achieved';
  isToday?: boolean;
};

export type WeekelyAchievements = DailyAchievements[];
