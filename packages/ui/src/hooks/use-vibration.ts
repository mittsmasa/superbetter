'use client';

import { useCallback } from 'react';

/**
 * Vibration APIのラッパーフック
 * ブラウザ未サポート時（iOS Safari等）はサイレントにフォールバック
 */
export const useVibration = () => {
  const vibrate = useCallback((pattern: number | number[]) => {
    if (typeof navigator === 'undefined' || !navigator.vibrate) {
      return false;
    }

    try {
      return navigator.vibrate(pattern);
    } catch {
      return false;
    }
  }, []);

  const cancel = useCallback(() => {
    if (typeof navigator === 'undefined' || !navigator.vibrate) {
      return false;
    }

    try {
      return navigator.vibrate(0);
    } catch {
      return false;
    }
  }, []);

  return { vibrate, cancel };
};
