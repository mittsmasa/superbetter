'use server';

import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getUser } from '@/app/(private)/_actions/get-user';
import type { Result } from '@/app/(private)/_actions/types/result';
import { db } from '@/db/client';
import { villains } from '@/db/schema/superbetter';

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
        description: args.description,
        title: args.name,
      })
      .where(
        and(eq(villains.id, args.villainId), eq(villains.userId, user.id)),
      );
    revalidatePath('/villains/[id]', 'page');
  } catch (e) {
    console.error(e);
    return {
      error: { message: 'unknown error', type: 'unknown' },
      type: 'error',
    };
  }
  return { data: undefined, type: 'ok' };
};
