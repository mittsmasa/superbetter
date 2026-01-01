'use client';

import type { ComponentProps, ElementType, ReactNode } from 'react';
import { useTapFeeling } from '../../hooks/use-tap-feeling';
import { css, cva, cx } from '../../styled-system/css';
import { pixelBorder } from '../../styled-system/patterns';

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

// Polymorphic ButtonLink - use `as` prop to inject link component
type ButtonLinkProps<C extends ElementType = 'a'> = {
  as?: C;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  href: string;
  children: ReactNode;
} & Omit<ComponentProps<C>, 'as' | 'href' | 'children' | 'className'>;

export const ButtonLink = <C extends ElementType = 'a'>({
  as,
  children,
  variant,
  disabled,
  href,
  ...props
}: ButtonLinkProps<C>) => {
  const feeling = useTapFeeling();
  const Component = as || 'a';

  return (
    <Component
      {...feeling.props}
      {...props}
      href={href}
      className={cx(
        pixelBorder({
          borderWidth: 2,
          borderColor: disabled
            ? 'interactive.border.disabled'
            : 'interactive.border.alt',
        }),
        css(button.raw({ variant }), !disabled && feeling.cssRaw, {
          cursor: disabled ? 'not-allowed' : undefined,
          pointerEvents: disabled ? 'none' : undefined,
        }),
      )}
    >
      {children}
    </Component>
  );
};
