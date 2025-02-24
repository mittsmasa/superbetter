import { SortableButton } from '@/app/_components/sortable/button';
import { css } from '@/styled-system/css';
import { getQuests } from '../_actions/get-quest';
import { AddQuestButton } from './_components/add-quest-button';
import { QuestList } from './_components/quest-list';

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
        flex: '1',
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
        <div className={css({ display: 'flex', gap: '8px' })}>
          <SortableButton />
          <AddQuestButton />
        </div>
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
        <QuestList quests={quests.data.records} />
      </div>
    </main>
  );
};

export default Page;
