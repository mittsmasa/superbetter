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
        display: 'flex',
        flexDirection: 'column',
      })}
    >
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
          flex: '1',
          minHeight: '[0px]',
          flexDirection: 'column',
          gap: '12px',
          overflowY: 'auto',
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
    </main>
  );
};

export default Page;
