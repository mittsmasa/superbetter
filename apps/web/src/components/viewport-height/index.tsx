'use client';

import { useEffect } from 'react';

export function ViewportHeight() {
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight;
      document.documentElement.style.setProperty('--app-height', `${vh}px`);
    };

    setViewportHeight();

    window.addEventListener('resize', setViewportHeight);

    window.addEventListener('orientationchange', () => {
      setTimeout(setViewportHeight, 100);
    });

    return () => {
      window.removeEventListener('resize', setViewportHeight);
    };
  }, []);

  return null;
}
