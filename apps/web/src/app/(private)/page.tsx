import { Mission } from '@/components/mission';
import { WeeklyAchievement } from '@/components/weekly-achievement';
import { css } from '@/styled-system/css';
import { getMissions } from './_actions/get-mission';
import { getWeeklyAchievements } from './_actions/get-weekly-achievements';
import { EpicWinSection } from './_components/epicwin-section';
import { TodayAdventureLog } from './_components/today-adventure-log';

export default async function Home() {
  const missions = await getMissions();
  if (missions.type === 'error') {
    throw new Error(missions.error.message);
  }
  const weeklyAchievement = await getWeeklyAchievements();
  if (weeklyAchievement.type === 'error') {
    throw new Error(weeklyAchievement.error.message);
  }
  const todayAchievement = weeklyAchievement.data.find((d) => d.isToday);
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
        <WeeklyAchievement weeklyAchievement={weeklyAchievement.data} />
        {todayAchievement && (
          <TodayAdventureLog achievement={todayAchievement} />
        )}
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
        <EpicWinSection />
      </div>
    </main>
  );
}
