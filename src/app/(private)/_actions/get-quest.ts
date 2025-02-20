import 'server-only';

import { getUser } from '@/app/(private)/_actions/get-user';
import type { Result } from '@/app/(private)/_actions/types/result';
import { db } from '@/db/client';
import { quests } from '@/db/schema/superbetter';
import { asc, desc, eq } from 'drizzle-orm';

export const getQuests = async (ops?: { limit: number }): Promise<
  Result<
    { records: (typeof quests.$inferSelect)[]; count: number },
    { type: 'unknown'; message: string }
  >
> => {
  const user = await getUser();
  try {
    const qs = await db.query.quests.findMany({
      where: (quest) => eq(quest.userId, user.id),
      orderBy: [asc(quests.order), desc(quests.createdAt)],
      limit: ops?.limit,
    });
    const qCount = await db.$count(quests);
    return { type: 'ok', data: { records: qs, count: qCount } };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
};

export const getQuest = async (
  questId: string,
): Promise<
  Result<
    typeof quests.$inferSelect,
    { type: 'not-found' | 'unknown'; message: string }
  >
> => {
  const user = await getUser();
  try {
    const q = await db.query.quests.findFirst({
      where: (quest) => eq(quest.id, questId),
    });

    if (!q) {
      return {
        type: 'error',
        error: { type: 'not-found', message: 'specific id not found.' },
      };
    }
    return { type: 'ok', data: q };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
};
