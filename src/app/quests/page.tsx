'use client';

import { AddBox } from '@/assets/icons';
import { Button } from '@/components/button';
import { Drawer } from '@/components/drawer';
import { IconButton } from '@/components/icon-button';
import { FooterNavigation } from '@/components/navigation';
import { TextArea } from '@/components/text-area';
import { TextInput } from '@/components/text-input';
import { useDialog } from '@/hooks/dialog';
import { css } from '@/styled-system/css';
import { EntityLink } from '../_components/entity-link';
import { MissionEntities } from '../_components/mission/entitity';

const Page = () => {
  const addDialog = useDialog();
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
          <IconButton onClick={addDialog.show}>
            <AddBox className={css({ width: '[24px]', height: '[24px]' })} />
          </IconButton>
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
          <QuestLink />
          <QuestLink />
          <QuestLink />
          <QuestLink />
          <QuestLink />
          <QuestLink />
          <QuestLink />
          <QuestLink />
          <QuestLink />
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
      <Drawer ref={addDialog.ref} onClose={addDialog.close}>
        <form
          action={async (f) => {
            console.log(f.get('item-name'));
            console.log(f.get('item-desc'));
            addDialog.close();
          }}
          className={css({
            display: 'flex',
            flexDirection: 'column',
            height: '[100%]',
            gap: '16px',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            })}
          >
            <h1>クエストをみつけよ</h1>
            <div
              className={css({
                textStyle: 'Body.tertiary',
                textAlign: 'center',
              })}
            >
              <p>勇者よ、クエストを見つけ出し、成し遂げよ</p>
              <p>日々の小さな行動が、やがて大いなる目標への道となるであろう</p>
            </div>
            <MissionEntities
              items={[
                {
                  id: 'quest',
                  missionItemType: 'quest',
                  completed: true,
                },
              ]}
            />
          </div>
          <div
            className={css({
              display: 'flex',
              flex: '1',
              flexDirection: 'column',
              gap: '12px',
              minHeight: '[0px]',
              overflow: 'auto',
              padding: '12px 8px',
            })}
          >
            <TextInput
              required
              label="アイテムめい *"
              placeholder="アイテムめい"
              name="item-name"
            />
            <TextArea
              label="せつめい"
              placeholder="せつめい"
              name="item-desc"
            />
          </div>
          <div
            className={css({
              display: 'flex',
              justifyContent: 'center',
              padding: '24px',
            })}
          >
            <Button type="submit">
              <div className={css({ width: '[230px]' })}>ついか！</div>
            </Button>
          </div>
        </form>
      </Drawer>
    </main>
  );
};

const QuestLink = () => <EntityLink href="/quests/1" title="朝さんぽする" />;

export default Page;
