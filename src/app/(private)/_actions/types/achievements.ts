export type AchievedEpicWin = {
  id: string;
  title: string;
  description: string | null;
  achievedAt: Date;
};

export type DailyMissionStreakData = {
  streak: number;
};

export type AchievementError =
  | { type: 'database'; message: string; cause?: string }
  | { type: 'user_not_found'; message: string }
  | { type: 'unknown'; message: string };
