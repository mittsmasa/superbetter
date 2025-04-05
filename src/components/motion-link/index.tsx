'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { useTapFeeling } from '@/hooks/feeling';
import { css, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';
import type { ColorToken } from '@/styled-system/tokens';
import type { ConditionalValue } from '@/styled-system/types';

export const MotionLink = ({
  pixelBorderWidth = 1,
  pixelBorderColor,
  disabled = false,
  ...props
}: Omit<ComponentProps<typeof Link>, 'className'> & {
  pixelBorderWidth?: number;
  pixelBorderColor?: ConditionalValue<ColorToken>;
  disabled?: boolean;
}) => {
  const feeling = useTapFeeling();
  return (
    <Link
      {...props}
      {...feeling.props}
      className={cx(
        // display: inline では transform が効かないため block に変更
        css(feeling.cssRaw, {
          display: 'block',
          cursor: disabled ? 'not-allowed' : undefined,
          pointerEvents: disabled ? 'none' : undefined,
        }),
        pixelBorderWidth > 0 &&
          pixelBorder({
            borderWidth: pixelBorderWidth,
            borderColor: pixelBorderColor,
          }),
      )}
    />
  );
};
