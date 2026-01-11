import 'server-only';

import { eq, min } from 'drizzle-orm';
import { db } from '@/db/client';
import {
  epicwinHistories,
  epicwins,
  powerupHistories,
  powerups,
  questHistories,
  quests,
  villainHistories,
  villains,
} from '@/db/schema/superbetter';

export const getOldestHistoryDate = async (
  userId: string,
): Promise<Date | null> => {
  const [powerupMin, questMin, villainMin, epicwinMin] = await Promise.all([
    db
      .select({ minDate: min(powerupHistories.createdAt) })
      .from(powerupHistories)
      .innerJoin(powerups, eq(powerupHistories.powerupId, powerups.id))
      .where(eq(powerups.userId, userId)),
    db
      .select({ minDate: min(questHistories.createdAt) })
      .from(questHistories)
      .innerJoin(quests, eq(questHistories.questId, quests.id))
      .where(eq(quests.userId, userId)),
    db
      .select({ minDate: min(villainHistories.createdAt) })
      .from(villainHistories)
      .innerJoin(villains, eq(villainHistories.villainId, villains.id))
      .where(eq(villains.userId, userId)),
    db
      .select({ minDate: min(epicwinHistories.createdAt) })
      .from(epicwinHistories)
      .innerJoin(epicwins, eq(epicwinHistories.epicwinId, epicwins.id))
      .where(eq(epicwins.userId, userId)),
  ]);

  const dates = [
    powerupMin[0]?.minDate,
    questMin[0]?.minDate,
    villainMin[0]?.minDate,
    epicwinMin[0]?.minDate,
  ].filter((d): d is Date => d !== null);

  if (dates.length === 0) return null;
  return new Date(Math.min(...dates.map((d) => d.getTime())));
};
