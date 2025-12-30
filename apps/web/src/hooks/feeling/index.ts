import { useState } from 'react';
import { css } from '@/styled-system/css';

export const useTapFeeling = () => {
  const [tap, setTap] = useState(false);
  return {
    props: {
      onTouchStart: () => setTap(true),
      onTouchEnd: () => setTap(false),
      onTouchCancel: () => setTap(false),
    },
    cssRaw: css.raw(tap && { transform: 'scale(0.95)' }),
  };
};
