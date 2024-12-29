import { css } from '@/styled-system/css';
import { type Token, token } from '@/styled-system/tokens';
import type { CSSProperties, PropsWithChildren } from 'react';

export const PixelBorder = ({
  borderWidth = 2,
  color,
  hidden,
  children,
}: PropsWithChildren<{
  borderWidth?: number;
  color?: Token;
  hidden?: boolean;
}>) => {
  const style = {
    '--pixel-border-width': `${borderWidth}px`,
    '--pixel-border-color': color ? token(color) : 'currentColor',
  } as CSSProperties;
  return (
    <div
      style={style}
      className={css({
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        padding: 'var(--pixel-border-width)',
        width: '[fit-content]',
        height: '[fit-content]',
      })}
    >
      <div
        className={css(
          {
            display: 'flex',
          },
          !hidden && {
            boxShadow:
              'calc(-1 * var(--pixel-border-width)) 0 0 0 var(--pixel-border-color), var(--pixel-border-width) 0 0 0 var(--pixel-border-color), 0 calc(-1 * var(--pixel-border-width)) 0 0 var(--pixel-border-color), 0 var(--pixel-border-width) 0 0 var(--pixel-border-color)',
          },
        )}
      >
        {children}
      </div>
    </div>
  );
};
