import { SortableButton } from '@/app/_components/sortable/button';
import { css } from '@/styled-system/css';
import { getPowerups } from '../_actions/get-powerup';
import { AddPowerupButton } from './_components/add-powerup-button';
import { PowerupList } from './_components/powerup-list';

const Page = async () => {
  const powerups = await getPowerups();
  if (powerups.type === 'error') {
    throw new Error(powerups.error.message);
  }
  return (
    <main
      className={css({
        display: 'flex',
        flexDirection: 'column',
        height: '[100%]',
        overflow: 'auto',
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
        <h1 className={css({ textStyle: 'Heading.primary' })}>
          パワーアップアイテム
        </h1>
        <div className={css({ display: 'flex', gap: '8px' })}>
          <SortableButton />
          <AddPowerupButton />
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
        <PowerupList powerups={powerups.data.records} />
      </div>
    </main>
  );
};

export default Page;
