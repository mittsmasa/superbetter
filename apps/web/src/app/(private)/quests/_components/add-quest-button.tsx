'use client';

import { MissionEntities } from '@/app/(private)/_components/mission/entitity';
import { AddBox } from '@/assets/icons';
import { Button } from '@/components/button';
import { Drawer } from '@/components/drawer';
import { IconButtonWithLabel } from '@/components/icon-button/with-label';
import { TextArea } from '@/components/text-area';
import { TextInput } from '@/components/text-input';
import { useDialog } from '@/hooks/dialog';
import { css } from '@/styled-system/css';
import { postQuest } from '../_actions/post-quest';

export const AddQuestButton = () => {
  const dialog = useDialog();
  return (
    <>
      <IconButtonWithLabel onClick={dialog.show} label="ついか" size="md">
        <AddBox />
      </IconButtonWithLabel>
      <Drawer ref={dialog.ref} onClose={dialog.close}>
        <form
          action={async (f) => {
            const name = f.get('item-name') as string | null;
            const description = f.get('item-desc') as string | null;
            const res = await postQuest({ name: name ?? '', description });
            if (res.type === 'ok') {
              dialog.close();
              return;
            }
            alert('エラーがおきました');
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
              <p>5分以内に着手できる小さな目標をつくろう</p>
              <p>日々の小さな行動が、やがて大いなる目標への道となるであろう</p>
            </div>
            <MissionEntities
              items={[
                {
                  itemType: 'quest',
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
              label="クエストめい *"
              placeholder="クエストめい"
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
    </>
  );
};
