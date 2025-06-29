'use server';

import { revalidatePath } from 'next/cache';
import { getUser } from '@/app/(private)/_actions/get-user';
import type { Result } from '@/app/(private)/_actions/types/result';
import { db } from '@/db/client';
import { villains } from '@/db/schema/superbetter';

export const postVillain = async (args: {
  name: string;
  description?: string | null;
}): Promise<Result<undefined, { type: 'unknown'; message: string }>> => {
  const user = await getUser();
  try {
    await db.insert(villains).values({
      description: args.description,
      title: args.name,
      userId: user.id,
    });
    revalidatePath('/villains');
  } catch (e) {
    console.error(e);
    return {
      error: { message: 'unknown error', type: 'unknown' },
      type: 'error',
    };
  }
  return { data: undefined, type: 'ok' };
};
