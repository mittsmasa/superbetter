import { css } from '@/styled-system/css';
import {
  type PropsWithChildren,
  createContext,
  use,
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

const GlassScreenContext = createContext<{
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
    <GlassScreenContext.Provider value={context}>
      {children}
      {isShow && <GlassScreen />}
    </GlassScreenContext.Provider>
  );
};

export const useGlassScreen = () => {
  const context = use(GlassScreenContext);
  if (!context) {
    throw new Error('useGlassScreen must be used within a GlassScreenProvider');
  }
  return context;
};
