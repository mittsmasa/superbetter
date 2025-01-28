'use server';

import { getUser } from '@/app/_actions/get-user';
import type { Result } from '@/app/_actions/types/result';
import { db } from '@/db/client';
import { villains } from '@/db/schema/superbetter';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const editVillain = async (args: {
  villainId: string;
  name: string;
  description?: string | null;
}): Promise<Result<undefined, { type: 'unknown'; message: string }>> => {
  const user = await getUser();
  try {
    await db
      .update(villains)
      .set({
        title: args.name,
        description: args.description,
      })
      .where(
        and(eq(villains.id, args.villainId), eq(villains.userId, user.id)),
      );
    revalidatePath('/villains/[id]', 'page');
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
  return { type: 'ok', data: undefined };
};
