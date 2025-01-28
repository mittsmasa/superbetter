'use server';

import { getUser } from '@/app/_actions/get-user';
import type { Result } from '@/app/_actions/types/result';
import { db } from '@/db/client';
import { quests } from '@/db/schema/superbetter';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const deleteQuest = async (args: {
  id: string;
}): Promise<Result<undefined, { type: 'unknown'; message: string }>> => {
  const user = await getUser();
  try {
    await db
      .delete(quests)
      .where(and(eq(quests.id, args.id), eq(quests.userId, user.id)));
    revalidatePath('/quests');
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
  return { type: 'ok', data: undefined };
};
