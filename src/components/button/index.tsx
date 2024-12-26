'use client';

import { css } from '@/styled-system/css';
import { type ComponentProps, useState } from 'react';

export const Button = ({
  children,
  ...props
}: Pick<
  ComponentProps<'button'>,
  'disabled' | 'type' | 'onClick' | 'children'
>) => {
  const [tap, setTap] = useState(false);
  return (
    <button
      onTouchStart={() => setTap(true)}
      onTouchEnd={() => setTap(false)}
      onTouchCancel={() => setTap(false)}
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
        tap && !props.disabled && { transform: 'scale(0.95)' },
      )}
    >
      {children}
    </button>
  );
};
