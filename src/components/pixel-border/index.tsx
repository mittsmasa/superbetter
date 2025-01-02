import { css } from '@/styled-system/css';
import { type Token, token } from '@/styled-system/tokens';
import type { SystemProperties } from '@/styled-system/types';
import type { CSSProperties, PropsWithChildren } from 'react';

export const PixelBorder = ({
  borderWidth = 2,
  color,
  hidden,
  width = '[fit-content]',
  height = '[fit-content]',
  children,
}: PropsWithChildren<{
  borderWidth?: number;
  color?: Token;
  hidden?: boolean;
  width?: SystemProperties['width'];
  height?: SystemProperties['height'];
}>) => {
  const style = {
    '--pixel-border-width': `${borderWidth}px`,
    '--pixel-border-color': color ? token(color) : 'currentColor',
  } as CSSProperties;
  return (
    <div
      style={style}
      className={css(
        {
          display: 'flex',
          margin: 'var(--pixel-border-width)',
          width,
          height,
        },
        !hidden && {
          boxShadow:
            'calc(-1 * var(--pixel-border-width)) 0 0 0 var(--pixel-border-color), var(--pixel-border-width) 0 0 0 var(--pixel-border-color), 0 calc(-1 * var(--pixel-border-width)) 0 0 var(--pixel-border-color), 0 var(--pixel-border-width) 0 0 var(--pixel-border-color)',
        },
      )}
    >
      {children}
    </div>
  );
};
