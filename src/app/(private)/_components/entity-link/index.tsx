import type { ComponentProps, ReactNode } from 'react';
import { Menu } from '@/assets/icons';
import { MotionLink } from '@/components/motion-link';
import { css } from '@/styled-system/css';

export const EntityLink = ({
  href,
  disabled,
  title,
  description,
  reorderHandleSlot,
}: {
  href: ComponentProps<typeof MotionLink>['href'];
  disabled?: ComponentProps<typeof MotionLink>['disabled'];
  title: ReactNode;
  description?: string | null;
  reorderHandleSlot?: ReactNode;
}) => {
  return (
    <div className={css({ position: 'relative' })}>
      <MotionLink
        href={href}
        {...(disabled && {
          disabled: true,
          pixelBorderColor: 'foreground.disabled',
        })}
      >
        <div
          className={css({
            ...(disabled && { color: 'foreground.disabled' }),
            display: 'flex',
            gap: '4px',
            padding: '4px 4px 4px 8px',
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
            {title}
            {description && (
              <p
                className={css({
                  color: 'foreground.secondary',
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
