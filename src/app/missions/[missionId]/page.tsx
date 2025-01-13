import { MissionEntities } from '@/app/_components/mission/entitity';
import { Default } from '@/app/_components/mission/index.stories';
import { AddBox, Zap } from '@/assets/icons';
import { Button } from '@/components/button';
import { IconButton } from '@/components/icon-button';
import { FooterNavigation } from '@/components/navigation';
import { Radio } from '@/components/radio';
import { css } from '@/styled-system/css';
import { use } from 'react';
import { Header } from '../../_components/header';

const Page = (props: {
  params: Promise<{ missionId: string }>;
}) => {
  const params = use(props.params);
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
      <div>
        <div
          className={css({
            backgroundColor: 'black',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'sticky',
            top: 0,
          })}
        >
          <Header />
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              px: '8px',
            })}
          >
            <h1 className={css({ textStyle: 'Heading.primary' })}>
              デイリーミッション
            </h1>
            <p
              className={css({
                textAlign: 'center',
                textStyle: 'Body.secondary',
              })}
            >
              秘宝を使い、挑戦を受け、悪を討て <br />
              小さな積み重ねが、英雄への道となる
            </p>
            <MissionEntities items={[...Default.args.items]} />
          </div>
        </div>
        <form
          action={async (a) => {
            'use server';
            const val = a.get('powerup');
            console.log(val?.valueOf());
          }}
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            })}
          >
            <EntityList />
            <div
              className={css({
                backgroundColor: 'black',
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                position: 'sticky',
                py: '8px',
              })}
            >
              <Button type="submit">つかう / いどむ / たたかう</Button>
            </div>
          </div>
        </form>
      </div>
      <div className={css({ position: 'sticky', bottom: 0, padding: '8px' })}>
        <FooterNavigation />
      </div>
    </main>
  );
};

export default Page;

const EntityList = () => (
  <div
    className={css({
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      px: '8px',
    })}
  >
    <div
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
      })}
    >
      <div
        className={css({
          alignItems: 'center',
          display: 'flex',
          gap: '8px',
        })}
      >
        <Zap className={css({ width: '[24px]', height: '[24px]' })} />
        <p
          className={css({
            textStyle: 'Body.secondary',
          })}
        >
          パワーアップアイテム
        </p>
      </div>
      <IconButton type="button">
        <AddBox className={css({ width: '[24px]', height: '[24px]' })} />
      </IconButton>
    </div>
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      })}
    >
      <Radio label="アイテム1" name="powerup" value="item1" />
      <Radio label="アイテム2" name="powerup" value="item2" />
      <Radio label="アイテム3" name="powerup" value="item3" />
    </div>
  </div>
);
