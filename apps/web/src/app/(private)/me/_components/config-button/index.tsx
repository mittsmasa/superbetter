'use client';

import { IconButton, Popover } from '@superbetter/ui';
import { useRouter } from 'next/navigation';
import { Logout, MoreVertical } from '@/assets/icons';
import { authClient } from '@/lib/auth-client';
import { css, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';

export const ConfigButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <Popover.Root>
      <Popover.Trigger
        renderItem={({ setOpen, getReferenceProps, refs }) => (
          <div ref={refs.setReference} {...getReferenceProps()}>
            <IconButton onClick={() => setOpen((prev) => !prev)}>
              <MoreVertical size={24} />
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
            className={cx(
              pixelBorder({}),
              css({ backgroundColor: 'background' }),
            )}
          >
            <button
              type="button"
              onClick={handleSignOut}
              className={css({
                alignItems: 'center',
                display: 'flex',
                padding: '12px',
                gap: '4px',
                textStyle: 'Body.secondary',
              })}
            >
              <Logout size={18} />
              ログアウト
            </button>
          </div>
        )}
      />
    </Popover.Root>
  );
};
