import { Close } from '@/assets/icons';
import { css } from '@/styled-system/css';
import type { ReactNode, RefObject } from 'react';
import { IconButton } from '../icon-button';

export const Drawer = ({
  onClose,
  bodySlot: body,
  footerSlot: footer,
  ref,
}: {
  onClose: () => void;
  bodySlot: ReactNode;
  footerSlot?: ReactNode;
  ref: RefObject<HTMLDialogElement | null>;
}) => {
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
          {body}
        </div>
        {footer && (
          <div className={css({ py: '12px', position: 'sticky', bottom: 0 })}>
            {footer}
          </div>
        )}
      </div>
    </dialog>
  );
};
