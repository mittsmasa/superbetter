'use client';

import { css, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';

export const LinkBox = ({
  href,
  children,
}: PropsWithChildren<{ href: string }>) => {
  return (
    <Link
      href={href}
      className={cx(
        pixelBorder({}),
        css({
          width: '[100%]',
          display: 'block',
        }),
      )}
    >
      {children}
    </Link>
  );
};
