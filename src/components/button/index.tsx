'use client';

import { useTapFeeling } from '@/hooks/feeling';
import { css } from '@/styled-system/css';
import type { ComponentProps } from 'react';

export const Button = ({
  children,
  ...props
}: Pick<
  ComponentProps<'button'>,
  'disabled' | 'type' | 'onClick' | 'children'
>) => {
  const feeling = useTapFeeling();
  return (
    <button
      {...feeling.props}
      {...props}
      className={css(
        {
          backgroundColor: 'white',
          color: 'black',
          cursor: 'pointer',
          padding: '8px',
          textStyle: 'Body.primary',
          _disabled: {
            backgroundColor: 'gray.300',
            cursor: 'unset',
          },
        },
        !props.disabled && feeling.cssRaw,
      )}
    >
      {children}
    </button>
  );
};
