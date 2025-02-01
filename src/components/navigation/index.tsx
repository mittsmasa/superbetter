'use client';

import { Android, Calendar, Human, ScriptText, Zap } from '@/assets/icons';
import { css } from '@/styled-system/css';
import { usePathname, useRouter } from 'next/navigation';
import { IconButton } from '../icon-button';

export const FooterNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div
      className={css({
        alignItems: 'center',
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '4px 12px',
      })}
    >
      <IconButton
        type="button"
        size="lg"
        active={pathname === '/' || pathname.startsWith('/missions')}
        onClick={() => router.push('/')}
      >
        <Calendar />
      </IconButton>
      <IconButton
        type="button"
        size="lg"
        active={pathname.startsWith('/powerups')}
        onClick={() => router.push('/powerups')}
      >
        <Zap />
      </IconButton>
      <IconButton
        type="button"
        size="lg"
        active={pathname.startsWith('/quests')}
        onClick={() => router.push('/quests')}
      >
        <ScriptText />
      </IconButton>
      <IconButton
        type="button"
        size="lg"
        active={pathname.startsWith('/villains')}
        onClick={() => router.push('/villains')}
      >
        <Android />
      </IconButton>
      <IconButton
        type="button"
        size="lg"
        active={pathname.startsWith('/me')}
        onClick={() => router.push('/me')}
      >
        <Human />
      </IconButton>
    </div>
  );
};
