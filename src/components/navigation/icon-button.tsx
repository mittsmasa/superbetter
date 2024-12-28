'use client';

import { css } from '@/styled-system/css';
import { type ComponentProps, useState } from 'react';

export const IconButton = ({
  active,
  children,
  ...props
}: { active?: boolean } & Pick<
  ComponentProps<'button'>,
  'disabled' | 'type' | 'onClick' | 'children'
>) => {
  const [tap, setTap] = useState(false);
  return (
    <div className={css({ width: '[28px]', height: '[28px]', padding: '2px' })}>
      <button
        {...props}
        onTouchStart={() => setTap(true)}
        onTouchEnd={() => setTap(false)}
        onTouchCancel={() => setTap(false)}
        className={css(
          {
            color: 'white',
            cursor: 'pointer',
            width: '[24px]',
            _disabled: {
              color: 'gray.200',
              cursor: 'unset',
            },
          },
          active && {
            boxShadow:
              '-2px 0 0 0 currentColor, 2px 0 0 0 currentColor, 0 -2px 0 0 currentColor, 0 2px 0 0 currentColor',
          },
          tap && !props.disabled && { transform: 'scale(0.95)' },
        )}
      >
        {children}
      </button>
    </div>
  );
};
