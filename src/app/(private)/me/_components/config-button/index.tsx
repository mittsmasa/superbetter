'use client';

import { signOut } from '@/app/(private)/_actions/signout';
import { Logout, MoreVertical } from '@/assets/icons';
import { IconButton } from '@/components/icon-button';
import { Popover } from '@/components/popover';
import { css } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';

export const ConfigButton = () => {
  return (
    <Popover.Root>
      <Popover.Trigger
        renderItem={({ setOpen, getReferenceProps, refs }) => (
          <div ref={refs.setReference} {...getReferenceProps()}>
            <IconButton onClick={() => setOpen((prev) => !prev)}>
              <MoreVertical
                className={css({ height: '[24px]', width: '[24px]' })}
              />
            </IconButton>
          </div>
        )}
      />
      <Popover.Content
        renderItem={({ getFloatingProps, floatingStyles, refs }) => (
          <div
            {...getFloatingProps()}
            style={floatingStyles}
            ref={refs.setFloating}
            className={pixelBorder({})}
          >
            <button
              type="button"
              onClick={async () => {
                await signOut();
              }}
              className={css({
                alignItems: 'center',
                display: 'flex',
                gap: '4px',
                padding: '12px',
                textStyle: 'Body.secondary',
              })}
            >
              <Logout className={css({ height: '[18px]', width: '[18px]' })} />
              ログアウト
            </button>
          </div>
        )}
      />
    </Popover.Root>
  );
};
