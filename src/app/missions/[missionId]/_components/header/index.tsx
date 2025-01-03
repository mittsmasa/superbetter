'use client';

import { ChevlonLeft } from '@/assets/icons';
import { IconButton } from '@/components/icon-button';
import { css } from '@/styled-system/css';
import { useRouter } from 'next/navigation';

export const Header = () => {
  const router = useRouter();
  return (
    <div
      className={css({
        alignItems: 'center',
        display: 'flex',
        gap: '8px',
        py: '8px',
      })}
    >
      <IconButton onClick={() => router.back()}>
        <ChevlonLeft className={css({ width: '[24px]', height: '[24px]' })} />
      </IconButton>
    </div>
  );
};
