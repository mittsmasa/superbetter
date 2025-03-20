import { css } from '@/styled-system/css';
import { getMissions } from './_actions/get-mission';
import { getTodayLogs } from './_actions/get-today-logs';
import type { AdventureLog as AdventureLogType } from './_actions/types/adventure-log';
import { AdventureLog } from './_components/adventure-log';
import { Mission } from './_components/mission';
import { WeeklyAchievement } from './_components/weekly-achievement';

const TodayAdventureLog = async () => {
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

export default async function Home() {
  const missions = await getMissions();
  if (missions.type === 'error') {
    throw new Error(missions.error.message);
  }
  return (
    <main
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '[100%]',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        })}
      >
        <WeeklyAchievement />
        <TodayAdventureLog />
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '8px',
          })}
        >
          {missions.data.map((m) => (
            <Mission
              key={m.id}
              id={m.id}
              title={m.title}
              items={m.missionConditions.map((mc) => ({
                id: mc.id,
                itemType: mc.itemType,
                completed: mc.completed,
              }))}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
