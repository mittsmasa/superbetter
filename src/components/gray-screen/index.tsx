import { css } from '@/styled-system/css';
import { createPortal } from 'react-dom';

export const GlassScreen = () => {
  return createPortal(<Screen />, document.body);
};

const Screen = () => (
  <div
    className={css({
      position: 'fixed',
      top: 0,
      left: 0,
      width: '[100dvw]',
      height: '[100dvh]',
      backgroundColor: 'black',
      opacity: 0.5,
      pointerEvents: 'none',
      zIndex: 10,
    })}
  />
);
