import { getDailyEntityHistories } from '@/app/(private)/_actions/get-daily-entity-histories';
import { Header } from '@/app/(private)/_components/header';
import { DateNavigation } from './_components/date-navigation';
import { EntityHistorySection } from './_components/entity-history-section';

type PageProps = {
  params: Promise<{ date: string }>;
};

const Page = async (props: PageProps) => {
  const { date: dateParam } = await props.params;
  const date = new Date(dateParam);

  const result = await getDailyEntityHistories(date);
  if (result.type === 'error') {
    throw new Error(result.error.message);
  }

  const { adventureLogs, isEditable } = result.data;

  // entity種別ごとにフィルタリング
  const powerups = adventureLogs.filter((log) => log.type === 'powerup');
  const quests = adventureLogs.filter((log) => log.type === 'quest');
  const villains = adventureLogs.filter((log) => log.type === 'villain');

  return (
    <main>
      <Header />
      <DateNavigation currentDate={date} />
      <div>
        <EntityHistorySection
          title="Powerups"
          entityType="powerup"
          histories={powerups}
          isEditable={isEditable}
        />
        <EntityHistorySection
          title="Quests"
          entityType="quest"
          histories={quests}
          isEditable={isEditable}
        />
        <EntityHistorySection
          title="Villains"
          entityType="villain"
          histories={villains}
          isEditable={isEditable}
        />
      </div>
    </main>
  );
};

export default Page;
