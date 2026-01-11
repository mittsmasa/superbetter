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

export const useEntityFeedback = (defaultEntityType?: EntityType) => {
  const { vibrate } = useVibration();

  const triggerFeedback = useCallback(
    (entityType?: EntityType) => {
      const type = entityType ?? defaultEntityType;
      if (!type) {
        return;
      }
      vibrate(vibrationPatterns[type]);
    },
    [defaultEntityType, vibrate],
  );

  return { triggerFeedback };
};
