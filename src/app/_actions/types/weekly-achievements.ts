export type DailyAchievements = {
  datetime: Date;
  status: 'upcoming' | 'achieved' | 'not-achieved';
  isToday?: boolean;
};

export type WeekelyAchievements = DailyAchievements[];
