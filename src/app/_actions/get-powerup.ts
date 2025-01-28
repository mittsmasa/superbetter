import 'server-only';

import { getUser } from '@/app/_actions/get-user';
import type { Result } from '@/app/_actions/types/result';
import { db } from '@/db/client';
import { powerups } from '@/db/schema/superbetter';
import { eq } from 'drizzle-orm';

export const getPowerups = async (ops?: { limit: number }): Promise<
  Result<
    { records: (typeof powerups.$inferSelect)[]; count: number },
    { type: 'unknown'; message: string }
  >
> => {
  const user = await getUser();
  try {
    const pups = await db.query.powerups.findMany({
      where: (powerup) => eq(powerup.userId, user.id),
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
