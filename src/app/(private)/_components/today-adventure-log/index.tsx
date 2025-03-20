import { getTodayLogs } from '../../_actions/get-today-logs';
import type { AdventureLog as AdventureLogType } from '../../_actions/types/adventure-log';
import { AdventureLog } from '../adventure-log';

export const TodayAdventureLog = async () => {
  const logs = await getTodayLogs();
  if (logs.type === 'error') {
    throw new Error(logs.error.message);
  }
  const { powerups, quests, villains } = logs.data;
  return (
    <AdventureLog
      heading="本日の冒険ログ"
      logs={[
        ...powerups.map(
          (p) =>
            ({
              id: p.id,
              type: 'powerup',
              title: p.title,
            }) satisfies AdventureLogType,
        ),
        ...quests.map(
          (q) =>
            ({
              id: q.id,
              type: 'quest',
              title: q.title,
            }) satisfies AdventureLogType,
        ),
        ...villains.map(
          (v) =>
            ({
              id: v.id,
              type: 'villain',
              title: v.title,
            }) satisfies AdventureLogType,
        ),
      ]}
    />
  );
};
