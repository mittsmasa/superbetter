'use client';

import { AddBox } from '@/assets/icons';
import { Button } from '@/components/button';
import { Drawer } from '@/components/drawer';
import { IconButton } from '@/components/icon-button';
import { MotionLink } from '@/components/motion-link';
import { FooterNavigation } from '@/components/navigation';
import { TextArea } from '@/components/text-area';
import { TextInput } from '@/components/text-input';
import { useDialog } from '@/hooks/dialog';
import { css, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';
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
          gap: '8px',
          padding: '8px',
          textStyle: 'Body.secondary',
        })}
      >
        <Quest />
        <Quest />
        <Quest />
        <Quest />
        <Quest />
        <Quest />
        <Quest />
        <Quest />
        <Quest />
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
      <Drawer
        ref={addDialog.ref}
        onClose={addDialog.close}
        bodySlot={
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
                <div className={css({ width: '[230px]' })}>かくてい</div>
              </Button>
            </div>
          </form>
        }
      />
    </main>
  );
};

const Quest = () => (
  <MotionLink
    href="/powerups/1"
    className={cx(
      pixelBorder({ borderWidth: 1 }),
      css({
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '4px',
      }),
    )}
  >
    <p>パワーブレスする</p>
    <p
      className={css({
        color: 'gray.200',
        textStyle: 'Body.tertiary',
        lineClamp: 3,
      })}
    >
      パワーブレスというのは8カウントで吸って4カウントで吐くやつのことです。すごく長い文章をいれても途中で
      Truncate
      されることを想定しています。まぁこれだけかければあまり省略されることはないとおもうけど
    </p>
  </MotionLink>
);

export default Page;
