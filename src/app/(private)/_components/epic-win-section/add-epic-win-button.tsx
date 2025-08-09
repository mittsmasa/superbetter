'use client';

import { MissionEntities } from '@/app/(private)/_components/mission/entitity';
import { Button } from '@/components/button';
import { Drawer } from '@/components/drawer';
import { TextArea } from '@/components/text-area';
import { TextInput } from '@/components/text-input';
import { useDialog } from '@/hooks/dialog';
import { css } from '@/styled-system/css';
import { postEpicWin } from '../../_actions/epic-win';

export const AddEpicWinButton = () => {
  const dialog = useDialog();
  return (
    <>
      <Button onClick={dialog.show} variant="secondary">
        エピックウィンをきめる
      </Button>
      <Drawer ref={dialog.ref} onClose={dialog.close}>
        <form
          action={async (f) => {
            const name = f.get('item-name') as string | null;
            const description = f.get('item-desc') as string | null;
            const res = await postEpicWin({ title: name ?? '', description });
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
            <h1>エピックウィンをきめよう</h1>
            <div
              className={css({
                textStyle: 'Body.tertiary',
                textAlign: 'center',
              })}
            >
              <p>勇者よ、エピックウィンを決めよう</p>
              <p>壮大な目標が、やがて君の人生を変えるであろう</p>
            </div>
            <MissionEntities
              items={[
                {
                  itemType: 'epicwin',
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
              label="エピックウィンめい *"
              placeholder="エピックウィンめい"
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
