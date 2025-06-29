import 'server-only';

import { and, asc, desc, eq } from 'drizzle-orm';
import { getUser } from '@/app/(private)/_actions/get-user';
import type { Result } from '@/app/(private)/_actions/types/result';
import { db } from '@/db/client';
import { villains } from '@/db/schema/superbetter';

export const getVillains = async (ops?: {
  limit: number;
}): Promise<
  Result<
    { records: (typeof villains.$inferSelect)[]; count: number },
    { type: 'unknown'; message: string }
  >
> => {
  const user = await getUser();
  try {
    const vs = await db.query.villains.findMany({
      limit: ops?.limit,
      orderBy: [asc(villains.order), desc(villains.createdAt)],
      where: (villain) =>
        and(eq(villain.userId, user.id), eq(villain.archived, false)),
    });
    const vCount = await db.$count(villains);
    return { data: { count: vCount, records: vs }, type: 'ok' };
  } catch (e) {
    console.error(e);
    return {
      error: { message: 'unknown error', type: 'unknown' },
      type: 'error',
    };
  }
};

export const getVillain = async (
  villainId: string,
): Promise<
  Result<
    typeof villains.$inferSelect,
    { type: 'not-found' | 'unknown'; message: string }
  >
> => {
  const user = await getUser();
  try {
    const v = await db.query.villains.findFirst({
      where: (villain) => eq(villain.id, villainId),
    });

    if (!v) {
      return {
        error: { message: 'specific id not found.', type: 'not-found' },
        type: 'error',
      };
    }
    return { data: v, type: 'ok' };
  } catch (e) {
    console.error(e);
    return {
      error: { message: 'unknown error', type: 'unknown' },
      type: 'error',
    };
  }
};
