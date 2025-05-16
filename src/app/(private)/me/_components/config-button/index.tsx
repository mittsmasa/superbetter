'use client';

import { signOut } from 'next-auth/react';
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
                className={css({ width: '[24px]', height: '[24px]' })}
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
              onClick={() => signOut({ callbackUrl: '/login' })}
              className={css({
                alignItems: 'center',
                display: 'flex',
                padding: '12px',
                gap: '4px',
                textStyle: 'Body.secondary',
              })}
            >
              <Logout className={css({ width: '[18px]', height: '[18px]' })} />
              ログアウト
            </button>
          </div>
        )}
      />
    </Popover.Root>
  );
};
