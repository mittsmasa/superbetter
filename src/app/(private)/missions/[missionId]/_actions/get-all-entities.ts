import 'server-only';

import { getPowerups } from '@/app/(private)/_actions/get-powerup';
import { getQuests } from '@/app/(private)/_actions/get-quest';
import { getVillains } from '@/app/(private)/_actions/get-villain';

export type AllEntities = Awaited<ReturnType<typeof getAllEntities>>;

export const getAllEntities = async () => {
  const LIMIT = 5;
  const powerups = await getPowerups({ limit: LIMIT });
  const quests = await getQuests({ limit: LIMIT });
  const villains = await getVillains({ limit: LIMIT });
  if (powerups.type === 'error') {
    throw new Error(powerups.error.message);
  }
  if (quests.type === 'error') {
    throw new Error(quests.error.message);
  }
  if (villains.type === 'error') {
    throw new Error(villains.error.message);
  }
  return {
    LIMIT,
    powerups: powerups.data,
    quests: quests.data,
    villains: villains.data,
  };
};
