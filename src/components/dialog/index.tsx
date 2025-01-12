import { css, cx } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';
import type { PropsWithChildren, RefObject } from 'react';

export const Dialog = ({
  ref,
  onClose,
  children,
}: PropsWithChildren<{
  ref: RefObject<HTMLDialogElement | null>;
  onClose: () => void;
}>) => {
  return (
    // close on click backdrop
    <dialog
      ref={ref}
      className={cx(
        pixelBorder({}),
        css({
          backgroundColor: 'black',
          color: 'white',
          maxHeight: '[100dvh]',
          width: '[100%]',
          margin: 'auto',
          bottom: 0,
          _backdrop: {
            backgroundColor: 'black',
            opacity: 0.5,
          },
        }),
      )}
    >
      {children}
    </dialog>
  );
};
