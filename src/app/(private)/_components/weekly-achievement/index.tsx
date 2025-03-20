import { css } from '@/styled-system/css';
import type { WeekelyAchievements } from '../../_actions/types/weekly-achievements';
import { DailyAchievement } from '../daily-achievement';

export const WeeklyAchievement = async ({
  weeklyAchievement,
}: {
  weeklyAchievement: WeekelyAchievements;
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
        <DailyAchievement key={a.datetime.toString()} {...a} />
      ))}
    </div>
  );
};
