import { css } from '@/styled-system/css';
import { getMissions } from './_actions/get-mission';
import { Mission } from './_components/mission';
import { TodayAdventureLog } from './_components/today-adventure-log';
import { WeeklyAchievement } from './_components/weekly-achievement';

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
