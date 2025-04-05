import 'server-only';

import { and, asc, desc, eq } from 'drizzle-orm';
import { getUser } from '@/app/(private)/_actions/get-user';
import type { Result } from '@/app/(private)/_actions/types/result';
import { db } from '@/db/client';
import { powerups } from '@/db/schema/superbetter';

export const getPowerups = async (ops?: {
  limit: number;
}): Promise<
  Result<
    { records: (typeof powerups.$inferSelect)[]; count: number },
    { type: 'unknown'; message: string }
  >
> => {
  const user = await getUser();
  try {
    const pups = await db.query.powerups.findMany({
      where: (powerup) =>
        and(eq(powerup.userId, user.id), eq(powerup.archived, false)),
      orderBy: [asc(powerups.order), desc(powerups.createdAt)],
      limit: ops?.limit,
    });
    const pupCount = await db.$count(powerups);
    return { type: 'ok', data: { records: pups, count: pupCount } };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
};

export const getPowerup = async (
  powerupId: string,
): Promise<
  Result<
    typeof powerups.$inferSelect,
    { type: 'not-found' | 'unknown'; message: string }
  >
> => {
  const user = await getUser();
  try {
    const pup = await db.query.powerups.findFirst({
      where: (powerup) => eq(powerup.id, powerupId),
    });

    if (!pup) {
      return {
        type: 'error',
        error: { type: 'not-found', message: 'specific id not found.' },
      };
    }
    return { type: 'ok', data: pup };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
};
