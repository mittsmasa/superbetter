import { Menu } from '@/assets/icons';
import { MotionLink } from '@/components/motion-link';
import { css } from '@/styled-system/css';
import type { ComponentProps, ReactNode } from 'react';

export const EntityLink = ({
  href,
  disabled,
  title,
  description,
  reorderHandleSlot,
}: {
  href: ComponentProps<typeof MotionLink>['href'];
  disabled?: ComponentProps<typeof MotionLink>['disabled'];
  title: string;
  description?: string | null;
  reorderHandleSlot?: ReactNode;
}) => {
  return (
    <div className={css({ position: 'relative' })}>
      <MotionLink href={href} disabled={disabled}>
        <div
          className={css({
            backgroundColor: 'black',
            display: 'flex',
            gap: '4px',
            padding: '4px 0px 4px 12px',
            ...(reorderHandleSlot && { paddingRight: '32px' }),
          })}
        >
          <div
            className={css({
              display: 'flex',
              flex: '1',
              flexDirection: 'column',
              justifyContent: 'center',
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
        </div>
      </MotionLink>
      <span
        className={css({
          position: 'absolute',
          top: '50%',
          right: '0',
          transform: 'translateY(-50%)',
        })}
      >
        {reorderHandleSlot}
      </span>
    </div>
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
        minHeight: '[30px]',
        minWidth: '[30px]',
        justifyContent: 'center',
        touchAction: 'none',
        px: '4px',
      })}
      onPointerDown={(e) => {
        e.stopPropagation();
        onPointerDown?.(e);
      }}
      onPointerUp={(e) => {
        onPointerUp?.(e);
      }}
    >
      <Menu className={css({ width: '[24px]', height: '[24px]' })} />
    </div>
  );
};
