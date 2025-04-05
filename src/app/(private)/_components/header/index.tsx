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
        justifyContent: 'space-between',
        gap: '8px',
        padding: '8px',
      })}
    >
      <div>
        {withBackButton && (
          <IconButton onClick={() => router.back()}>
            <ChevlonLeft
              className={css({ width: '[24px]', height: '[24px]' })}
            />
          </IconButton>
        )}
      </div>
      <div>{rightSlot}</div>
    </div>
  );
};
