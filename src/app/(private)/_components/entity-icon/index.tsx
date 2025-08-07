'use client';

import { motion, useAnimation } from 'motion/react';
import { useEffect, useMemo, useRef } from 'react';
import { neonCurrentColor } from '@/assets/style';
import type { EntityType } from '@/db/types/mission';
import { css } from '@/styled-system/css';
import { IconImpl } from './entity-icon-map';

export type MissionEntity = {
  itemType: EntityType;
  completed: boolean;
};

export const EntityIcon = ({ itemType, completed }: MissionEntity) => {
  const prevRef = useRef<boolean>(completed);
  const controls = useAnimation();
  const IconWithAnimation = useMemo(
    () => motion.create(IconImpl[itemType]),
    [itemType],
  );

  useEffect(() => {
    if (completed !== prevRef.current) {
      void controls.start({
        scale: [1, 1.3, 1],
      });
    }
  }, [completed, controls]);
  return (
    <IconWithAnimation
      className={css(
        {
          color: completed
            ? itemType === 'powerup'
              ? 'entity.powerup'
              : itemType === 'quest'
                ? 'entity.quest'
                : itemType === 'villain'
                  ? 'entity.villain'
                  : 'entity.disabled'
            : 'entity.disabled',
        },
        completed && neonCurrentColor,
      )}
      animate={controls}
      transition={{ duration: 0.8 }}
    />
  );
};
