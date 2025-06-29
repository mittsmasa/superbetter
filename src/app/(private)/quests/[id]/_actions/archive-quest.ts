'use server';

import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getUser } from '@/app/(private)/_actions/get-user';
import type { Result } from '@/app/(private)/_actions/types/result';
import { db } from '@/db/client';
import { quests } from '@/db/schema/superbetter';

export const archiveQuest = async (args: {
  id: string;
}): Promise<Result<undefined, { type: 'unknown'; message: string }>> => {
  const user = await getUser();
  try {
    await db
      .update(quests)
      .set({ archived: true })
      .where(and(eq(quests.id, args.id), eq(quests.userId, user.id)));
    revalidatePath('/quests');
  } catch (e) {
    console.error(e);
    return {
      error: { message: 'unknown error', type: 'unknown' },
      type: 'error',
    };
  }
  return { data: undefined, type: 'ok' };
};
