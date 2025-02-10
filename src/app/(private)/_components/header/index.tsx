'use client';

import { ChevlonLeft } from '@/assets/icons';
import { IconButton } from '@/components/icon-button';
import { css } from '@/styled-system/css';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

export const Header = ({ rightSlot }: { rightSlot?: ReactNode }) => {
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
      <IconButton onClick={() => router.back()}>
        <ChevlonLeft className={css({ width: '[24px]', height: '[24px]' })} />
      </IconButton>
      <div>{rightSlot}</div>
    </div>
  );
};
