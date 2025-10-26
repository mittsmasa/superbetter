import { getMission } from '@/app/(private)/_actions/get-mission';
import { MissionEntities } from '@/app/(private)/_components/mission/entitity';
import { css } from '@/styled-system/css';
import { Header } from '../../_components/header';
import { getAllEntities } from './_actions/get-all-entities';
import { MissionForm } from './_components/mission-form';

const Page = async (props: PageProps<'/missions/[missionId]'>) => {
  const { missionId } = await props.params;
  const mission = await getMission(missionId);
  if (mission.type === 'error') {
    throw new Error(mission.error.message);
  }
  const entities = await getAllEntities();
  return (
    <main
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '16px',
        height: '[100%]',
        overflow: 'auto',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        })}
      >
        <Header />
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '8px',
          })}
        >
          <h1 className={css({ textStyle: 'Heading.primary' })}>
            {mission.data.title}
          </h1>
          <div>
            {mission.data.description?.split('\n').map((line, i) => (
              <p
                key={i}
                className={css({
                  textAlign: 'center',
                  textStyle: 'Body.secondary',
                })}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
        <div
          className={css({
            backgroundColor: 'background',
            position: 'sticky',
            top: 0,
            padding: '8px',
          })}
        >
          <MissionEntities
            items={mission.data.missionConditions.map((mc) => ({
              id: mc.id,
              itemType: mc.itemType,
              completed: mc.completed,
            }))}
          />
        </div>
        <div
          className={css({
            flex: '1',
            minHeight: '[0]',
          })}
        >
          <MissionForm entities={entities} />
        </div>
      </div>
    </main>
  );
};

export default Page;
