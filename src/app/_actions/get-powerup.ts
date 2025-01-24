'use server';

import { getUser } from '@/app/_actions/get-user';
import type { Result } from '@/app/_actions/types/result';
import { eq } from 'drizzle-orm';
import { db } from '../../../db/client';
import type { powerups } from '../../../db/schema/superbetter';

export const getPowerups = async (): Promise<
  Result<(typeof powerups.$inferSelect)[], { type: 'unknown'; message: string }>
> => {
  const user = await getUser();
  try {
    const pups = await db.query.powerups.findMany({
      where: (powerup) => eq(powerup.userId, user.id),
    });
    return { type: 'ok', data: pups };
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
