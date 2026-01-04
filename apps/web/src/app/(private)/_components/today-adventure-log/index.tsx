import { AdventureLog } from '@/components/adventure-log';
import type { DailyAchievements } from '../../_actions/types/weekly-achievements';

export const TodayAdventureLog = async ({
  achievement,
}: {
  achievement: DailyAchievements;
}) => {
  return (
    <AdventureLog
      heading="本日の冒険ログ"
      logs={[
        ...achievement.adventureLogs.filter((log) => log.type === 'powerup'),
        ...achievement.adventureLogs.filter((log) => log.type === 'quest'),
        ...achievement.adventureLogs.filter((log) => log.type === 'villain'),
        ...achievement.adventureLogs.filter((log) => log.type === 'epicwin'),
      ]}
    />
  );
};
