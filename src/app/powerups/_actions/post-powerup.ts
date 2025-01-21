'use server';

import { getUser } from '@/app/_actions/get-user';
import type { Result } from '@/app/_actions/types/result';
import { revalidatePath } from 'next/cache';
import { db } from '../../../../db/client';
import { powerups } from '../../../../db/schema/superbetter';

export const postPowerup = async (args: {
  name: string;
  description?: string | null;
}): Promise<Result<undefined, { type: 'unknown'; message: string }>> => {
  const user = await getUser();
  try {
    await db.insert(powerups).values({
      title: args.name,
      description: args.description,
      userId: user.id,
    });
    revalidatePath('/powerups');
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
  return { type: 'ok', data: undefined };
};
