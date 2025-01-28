'use server';

import { getUser } from '@/app/_actions/get-user';
import type { Result } from '@/app/_actions/types/result';
import { db } from '@/db/client';
import { quests } from '@/db/schema/superbetter';
import { revalidatePath } from 'next/cache';

export const postQuest = async (args: {
  name: string;
  description?: string | null;
}): Promise<Result<undefined, { type: 'unknown'; message: string }>> => {
  const user = await getUser();
  try {
    await db.insert(quests).values({
      title: args.name,
      description: args.description,
      userId: user.id,
    });
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
