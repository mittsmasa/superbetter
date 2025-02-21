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
        <h1 className={css({ textStyle: 'Heading.primary' })}>ヴィラン</h1>
        <AddVillainButton />
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
        <VillainList villains={villains.data.records} />
      </div>
    </main>
  );
};

export default Page;
