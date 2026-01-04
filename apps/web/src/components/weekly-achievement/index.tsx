import { DailyAchievementCard } from '@/components/daily-achievement';
import { css } from '@/styled-system/css';
import type { WeeklyAchievements } from '@/types/superbetter';

export const WeeklyAchievement = async ({
  weeklyAchievement,
}: {
  weeklyAchievement: WeeklyAchievements;
}) => {
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px',
      })}
    >
      {weeklyAchievement.map((a) => (
        <DailyAchievementCard key={a.dateString.toString()} {...a} />
      ))}
    </div>
  );
};
