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
          <div
            ref={refs.setReference}
            {...getReferenceProps()}
            className={css({ color: 'white' })}
          >
            <IconButton onClick={() => setOpen((prev) => !prev)}>
              <MoreVertical />
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
