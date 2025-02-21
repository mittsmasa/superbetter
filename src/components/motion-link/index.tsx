'use client';

import { useTapFeeling } from '@/hooks/feeling';
import { css, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';
import Link from 'next/link';
import type { ComponentProps } from 'react';

export const MotionLink = ({
  pixelBorderWidth = 1,
  ...props
}: Omit<ComponentProps<typeof Link>, 'className'> & {
  pixelBorderWidth?: number;
}) => {
  const feeling = useTapFeeling();
  return (
    <Link
      {...props}
      {...feeling.props}
      className={cx(
        // display: inline では transform が効かないため block に変更
        css(feeling.cssRaw, { display: 'block' }),
        pixelBorderWidth > 0 && pixelBorder({ borderWidth: pixelBorderWidth }),
      )}
    />
  );
};
