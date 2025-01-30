export type DailyAchievements = {
  datetime: Date;
  status: 'no-data' | 'achieved' | 'not-achieved';
  isToday?: boolean;
};

export type WeekelyAchievements = DailyAchievements[];
