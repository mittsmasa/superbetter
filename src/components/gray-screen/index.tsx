import { css } from '@/styled-system/css';
import { useCallback, useState } from 'react';
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
      opacity: 0.1,
      pointerEvents: 'none',
      zIndex: 'glassScreen',
    })}
  />
);

export const useGlassScreen = () => {
  const [show, setShow] = useState(false);
  const Component = useCallback(() => <>{show && <GlassScreen />}</>, [show]);
  return { Component, setShow };
};
