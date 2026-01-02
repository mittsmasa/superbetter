import type { FC, ReactNode } from 'react';
import { Android, ScriptText, Trophy, Zap } from '@/assets/icons';
import type { EntityType } from '@/types/superbetter';

export const IconMap = {
  powerup: <Zap size={20} />,
  quest: <ScriptText size={20} />,
  villain: <Android size={20} />,
  epicwin: <Trophy size={20} />,
} as const satisfies Record<EntityType, ReactNode>;

export const IconImpl = {
  powerup: Zap,
  quest: ScriptText,
  villain: Android,
  epicwin: Trophy,
} as const satisfies Record<EntityType, FC>;
