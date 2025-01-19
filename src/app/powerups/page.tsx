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
import { postPowerup } from './_actions/post-powerup';

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
          <h1 className={css({ textStyle: 'Heading.primary' })}>
            パワーアップアイテム
          </h1>
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
          <PowerupLink />
          <PowerupLink />
          <PowerupLink />
          <PowerupLink />
          <PowerupLink />
          <PowerupLink />
          <PowerupLink />
          <PowerupLink />
          <PowerupLink />
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
            // TODO: zod でバリデーション
            // TODO: snackbar or toast でエラー通知
            const name = f.get('item-name') as string | null;
            const description = f.get('item-desc') as string | null;
            const res = await postPowerup({ name: name ?? '', description });
            if (res.type === 'ok') {
              addDialog.close();
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
                  id: 'powerup',
                  missionItemType: 'powerup',
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

const PowerupLink = () => (
  <EntityLink
    href="/powerups/1"
    title="パワーブレスする"
    description="パワーブレスというのは8カウントで吸って4カウントで吐くやつのことです。すごく長い文章をいれても途中で Truncate されることを想定しています。まぁこれだけかければあまり省略されることはないとおもうけど"
  />
);

export default Page;
