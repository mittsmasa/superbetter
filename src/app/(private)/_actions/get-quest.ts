import 'server-only';

import { and, asc, desc, eq } from 'drizzle-orm';
import { getUser } from '@/app/(private)/_actions/get-user';
import type { Result } from '@/app/(private)/_actions/types/result';
import { db } from '@/db/client';
import { quests } from '@/db/schema/superbetter';

export const getQuests = async (ops?: {
  limit: number;
}): Promise<
  Result<
    { records: (typeof quests.$inferSelect)[]; count: number },
    { type: 'unknown'; message: string }
  >
> => {
  const user = await getUser();
  try {
    const qs = await db.query.quests.findMany({
      limit: ops?.limit,
      orderBy: [asc(quests.order), desc(quests.createdAt)],
      where: (quest) =>
        and(eq(quest.userId, user.id), eq(quest.archived, false)),
    });
    const qCount = await db.$count(quests);
    return { data: { count: qCount, records: qs }, type: 'ok' };
  } catch (e) {
    console.error(e);
    return {
      error: { message: 'unknown error', type: 'unknown' },
      type: 'error',
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
        error: { message: 'specific id not found.', type: 'not-found' },
        type: 'error',
      };
    }
    return { data: q, type: 'ok' };
  } catch (e) {
    console.error(e);
    return {
      error: { message: 'unknown error', type: 'unknown' },
      type: 'error',
    };
  }
};
