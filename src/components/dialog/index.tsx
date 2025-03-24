import { css, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';
import type { PropsWithChildren, RefObject } from 'react';

export const Dialog = ({
  ref,
  children,
}: PropsWithChildren<{
  ref: RefObject<HTMLDialogElement | null>;
}>) => {
  return (
    // close on click backdrop
    <dialog
      ref={ref}
      className={cx(
        pixelBorder({}),
        css({
          backgroundColor: 'background',
          color: 'foreground',
          width: '[100%]',
          margin: 'auto',
          padding: '4px',
          _backdrop: {
            backgroundColor: 'background',
            opacity: 0.5,
          },
        }),
      )}
    >
      {children}
    </dialog>
  );
};
