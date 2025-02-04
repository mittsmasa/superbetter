'use client';

import { css } from '@/styled-system/css';
import { type ReactNode, createContext, use, useCallback, useRef } from 'react';

interface VibrationContextProps {
  vibrate: () => void;
}

const VibrationContext = createContext<VibrationContextProps | undefined>(
  undefined,
);

export const VibrationProvider = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLInputElement>(null);
  const vibrate = useCallback(
    () => window.navigator.vibrate?.([10]) ?? ref.current?.click(),
    [],
  );
  return (
    <VibrationContext.Provider value={{ vibrate }}>
      {children}
      <input
        ref={ref}
        // @ts-expect-error -- switch をつかいたい
        switch="true"
        type="checkbox"
        className={css({ width: '[0]', height: '[0]' })}
      />
    </VibrationContext.Provider>
  );
};

export const useVibration = () => {
  const context = use(VibrationContext);
  if (!context) {
    throw new Error('useVibration must be used within a VibrationProvider');
  }
  return context;
};
