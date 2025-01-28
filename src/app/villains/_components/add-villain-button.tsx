'use client';

import { MissionEntities } from '@/app/_components/mission/entitity';
import { AddBox } from '@/assets/icons';
import { Button } from '@/components/button';
import { Drawer } from '@/components/drawer';
import { IconButton } from '@/components/icon-button';
import { TextArea } from '@/components/text-area';
import { TextInput } from '@/components/text-input';
import { useDialog } from '@/hooks/dialog';
import { css } from '@/styled-system/css';
import { postVillain } from '../_actions/post-villain';

export const AddVillainButton = () => {
  const dialog = useDialog();
  return (
    <>
      <IconButton onClick={dialog.show}>
        <AddBox className={css({ width: '[24px]', height: '[24px]' })} />
      </IconButton>
      <Drawer ref={dialog.ref} onClose={dialog.close}>
        <form
          action={async (f) => {
            // TODO: zod でバリデーション
            // TODO: snackbar or toast でエラー通知
            const name = f.get('item-name') as string | null;
            const description = f.get('item-desc') as string | null;
            const res = await postVillain({ name: name ?? '', description });
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
            <h1>ヴィランをみつけよ</h1>
            <div
              className={css({
                textStyle: 'Body.tertiary',
                textAlign: 'center',
              })}
            >
              <p>あれこれのさまたげとなるヴィランを見つけよ</p>
              <p>すこしずつヴィランを知り己を知れば、百戦危うからず</p>
            </div>
            <MissionEntities
              items={[
                {
                  id: 'villain',
                  missionItemType: 'villain',
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
              label="ヴィランのなまえ *"
              placeholder="ヴィランのなまえ"
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
