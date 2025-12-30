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
import { postPowerup } from '../_actions/post-powerup';

export const AddPowerupButton = () => {
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
            const res = await postPowerup({ name: name ?? '', description });
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
            <h1>パワーアップアイテムをみつけよ</h1>
            <div
              className={css({
                textStyle: 'Body.tertiary',
                textAlign: 'center',
              })}
            >
              <p>すぐにちょっときぶんがよくなる秘宝をみつけよ</p>
              <p>これが英雄のつかれた心をいやすであろう</p>
            </div>
            <MissionEntities
              items={[
                {
                  itemType: 'powerup',
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
    </>
  );
};
