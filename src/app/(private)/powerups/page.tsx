import { css } from '@/styled-system/css';
import { getPowerups } from '../_actions/get-powerup';
import { EntityLink } from '../_components/entity-link';
import { AddPowerupButton } from './_components/add-powerup-button';

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
        <h1 className={css({ textStyle: 'Heading.primary' })}>
          パワーアップアイテム
        </h1>
        <AddPowerupButton />
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
        {powerups.data.records.map((p) => (
          <EntityLink
            key={p.id}
            href={`/powerups/${p.id}`}
            title={p.title}
            description={p.description}
          />
        ))}
      </div>
    </main>
  );
};

export default Page;
