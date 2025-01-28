import { FooterNavigation } from '@/components/navigation';
import { css } from '@/styled-system/css';
import { getQuests } from '../_actions/get-quest';
import { EntityLink } from '../_components/entity-link';
import { AddQuestButton } from './_components/add-quest-button';

const Page = async () => {
  const quests = await getQuests();
  if (quests.type === 'error') {
    throw new Error(quests.error.message);
  }
  return (
    <main
      className={css({
        height: '[100%]',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      })}
    >
      <div>
        <div
          className={css({
            backgroundColor: 'black',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px',
            position: 'sticky',
            top: 0,
          })}
        >
          <h1 className={css({ textStyle: 'Heading.primary' })}>クエスト</h1>
          <AddQuestButton />
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '8px',
            textStyle: 'Body.secondary',
          })}
        >
          {quests.data.records.map((q) => (
            <EntityLink
              key={q.id}
              href={`/quests/${q.id}`}
              title={q.title}
              description={q.description}
            />
          ))}
        </div>
      </div>
      <div
        className={css({
          backgroundColor: 'black',
          position: 'sticky',
          bottom: 0,
          padding: '8px',
        })}
      >
        <FooterNavigation />
      </div>
    </main>
  );
};

const QuestLink = () => <EntityLink href="/quests/1" title="朝さんぽする" />;

export default Page;
