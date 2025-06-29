import type { PropsWithChildren, RefObject } from 'react';
import { Close } from '@/assets/icons';
import { css } from '@/styled-system/css';
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
    // TODO: close on click backdrop
    <dialog
      ref={ref}
      className={css({
        _backdrop: {
          backgroundColor: 'background',
          opacity: 0.5,
        },
        _open: {
          _starting: {
            opacity: 0,
            transform: 'translateY(100%)',
          },
          opacity: 1,
          transform: 'translateY(0)',
        },
        backgroundColor: 'background',
        borderColor: 'foreground',
        borderTop: '1px solid',
        color: 'foreground',
        height: '[90%]',
        margin: '[auto auto 0]',
        maxHeight: '[100dvh]',
        maxWidth: '[100dvw]',
        opacity: 0,
        transform: 'translateY(100%)',
        transitionBehavior: 'allow-discrete',
        transitionDuration: '0.3s',
        transitionProperty: 'display, overlay, opacity, transform',
        transitionTimingFunction: 'ease',
        width: '[100%]',
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
            backgroundColor: 'background',
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '12px',
            position: 'sticky',
            top: 0,
          })}
        >
          <IconButton onClick={onClose}>
            <Close className={css({ height: '[24px]', width: '[24px]' })} />
          </IconButton>
        </div>
        <div className={css({ flex: '1', minHeight: '[0]', padding: '12px' })}>
          {children}
        </div>
      </div>
    </dialog>
  );
};
