'use client';

import { css } from '@/styled-system/css';
import { type ComponentProps, useState } from 'react';
import { PixelBorder } from '../pixel-border';

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
    <PixelBorder hidden={!active} color="colors.white">
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
          tap && !props.disabled && { transform: 'scale(0.95)' },
        )}
      >
        {children}
      </button>
    </PixelBorder>
  );
};
