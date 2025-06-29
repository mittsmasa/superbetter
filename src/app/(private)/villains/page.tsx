import { SortableButton } from '@/app/_components/sortable/button';
import { css } from '@/styled-system/css';
import { getVillains } from '../_actions/get-villain';
import { AddVillainButton } from './_components/add-villain-button';
import { VillainList } from './_components/villain-list';

const Page = async () => {
  const villains = await getVillains();
  if (villains.type === 'error') {
    throw new Error(villains.error.message);
  }
  return (
    <main
      className={css({
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
      })}
    >
      <div
        className={css({
          backgroundColor: 'background',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px',
          position: 'sticky',
          top: 0,
        })}
      >
        <h1 className={css({ textStyle: 'Heading.primary' })}>ヴィラン</h1>
        <div className={css({ display: 'flex', gap: '8px' })}>
          <SortableButton />
          <AddVillainButton />
        </div>
      </div>
      <div
        className={css({
          display: 'flex',
          flex: '1',
          flexDirection: 'column',
          gap: '12px',
          minHeight: '[0px]',
          overflowY: 'auto',
          padding: '8px',
          textStyle: 'Body.secondary',
        })}
      >
        <VillainList villains={villains.data.records} />
      </div>
    </main>
  );
};

export default Page;
