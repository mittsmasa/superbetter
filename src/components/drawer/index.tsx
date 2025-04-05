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
        backgroundColor: 'background',
        borderTop: '1px solid',
        borderColor: 'foreground',
        color: 'foreground',
        maxWidth: '[100dvw]',
        maxHeight: '[100dvh]',
        width: '[100%]',
        height: '[90%]',
        margin: '[auto auto 0]',
        transitionTimingFunction: 'ease',
        transitionProperty: 'display, overlay, opacity, transform',
        transitionDuration: '0.3s',
        transitionBehavior: 'allow-discrete',
        opacity: 0,
        transform: 'translateY(100%)',
        _open: {
          opacity: 1,
          transform: 'translateY(0)',
          _starting: {
            opacity: 0,
            transform: 'translateY(100%)',
          },
        },
        _backdrop: {
          backgroundColor: 'background',
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
            backgroundColor: 'background',
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
