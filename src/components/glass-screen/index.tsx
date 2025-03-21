'use client';

import { css } from '@/styled-system/css';
import {
  type PropsWithChildren,
  createContext,
  use,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

const GlassScreen = () => {
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

const GlassScreenUpdaterContext = createContext<{
  show: () => void;
  hide: () => void;
} | null>(null);

export const GlassScreenProvider = ({ children }: PropsWithChildren) => {
  const [isShow, setIsShow] = useState(false);
  const context = useMemo(
    () => ({ show: () => setIsShow(true), hide: () => setIsShow(false) }),
    [],
  );
  return (
    <GlassScreenUpdaterContext.Provider value={context}>
      {children}
      {isShow && <GlassScreen />}
    </GlassScreenUpdaterContext.Provider>
  );
};

export const useGlassScreenUpdater = () => {
  const context = use(GlassScreenUpdaterContext);
  if (!context) {
    throw new Error('useGlassScreen must be used within a GlassScreenProvider');
  }
  return context;
};

export const useGlassScreen = (isShow: boolean) => {
  const { show, hide } = useGlassScreenUpdater();
  useEffect(() => {
    if (isShow) {
      show();
      return;
    }
    hide();
  }, [isShow, show, hide]);
};
