'use client';

import { Android, Calendar, Human, ScriptText, Zap } from '@/assets/icons';
import { css } from '@/styled-system/css';
import { usePathname, useRouter } from 'next/navigation';
import { type ComponentProps, type PropsWithChildren, useId } from 'react';
import { IconButton } from '../icon-button';

export const FooterNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div
      className={css({
        alignItems: 'center',
        backgroundColor: 'background',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '4px 8px',
      })}
    >
      <IconButtonWithLabel
        type="button"
        label="ミッション"
        size="xl"
        active={pathname === '/' || pathname.startsWith('/missions')}
        onClick={() => router.push('/')}
      >
        <Calendar className={css({ width: '[24px]' })} />
      </IconButtonWithLabel>
      <IconButtonWithLabel
        type="button"
        label="アイテム"
        size="xl"
        active={pathname.startsWith('/powerups')}
        onClick={() => router.push('/powerups')}
      >
        <Zap className={css({ width: '[24px]' })} />
      </IconButtonWithLabel>
      <IconButtonWithLabel
        type="button"
        label="クエスト"
        size="xl"
        active={pathname.startsWith('/quests')}
        onClick={() => router.push('/quests')}
      >
        <ScriptText className={css({ width: '[24px]' })} />
      </IconButtonWithLabel>
      <IconButtonWithLabel
        type="button"
        label="ヴィラン"
        size="xl"
        active={pathname.startsWith('/villains')}
        onClick={() => router.push('/villains')}
      >
        <Android className={css({ width: '[24px]' })} />
      </IconButtonWithLabel>
      <IconButtonWithLabel
        type="button"
        label="マイページ"
        size="xl"
        active={pathname.startsWith('/me')}
        onClick={() => router.push('/me')}
      >
        <Human className={css({ width: '[24px]' })} />
      </IconButtonWithLabel>
    </div>
  );
};

const IconButtonWithLabel = ({
  children,
  label,
  ...rest
}: PropsWithChildren<ComponentProps<typeof IconButton>> & {
  label: string;
}) => {
  const id = useId();
  return (
    <div
      className={css({
        alignItems: 'center',
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        gap: '8px',
      })}
    >
      <IconButton {...rest} id={id}>
        {children}
      </IconButton>
      <label htmlFor={id} className={css({ textStyle: 'Body.tertiary' })}>
        {label}
      </label>
    </div>
  );
};
