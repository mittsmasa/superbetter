'use server';

import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getUser } from '@/app/(private)/_actions/get-user';
import type { Result } from '@/app/(private)/_actions/types/result';
import { db } from '@/db/client';
import { villains } from '@/db/schema/superbetter';

export const archiveVillain = async (args: {
  id: string;
}): Promise<Result<undefined, { type: 'unknown'; message: string }>> => {
  const user = await getUser();
  try {
    await db
      .update(villains)
      .set({ archived: true })
      .where(and(eq(villains.id, args.id), eq(villains.userId, user.id)));
    revalidatePath('/villains');
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
  return { type: 'ok', data: undefined };
};
