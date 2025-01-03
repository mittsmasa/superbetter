import { FooterNavigation } from '@/components/navigation';
import { css } from '@/styled-system/css';
import { DailyAchievement } from './_components/daily-achievement';
import { Mission } from './_components/mission';

export default function Home() {
  return (
    <main
      className={css({
        display: 'flex',
        flexDirection: 'column',
        padding: '8px 12px',
        justifyContent: 'space-between',
        height: '[100%]',
      })}
    >
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
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
      <Mission
        id="3"
        title="デイリーミッション"
        items={[
          {
            id: '1',
            missionItemType: 'powerup',
            completed: true,
          },
          {
            id: '2',
            missionItemType: 'powerup',
            completed: false,
          },
          {
            id: '3',
            missionItemType: 'powerup',
            completed: false,
          },
          {
            id: '4',
            missionItemType: 'quest',
            completed: true,
          },
          {
            id: '5',
            missionItemType: 'villain',
            completed: true,
          },
        ]}
      />
      <FooterNavigation />
    </main>
  );
}
