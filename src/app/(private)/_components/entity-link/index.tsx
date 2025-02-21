import { Menu } from '@/assets/icons';
import { MotionLink } from '@/components/motion-link';
import { css } from '@/styled-system/css';
import type { ComponentProps, ReactNode } from 'react';

export const EntityLink = ({
  href,
  title,
  description,
  reorderHandleSlot,
}: {
  href: ComponentProps<typeof MotionLink>['href'];
  title: string;
  description?: string | null;
  reorderHandleSlot?: ReactNode;
}) => {
  return (
    <MotionLink href={href}>
      <div
        className={css({
          backgroundColor: 'black',
          display: 'flex',
          gap: '4px',
          padding: '4px',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flex: '1',
            flexDirection: 'column',
            gap: '8px',
          })}
        >
          <p>{title}</p>
          {description && (
            <p
              className={css({
                color: 'gray.200',
                textStyle: 'Body.tertiary',
                lineClamp: 3,
              })}
            >
              {description}
            </p>
          )}
        </div>
        {reorderHandleSlot}
      </div>
    </MotionLink>
  );
};

export const EntityLinkReorderHandle = ({
  onPointerDown,
  onPointerUp,
}: {
  onPointerDown: ComponentProps<'div'>['onPointerDown'];
  onPointerUp: ComponentProps<'div'>['onPointerUp'];
}) => {
  return (
    <div
      className={css({
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        touchAction: 'none',
        px: '4px',
      })}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <Menu className={css({ width: '[24px]', height: '[24px]' })} />
    </div>
  );
};
