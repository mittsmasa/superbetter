'use server';

import { revalidatePath } from 'next/cache';
import { postPowerupHistory } from '@/app/(private)/_actions/post-powerup-history';
import { postQuestHistory } from '@/app/(private)/_actions/post-quest-history';
import { postVillainHistory } from '@/app/(private)/_actions/post-villain-history';
import type { EntityType } from '@/db/types/mission';

export const postEntityHistory = async (entity: {
  type: EntityType;
  id: string;
}) => {
  if (entity.type === 'powerup') {
    await postPowerupHistory(entity.id);
  } else if (entity.type === 'quest') {
    await postQuestHistory(entity.id);
  } else if (entity.type === 'villain') {
    await postVillainHistory(entity.id);
  }
  revalidatePath('/missions/[missionId]', 'page');
};
