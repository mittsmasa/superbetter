'use server';

import { getUser } from '@/app/_actions/get-user';
import type { Result } from '@/app/_actions/types/result';
import { db } from '@/db/client';
import { powerups } from '@/db/schema/superbetter';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const editPowerup = async (args: {
  powerupId: string;
  name: string;
  description?: string | null;
}): Promise<Result<undefined, { type: 'unknown'; message: string }>> => {
  const user = await getUser();
  try {
    await db
      .update(powerups)
      .set({
        title: args.name,
        description: args.description,
      })
      .where(
        and(eq(powerups.id, args.powerupId), eq(powerups.userId, user.id)),
      );
    revalidatePath('/powerups/[id]', 'page');
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
  return { type: 'ok', data: undefined };
};
