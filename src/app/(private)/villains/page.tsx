import { css } from '@/styled-system/css';
import { getVillains } from '../_actions/get-villain';
import { EntityLink } from '../_components/entity-link';
import { AddVillainButton } from './_components/add-villain-button';

const Page = async () => {
  const villains = await getVillains();
  if (villains.type === 'error') {
    throw new Error(villains.error.message);
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
          <h1 className={css({ textStyle: 'Heading.primary' })}>ヴィラン</h1>
          <AddVillainButton />
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
          {villains.data.records.map((v) => (
            <EntityLink
              key={v.id}
              href={`/villains/${v.id}`}
              title={v.title}
              description={v.description}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
