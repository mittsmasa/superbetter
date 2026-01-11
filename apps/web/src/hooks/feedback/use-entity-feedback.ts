'use client';

import { useVibration } from '@superbetter/ui';
import { useCallback, useState } from 'react';

export type EntityType = 'quest' | 'powerup' | 'villain' | 'epicwin';

type Intensity = 'light' | 'medium' | 'heavy';

const vibrationPatterns: Record<EntityType, number[]> = {
  quest: [50, 30, 100],
  powerup: [50, 30, 100],
  villain: [100, 50, 100, 50, 150],
  epicwin: [50, 30, 50, 30, 100, 50, 200],
};

const intensityMap: Record<EntityType, Intensity> = {
  quest: 'medium',
  powerup: 'light',
  villain: 'heavy',
  epicwin: 'heavy',
};

export const useEntityFeedback = (entityType: EntityType) => {
  const { vibrate } = useVibration();
  const [showCelebration, setShowCelebration] = useState(false);

  const triggerFeedback = useCallback(() => {
    vibrate(vibrationPatterns[entityType]);
    setShowCelebration(true);
  }, [entityType, vibrate]);

  const onCelebrationComplete = useCallback(() => {
    setShowCelebration(false);
  }, []);

  return {
    triggerFeedback,
    showCelebration,
    onCelebrationComplete,
    intensity: intensityMap[entityType],
  };
};
