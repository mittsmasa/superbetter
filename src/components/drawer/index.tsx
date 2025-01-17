import { Close } from '@/assets/icons';
import { css } from '@/styled-system/css';
import type { PropsWithChildren, RefObject } from 'react';
import { IconButton } from '../icon-button';

export const Drawer = ({
  onClose,
  children,
  ref,
}: PropsWithChildren<{
  onClose: () => void;
  ref: RefObject<HTMLDialogElement | null>;
}>) => {
  return (
    // TODO: animation
    // TODO: close on click backdrop
    <dialog
      ref={ref}
      className={css({
        backgroundColor: 'black',
        borderTop: '1px solid',
        borderColor: 'white',
        color: 'white',
        maxWidth: '[100dvw]',
        maxHeight: '[100dvh]',
        width: '[100%]',
        height: '[80%]',
        margin: '[auto auto 0]',
        _backdrop: {
          backgroundColor: 'black',
          opacity: 0.5,
        },
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          height: '[100%]',
        })}
      >
        <div
          className={css({
            backgroundColor: 'black',
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '12px',
            position: 'sticky',
            top: 0,
          })}
        >
          <IconButton onClick={onClose}>
            <Close className={css({ width: '[24px]', height: '[24px]' })} />
          </IconButton>
        </div>
        <div className={css({ flex: '1', minHeight: '[0]', padding: '12px' })}>
          {children}
        </div>
      </div>
    </dialog>
  );
};
