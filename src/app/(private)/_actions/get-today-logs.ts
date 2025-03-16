import 'server-only';

import { getUser } from '@/app/(private)/_actions/get-user';
import type { Result } from '@/app/(private)/_actions/types/result';
import { getStartAndEndOfDay } from '@/app/_utils/date';
import { db } from '@/db/client';
import {
  powerupHistories,
  powerups,
  questHistories,
  quests,
  villainHistories,
  villains,
} from '@/db/schema/superbetter';
import { and, between, desc, eq } from 'drizzle-orm';
import type { AdventureLog } from './types/adventure-log';

type PickedAdventureLogs = Pick<AdventureLog, 'id' | 'title'>[];

export const getTodayLogs = async (): Promise<
  Result<
    {
      powerups: PickedAdventureLogs;
      quests: PickedAdventureLogs;
      villains: PickedAdventureLogs;
    },
    { type: 'unknown'; message: string }
  >
> => {
  const user = await getUser();

  const { start: todayStart, end: todayEnd } = getStartAndEndOfDay(new Date());

  try {
    const powerupLogs = await db
      .select({
        id: powerupHistories.id,
        title: powerups.title,
      })
      .from(powerupHistories)
      .innerJoin(powerups, eq(powerupHistories.powerupId, powerups.id))
      .where(
        and(
          eq(powerups.userId, user.id),
          between(powerupHistories.createdAt, todayStart, todayEnd),
        ),
      )
      .orderBy(desc(powerupHistories.createdAt));

    const questLogs = await db
      .select({
        id: questHistories.id,
        title: quests.title,
      })
      .from(questHistories)
      .innerJoin(quests, eq(questHistories.questId, quests.id))
      .where(
        and(
          eq(quests.userId, user.id),
          between(questHistories.createdAt, todayStart, todayEnd),
        ),
      )
      .orderBy(desc(questHistories.createdAt));

    const villainLogs = await db
      .select({
        id: villainHistories.id,
        title: villains.title,
      })
      .from(villainHistories)
      .innerJoin(villains, eq(villainHistories.villainId, villains.id))
      .where(
        and(
          eq(villains.userId, user.id),
          between(villainHistories.createdAt, todayStart, todayEnd),
        ),
      )
      .orderBy(desc(villainHistories.createdAt));

    return {
      type: 'ok',
      data: {
        powerups: powerupLogs,
        quests: questLogs,
        villains: villainLogs,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
};
