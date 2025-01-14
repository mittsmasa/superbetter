'use client';

import { Header } from '@/app/_components/header';
import { Edit, Trash } from '@/assets/icons';
import { Button } from '@/components/button';
import { Drawer } from '@/components/drawer';
import { IconButton } from '@/components/icon-button';
import { FooterNavigation } from '@/components/navigation';
import { useDialog } from '@/hooks/dialog';
import { css, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';
import { type ComponentProps, use, useId } from 'react';

const Page = (props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id: powerupId } = use(props.params);
  const { ref, show, close } = useDialog();
  return (
    <main
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '16px',
        height: '[100%]',
        padding: '8px',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        })}
      >
        <Header
          rightSlot={
            <div className={css({ display: 'flex', gap: '8px' })}>
              <IconButton onClick={show}>
                <Edit className={css({ width: '[24px]', height: '[24px]' })} />
              </IconButton>
              <IconButton>
                <Trash className={css({ width: '[24px]', height: '[24px]' })} />
              </IconButton>
            </div>
          }
        />
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            px: '12px',
          })}
        >
          <h1 className={css({ textStyle: 'Body.primary' })}>
            パワーブレスする
          </h1>
          <p className={css({ textStyle: 'Body.tertiary', color: 'gray.50' })}>
            パワーアップアイテムを使って、パワーブレスをする
          </p>
        </div>
      </div>
      <div className={css({ position: 'sticky', bottom: 0 })}>
        <div
          className={css({
            width: '[100%]',
            display: 'flex',
            justifyContent: 'center',
            py: '8px',
          })}
        >
          <Button>
            <div className={css({ width: '[230px]' })}>つかった！</div>
          </Button>
        </div>
        <FooterNavigation />
      </div>
      <Drawer
        ref={ref}
        onClose={close}
        bodySlot={
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              height: '[100%]',
              padding: '12px 8px',
            })}
          >
            <form
              action={async (f) => {
                console.log(f.get('item-name'));
                console.log(f.get('item-desc'));
                close();
              }}
              className={css({
                display: 'flex',
                flexDirection: 'column',
                height: '[100%]',
                justifyContent: 'space-between',
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
                <TextInput
                  required
                  label="アイテムめい *"
                  defaultValue="hoge"
                  name="item-name"
                />
                <TextArea
                  label="せつめい"
                  defaultValue="fuga"
                  name="item-desc"
                />
              </div>
              <div
                className={css({ display: 'flex', justifyContent: 'center' })}
              >
                <Button type="submit">
                  <div className={css({ width: '[230px]' })}>かくてい</div>
                </Button>
              </div>
            </form>
          </div>
        }
      />
    </main>
  );
};

export default Page;

const TextInput = ({
  label,
  ...props
}: { label?: string } & Omit<
  ComponentProps<'input'>,
  'type' | 'className'
>) => {
  const id = useId();
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      })}
    >
      <label htmlFor={id} className={css({ textStyle: 'Body.tertiary' })}>
        {label}
      </label>
      <input
        {...props}
        type="text"
        id={id}
        className={cx(
          pixelBorder({}),
          css({ padding: '4px', textStyle: 'Body.primary' }),
        )}
      />
    </div>
  );
};

const TextArea = ({
  label,
  ...props
}: { label?: string } & Omit<
  ComponentProps<'textarea'>,
  'type' | 'className'
>) => {
  const id = useId();
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      })}
    >
      <label htmlFor={id} className={css({ textStyle: 'Body.tertiary' })}>
        {label}
      </label>
      <textarea
        {...props}
        id={id}
        className={cx(
          pixelBorder({}),
          css({ padding: '4px', textStyle: 'Body.primary' }),
        )}
      />
    </div>
  );
};
