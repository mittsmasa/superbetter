import { css } from '@/styled-system/css';
import type { CSSProperties, PropsWithChildren } from 'react';

export const PixelBorder = ({
  borderWidth = 2,
  hidden,
  children,
}: PropsWithChildren<{ borderWidth?: number; hidden?: boolean }>) => {
  const style = {
    '--pixel-border-width': `${borderWidth}px`,
  } as CSSProperties;
  return (
    <div
      style={style}
      className={css({
        display: 'inline-block',
        padding: 'var(--pixel-border-width)',
      })}
    >
      <div
        className={css(
          !hidden && {
            boxShadow:
              'calc(-1 * var(--pixel-border-width)) 0 0 0 currentColor, var(--pixel-border-width) 0 0 0 currentColor, 0 calc(-1 * var(--pixel-border-width)) 0 0 currentColor, 0 var(--pixel-border-width) 0 0 currentColor',
          },
        )}
      >
        {children}
      </div>
    </div>
  );
};
