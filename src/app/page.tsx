import { FooterNavigation } from '@/components/navigation';
import { css } from '@/styled-system/css';
import { getMissions } from './_actions/get-mission';
import { DailyAchievement } from './_components/daily-achievement';
import { Mission } from './_components/mission';

export default async function Home() {
  const now = new Date();
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
          justifyContent: 'space-between',
          padding: '8px',
        })}
      >
        <DailyAchievement datetime={new Date(2024, 1, 1)} status="achieved" />
        <DailyAchievement datetime={new Date(2024, 1, 2)} status="achieved" />
        <DailyAchievement datetime={new Date(2024, 1, 3)} status="achieved" />
        <DailyAchievement
          datetime={new Date(2024, 1, 4)}
          status="not-achieved"
        />
        <DailyAchievement datetime={new Date(2024, 1, 5)} status="achieved" />
        <DailyAchievement datetime={new Date(2024, 1, 6)} status="today" />
        <DailyAchievement datetime={new Date(2024, 1, 7)} status="upcoming" />
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
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
              missionItemType: mc.itemType,
              completed: mc.completed,
            }))}
          />
        ))}
      </div>
      <div className={css({ position: 'sticky', bottom: 0, padding: '8px' })}>
        <FooterNavigation />
      </div>
    </main>
  );
}
