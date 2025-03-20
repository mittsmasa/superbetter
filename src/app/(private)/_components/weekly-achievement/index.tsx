import { css } from '@/styled-system/css';
import { getWeeklyAchievements } from '../../_actions/get-weeklly-achievements';
import { DailyAchievement } from '../daily-achievement';

export const WeeklyAchievement = async () => {
  const achievements = await getWeeklyAchievements();
  if (achievements.type === 'error') {
    throw new Error(achievements.error.message);
  }
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px',
      })}
    >
      {achievements.data.map((a) => (
        <DailyAchievement key={a.datetime.toString()} {...a} />
      ))}
    </div>
  );
};
