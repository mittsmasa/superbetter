'use client';

import { useTapFeeling } from '@/hooks/feeling';
import { css, cva, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';
import type { ComponentProps } from 'react';

const button = cva({
  base: {
    color: 'white',
    cursor: 'pointer',
    _disabled: {
      color: 'gray.200',
      cursor: 'unset',
    },
  },
  defaultVariants: { size: 'md' },
  variants: {
    size: {
      sm: {
        width: '[20px]',
      },
      md: {
        width: '[24px]',
      },
      lg: {
        width: '[28px]',
      },
    },
  },
});

export const IconButton = ({
  active,
  size,
  children,
  ...props
}: { active?: boolean; size?: 'sm' | 'md' | 'lg' } & Pick<
  ComponentProps<'button'>,
  'disabled' | 'type' | 'onClick' | 'children'
>) => {
  const feeling = useTapFeeling();
  return (
    <button
      {...feeling.props}
      {...props}
      className={cx(
        active &&
          pixelBorder({
            ...(props.disabled ? { borderColor: 'gray.400' } : {}),
          }),
        css(button.raw({ size }), !props.disabled && feeling.cssRaw),
      )}
    >
      {children}
    </button>
  );
};
