'use server';

import { getUser } from '@/app/_actions/get-user';
import type { Result } from '@/app/_actions/types/result';
import { eq } from 'drizzle-orm';
import { db } from '../../../../db/client';
import type { powerups } from '../../../../db/schema/superbetter';

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
