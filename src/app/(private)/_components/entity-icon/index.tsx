'use client';

import { motion } from 'motion/react';
import { neonCurrentColor } from '@/assets/style';
import type { EntityType } from '@/db/types/mission';
import { css } from '@/styled-system/css';
import { IconImpl } from './entity-icon-map';

export type MissionEntity = {
  itemType: EntityType;
  completed: boolean;
};

export const EntityIcon = ({ itemType, completed }: MissionEntity) => {
  const Icon = IconImpl[itemType];
  const IconWithAnimation = motion.create(Icon);
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
          transition: '[color 0.8s ease-in-out]',
        },
        completed && neonCurrentColor,
      )}
    />
  );
};
