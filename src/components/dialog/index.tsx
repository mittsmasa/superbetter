import type { PropsWithChildren, RefObject } from 'react';
import { css, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';

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
          _backdrop: {
            backgroundColor: 'background',
            opacity: 0.5,
          },
          backgroundColor: 'background',
          color: 'foreground',
          margin: 'auto',
          padding: '4px',
          width: '[100%]',
        }),
      )}
    >
      {children}
    </dialog>
  );
};
