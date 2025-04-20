'use client';

import type { ComponentProps } from 'react';
import { useTapFeeling } from '@/hooks/feeling';
import { css, cva, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';

const button = cva({
  base: {
    alignItems: 'center',
    backgroundColor: 'interactive.background',
    color: 'foreground',
    cursor: 'pointer',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    _disabled: {
      color: 'foreground.disabled',
      cursor: 'unset',
    },
  },
  defaultVariants: { size: 'md' },
  variants: {
    size: {
      sm: {
        width: '[20px]',
        height: '[20px]',
      },
      md: {
        width: '[24px]',
        height: '[24px]',
      },
      lg: {
        width: '[28px]',
        height: '[28px]',
      },
      xl: {
        width: '[32px]',
        height: '[32px]',
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
        active &&
          pixelBorder({
            borderWidth: 2,
            borderColor: 'interactive.border.alt',
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
