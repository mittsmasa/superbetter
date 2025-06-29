'use client';

import type { ComponentProps } from 'react';
import { useTapFeeling } from '@/hooks/feeling';
import { css, cva, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';

const button = cva({
  base: {
    _disabled: {
      color: 'foreground.disabled',
      cursor: 'unset',
    },
    alignItems: 'center',
    backgroundColor: 'interactive.background',
    color: 'foreground',
    cursor: 'pointer',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
  },
  defaultVariants: { size: 'md' },
  variants: {
    size: {
      lg: {
        height: '[28px]',
        width: '[28px]',
      },
      md: {
        height: '[24px]',
        width: '[24px]',
      },
      sm: {
        height: '[20px]',
        width: '[20px]',
      },
      xl: {
        height: '[32px]',
        width: '[32px]',
      },
    },
  },
});

export const IconButton = ({
  active,
  size,
  children,
  ...props
}: { active?: boolean; size?: 'sm' | 'md' | 'lg' | 'xl' } & Pick<
  ComponentProps<'button'>,
  'disabled' | 'type' | 'onClick' | 'children' | 'id'
>) => {
  const feeling = useTapFeeling();
  return (
    <button
      {...feeling.props}
      {...props}
      className={cx(
        pixelBorder({
          borderColor: active
            ? 'interactive.border.alt'
            : 'interactive.background',
          borderWidth: 2,
        }),
        css(
          button.raw({ size }),
          !props.disabled && feeling.cssRaw,
          active && {
            backgroundColor: 'interactive.background.alt',
            color: 'interactive.foreground.alt',
          },
        ),
      )}
    >
      {children}
    </button>
  );
};
