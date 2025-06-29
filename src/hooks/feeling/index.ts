import { useState } from 'react';
import { css } from '@/styled-system/css';

export const useTapFeeling = () => {
  const [tap, setTap] = useState(false);
  return {
    cssRaw: css.raw(tap && { transform: 'scale(0.95)' }),
    props: {
      onTouchCancel: () => setTap(false),
      onTouchEnd: () => setTap(false),
      onTouchStart: () => setTap(true),
    },
  };
};
