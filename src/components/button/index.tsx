'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { useTapFeeling } from '@/hooks/feeling';
import { css, cva, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';

const button = cva({
  base: {
    _disabled: {
      cursor: 'unset',
    },
    cursor: 'pointer',
    padding: '8px',
    textStyle: 'Body.primary',
    transition: '[width 0.2s]',
  },
  defaultVariants: { full: false, variant: 'primary' },
  variants: {
    full: {
      true: {
        width: '[100%]',
      },
    },
    variant: {
      primary: {
        _disabled: {
          backgroundColor: 'foreground.disabled',
        },
        backgroundColor: 'background.alt',
        color: 'foreground.alt',
      },
      secondary: {
        _disabled: {
          color: 'foreground.disabled',
        },
        backgroundColor: 'background',
        color: 'foreground',
      },
    },
  },
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
          borderColor: props.disabled
            ? 'interactive.border.disabled'
            : 'interactive.border.alt',
          borderWidth: 2,
        }),
        css(button.raw({ full, variant }), !props.disabled && feeling.cssRaw),
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
          borderColor: props.disabled
            ? 'interactive.border.disabled'
            : 'interactive.border.alt',
          borderWidth: 2,
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
