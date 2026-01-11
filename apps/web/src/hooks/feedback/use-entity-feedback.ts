'use client';

import { useVibration } from '@superbetter/ui';
import { useCallback } from 'react';

export type EntityType = 'quest' | 'powerup' | 'villain' | 'epicwin';

const vibrationPatterns: Record<EntityType, number[]> = {
  quest: [50, 30, 100],
  powerup: [50, 30, 100],
  villain: [100, 50, 100, 50, 150],
  epicwin: [50, 30, 50, 30, 100, 50, 200],
};

export const useEntityFeedback = (entityType: EntityType) => {
  const { vibrate } = useVibration();

  const triggerFeedback = useCallback(() => {
    vibrate(vibrationPatterns[entityType]);
  }, [entityType, vibrate]);

  return { triggerFeedback };
};
