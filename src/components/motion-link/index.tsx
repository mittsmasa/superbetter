'use client';

import { useTapFeeling } from '@/hooks/feeling';
import { css, cx } from '@/styled-system/css';
import Link from 'next/link';
import type { ComponentProps } from 'react';

export const MotionLink = ({
  className,
  ...props
}: ComponentProps<typeof Link>) => {
  const feeling = useTapFeeling();
  return (
    <Link
      {...props}
      {...feeling.props}
      className={cx(
        // display: inline では transform が効かないため inline-block に変更
        css(feeling.cssRaw, { display: 'inline-block' }),
        className,
      )}
    />
  );
};
