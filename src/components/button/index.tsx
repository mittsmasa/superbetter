'use client';

import { useTapFeeling } from '@/hooks/feeling';
import { css, cva, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';
import Link from 'next/link';
import type { ComponentProps } from 'react';

const button = cva({
  base: {
    cursor: 'pointer',
    padding: '8px',
    textStyle: 'Body.primary',
    _disabled: {
      cursor: 'unset',
    },
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: 'white',
        color: 'black',
        _disabled: {
          backgroundColor: 'gray.200',
        },
      },
      secondary: {
        backgroundColor: 'black',
        color: 'white',
        _disabled: {
          color: 'gray.200',
        },
      },
    },
  },
  defaultVariants: { variant: 'primary' },
});

export const Button = ({
  children,
  variant,
  ...props
}: { variant?: 'primary' | 'secondary' } & Pick<
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
          borderColor: props.disabled ? 'gray.200' : 'white',
        }),
        css(button.raw({ variant }), !props.disabled && feeling.cssRaw),
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
          borderColor: props.disabled ? 'gray.200' : 'white',
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
