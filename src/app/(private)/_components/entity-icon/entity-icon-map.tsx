import type { FC, ReactNode } from 'react';
import { Android, ScriptText, Trophy, Zap } from '@/assets/icons';
import type { EntityType } from '@/db/types/mission';
import { css } from '@/styled-system/css';

export const IconMap = {
  powerup: <Zap className={css({ width: '[20px]' })} />,
  quest: <ScriptText className={css({ width: '[20px]' })} />,
  villain: <Android className={css({ width: '[20px]' })} />,
  epicwin: <Trophy className={css({ width: '[20px]' })} />,
} as const satisfies Record<EntityType, ReactNode>;

export const IconImpl = {
  powerup: Zap,
  quest: ScriptText,
  villain: Android,
  epicwin: Trophy,
} as const satisfies Record<EntityType, FC>;
