'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { ChevlonLeft } from '@/assets/icons';
import { IconButton } from '@/components/icon-button';
import { css } from '@/styled-system/css';

export const Header = ({
  withBackButton = true,
  rightSlot,
}: {
  withBackButton?: boolean;
  rightSlot?: ReactNode;
}) => {
  const router = useRouter();
  return (
    <div
      className={css({
        alignItems: 'center',
        display: 'flex',
        gap: '8px',
        justifyContent: 'space-between',
        padding: '8px',
      })}
    >
      <div>
        {withBackButton && (
          <IconButton onClick={() => router.back()}>
            <ChevlonLeft
              className={css({ height: '[24px]', width: '[24px]' })}
            />
          </IconButton>
        )}
      </div>
      <div>{rightSlot}</div>
    </div>
  );
};
