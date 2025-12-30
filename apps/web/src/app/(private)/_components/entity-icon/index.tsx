'use client';

import { motion, useAnimation } from 'motion/react';
import { type ComponentProps, useEffect, useMemo, useRef } from 'react';
import { neonCurrentColor } from '@/assets/style';
import type { EntityType } from '@/db/types/mission';
import { css } from '@/styled-system/css';
import { IconImpl } from './entity-icon-map';

export type MissionEntity = {
  itemType: EntityType;
  completed: boolean;
  size?: ComponentProps<(typeof IconImpl)[EntityType]>['size'];
};

export const EntityIcon = ({ itemType, completed, size }: MissionEntity) => {
  // FIXME: アニメーションがこわれてる
  const prevRef = useRef(completed);
  const controls = useAnimation();
  const IconWithAnimation = useMemo(
    () => motion.create(IconImpl[itemType]),
    [itemType],
  );

  useEffect(() => {
    if (completed !== prevRef.current && completed === true) {
      void controls.start({
        scale: [1, 1.3, 1],
      });
      prevRef.current = completed;
    }
  }, [completed, controls]);
  const colorToken = completed
    ? itemType === 'powerup'
      ? 'colors.entity.powerup'
      : itemType === 'quest'
        ? 'colors.entity.quest'
        : itemType === 'villain'
          ? 'colors.entity.villain'
          : itemType === 'epicwin'
            ? 'colors.entity.epicwin'
            : 'colors.entity.disabled'
    : 'colors.entity.disabled';

  return (
    <div
      className={css(
        {
          display: 'inline-flex',
        },
        completed && neonCurrentColor,
      )}
    >
      <IconWithAnimation
        color={colorToken}
        size={size}
        animate={controls}
        transition={{ duration: 0.8 }}
      />
    </div>
  );
};
