'use client';

import { IconButton } from '@superbetter/ui';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { ChevlonLeft } from '@/assets/icons';
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
            <ChevlonLeft size={24} />
          </IconButton>
        )}
      </div>
      <div>{rightSlot}</div>
    </div>
  );
};
