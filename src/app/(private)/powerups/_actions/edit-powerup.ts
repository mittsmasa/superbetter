'use server';

import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getUser } from '@/app/(private)/_actions/get-user';
import type { Result } from '@/app/(private)/_actions/types/result';
import { db } from '@/db/client';
import { powerups } from '@/db/schema/superbetter';

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
        description: args.description,
        title: args.name,
      })
      .where(
        and(eq(powerups.id, args.powerupId), eq(powerups.userId, user.id)),
      );
    revalidatePath('/powerups/[id]', 'page');
  } catch (e) {
    console.error(e);
    return {
      error: { message: 'unknown error', type: 'unknown' },
      type: 'error',
    };
  }
  return { data: undefined, type: 'ok' };
};
