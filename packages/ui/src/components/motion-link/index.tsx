'use client';

import type { ComponentProps, ElementType, ReactNode } from 'react';
import { useTapFeeling } from '../../hooks/use-tap-feeling';
import { css, cx } from '../../styled-system/css';
import { pixelBorder } from '../../styled-system/patterns';
import type { ColorToken } from '../../styled-system/tokens';
import type { ConditionalValue } from '../../styled-system/types';

// Polymorphic MotionLink - use `as` prop to inject link component (e.g., next/link)
type MotionLinkProps<C extends ElementType = 'a'> = {
  as?: C;
  href: string;
  children: ReactNode;
  pixelBorderColor?: ConditionalValue<ColorToken>;
  disabled?: boolean;
} & Omit<ComponentProps<C>, 'as' | 'href' | 'children' | 'className'>;

export const MotionLink = <C extends ElementType = 'a'>({
  as,
  pixelBorderColor,
  disabled = false,
  href,
  children,
  ...props
}: MotionLinkProps<C>) => {
  const feeling = useTapFeeling();
  const Component = as || 'a';

  return (
    <Component
      {...props}
      {...feeling.props}
      href={href}
      className={cx(
        pixelBorder({
          borderWidth: 2,
          borderColor:
            (pixelBorderColor ?? disabled)
              ? 'interactive.border.disabled'
              : 'interactive.border',
        }),
        // display: inline では transform が効かないため block に変更
        css(feeling.cssRaw, {
          backgroundColor: 'interactive.background',
          display: 'block',
          cursor: disabled ? 'not-allowed' : undefined,
          pointerEvents: disabled ? 'none' : undefined,
        }),
      )}
    >
      {children}
    </Component>
  );
};
