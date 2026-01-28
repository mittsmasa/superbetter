'use client';

import { IconButton, MotionLink, useToast } from '@superbetter/ui';
import { useVibration } from '@superbetter/ui/hooks';
import { ChevlonLeft, Zap } from '@superbetter/ui/icons';
import { motion } from 'motion/react';
import Link from 'next/link';
import {
  type ComponentProps,
  type ReactNode,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import { Menu } from '@/assets/icons';
import { css, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';
import type { EntityType } from '@/types/superbetter';

type ExecuteResult =
  | { type: 'ok' }
  | { type: 'error'; error: { message: string } };

type EntityLinkProps = {
  href: string;
  disabled?: boolean;
  title: ReactNode;
  description?: string | null;
  reorderHandleSlot?: ReactNode;
  enableQuickAction?: boolean;
  entityType?: Exclude<EntityType, 'epicwin'>;
  onExecute?: () => Promise<ExecuteResult>;
};

const messages: Record<Exclude<EntityType, 'epicwin'>, string> = {
  quest: 'クエストにいどんだ！',
  powerup: 'パワーアップアイテムをつかった！',
  villain: 'ヴィランとたたかった！',
};

export const EntityLink = ({
  href,
  disabled,
  title,
  description,
  reorderHandleSlot,
  enableQuickAction = false,
  entityType,
  onExecute,
}: EntityLinkProps) => {
  const [isQuickActionVisible, setIsQuickActionVisible] = useState(false);
  const [isPending, startTransition] = useTransition();
  const quickActionRef = useRef<HTMLDivElement>(null);
  const { add: toast } = useToast();
  const { vibrate } = useVibration();

  useEffect(() => {
    if (!isQuickActionVisible) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        quickActionRef.current &&
        !quickActionRef.current.contains(event.target as Node)
      ) {
        setIsQuickActionVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isQuickActionVisible]);

  const handleExecute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onExecute || !entityType) return;

    startTransition(async () => {
      const result = await onExecute();

      if (result?.type === 'error') {
        toast({ message: result.error.message });
        return;
      }

      vibrate(100);

      toast({ message: messages[entityType] });
      setIsQuickActionVisible(false);
    });
  };

  // クイックアクションが有効な場合はスライドUI
  if (enableQuickAction && entityType && onExecute && !disabled) {
    return (
      <div
        className={css({
          position: 'relative',
          overflow: 'hidden',
        })}
        ref={quickActionRef}
      >
        <motion.button
          layout
          initial={false}
          animate={{ x: isQuickActionVisible ? -96 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={(e) => {
            e.stopPropagation();
            setIsQuickActionVisible((prev) => !prev);
          }}
          className={cx(
            pixelBorder({
              borderWidth: 2,
              borderColor: 'interactive.border',
            }),
            css({
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'interactive.background',
              cursor: 'pointer',
              width: '[100%]',
              textAlign: 'left',
            }),
          )}
        >
          <div
            className={css({
              display: 'flex',
              gap: '4px',
              padding: '4px 4px 4px 8px',
              flex: '1',
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
        </motion.button>

        {isQuickActionVisible && (
          <div
            className={css({
              position: 'absolute',
              right: 0,
              top: 0,
              height: '[100%]',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              paddingRight: '8px',
            })}
          >
            <Link
              href={href as never}
              className={css({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              })}
            >
              <IconButton size="md">
                <span
                  className={css({ transform: 'scaleX(-1)', display: 'flex' })}
                >
                  <ChevlonLeft size={24} />
                </span>
              </IconButton>
            </Link>
            <IconButton
              onClick={handleExecute}
              disabled={isPending}
              size="md"
              active
            >
              <Zap size={24} />
            </IconButton>
          </div>
        )}

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
  }

  // 既存のMotionLinkベースのUI
  return (
    <div className={css({ position: 'relative' })}>
      <MotionLink
        href={href}
        disabled={disabled}
        pixelBorderColor={disabled ? 'foreground.disabled' : undefined}
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
      <Menu size={24} />
    </div>
  );
};
