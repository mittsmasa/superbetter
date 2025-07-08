'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { useTapFeeling } from '@/hooks/feeling';
import { css, cva, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';

const button = cva({
  base: {
    cursor: 'pointer',
    padding: '8px',
    textStyle: 'Body.primary',
    transition: '[width 0.2s]',
    _disabled: {
      cursor: 'unset',
    },
  },
  variants: {
    full: {
      true: {
        width: '[100%]',
      },
    },
    variant: {
      primary: {
        backgroundColor: 'background.alt',
        color: 'foreground.alt',
        _disabled: {
          backgroundColor: 'foreground.disabled',
        },
      },
      secondary: {
        backgroundColor: 'background',
        color: 'foreground',
        _disabled: {
          color: 'foreground.disabled',
        },
      },
    },
  },
  defaultVariants: { variant: 'primary', full: false },
});

export const Button = ({
  children,
  variant,
  full,
  ...props
}: { variant?: 'primary' | 'secondary'; full?: boolean } & Pick<
  ComponentProps<'button'>,
  'disabled' | 'type' | 'onClick' | 'children'
>) => {
  const feeling = useTapFeeling();
  return (
    <button
      {...feeling.props}
      {...props}
      className={cx(
        pixelBorder({
          borderWidth: 2,
          borderColor: props.disabled
            ? 'interactive.border.disabled'
            : 'interactive.border.alt',
        }),
        css(button.raw({ variant, full }), !props.disabled && feeling.cssRaw),
      )}
    >
      {children}
    </button>
  );
};

export const ButtonLink = ({
  children,
  variant,
  ...props
}: { variant?: 'primary' | 'secondary'; disabled?: boolean } & Pick<
  ComponentProps<typeof Link>,
  'children' | 'href'
>) => {
  const feeling = useTapFeeling();
  return (
    <Link
      {...feeling.props}
      {...props}
      className={cx(
        pixelBorder({
          borderWidth: 2,
          borderColor: props.disabled
            ? 'interactive.border.disabled'
            : 'interactive.border.alt',
        }),
        css(button.raw({ variant }), !props.disabled && feeling.cssRaw, {
          cursor: props.disabled ? 'not-allowed' : undefined,
          pointerEvents: props.disabled ? 'none' : undefined,
        }),
      )}
    >
      {children}
    </Link>
  );
};
