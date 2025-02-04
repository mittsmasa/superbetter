'use client';

import { useVibration } from '@/app/_providers/vibration';

export const VibrateButton = () => {
  const vibrator = useVibration();
  return (
    <button type="button" onClick={() => vibrator.vibrate()}>
      Vibrate
    </button>
  );
};
