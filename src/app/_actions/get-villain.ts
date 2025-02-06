import 'server-only';

import { getUser } from '@/app/_actions/get-user';
import type { Result } from '@/app/_actions/types/result';
import { db } from '@/db/client';
import { villains } from '@/db/schema/superbetter';
import { desc, eq } from 'drizzle-orm';

export const getVillains = async (ops?: { limit: number }): Promise<
  Result<
    { records: (typeof villains.$inferSelect)[]; count: number },
    { type: 'unknown'; message: string }
  >
> => {
  const user = await getUser();
  try {
    const vs = await db.query.villains.findMany({
      where: (villain) => eq(villain.userId, user.id),
      orderBy: [desc(villains.createdAt)],
      limit: ops?.limit,
    });
    const vCount = await db.$count(villains);
    return { type: 'ok', data: { records: vs, count: vCount } };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
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
        type: 'error',
        error: { type: 'not-found', message: 'specific id not found.' },
      };
    }
    return { type: 'ok', data: v };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
};
