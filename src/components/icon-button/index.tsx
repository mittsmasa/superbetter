'use client';

import { useTapFeeling } from '@/hooks/feeling';
import { css, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';
import type { ComponentProps } from 'react';

export const IconButton = ({
  active,
  children,
  ...props
}: { active?: boolean } & Pick<
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
        css(
          {
            color: 'white',
            cursor: 'pointer',
            width: '[24px]',
            _disabled: {
              color: 'gray.200',
              cursor: 'unset',
            },
          },
          !props.disabled && feeling.cssRaw,
        ),
      )}
    >
      {children}
    </button>
  );
};
