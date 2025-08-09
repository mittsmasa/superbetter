'use server';

import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getUser } from '@/app/(private)/_actions/get-user';
import type { Result } from '@/app/(private)/_actions/types/result';
import { db } from '@/db/client';
import { epicwins } from '@/db/schema/superbetter';

export const getEpicWins = async () => {
  const user = await getUser();
  return await db
    .select()
    .from(epicwins)
    .where(eq(epicwins.userId, user.id))
    .orderBy(epicwins.createdAt);
};

export const postEpicWin = async (args: {
  title: string;
  description?: string | null;
}): Promise<Result<undefined, { type: 'unknown'; message: string }>> => {
  const user = await getUser();
  try {
    await db.insert(epicwins).values({
      title: args.title,
      description: args.description,
      userId: user.id,
    });
    revalidatePath('/');
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
  return { type: 'ok', data: undefined };
};

export const updateEpicWin = async (args: {
  id: string;
  title: string;
  description?: string | null;
}): Promise<Result<undefined, { type: 'unknown'; message: string }>> => {
  const user = await getUser();
  try {
    await db
      .update(epicwins)
      .set({
        title: args.title,
        description: args.description,
        updatedAt: new Date(),
      })
      .where(and(eq(epicwins.id, args.id), eq(epicwins.userId, user.id)));
    revalidatePath('/');
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
  return { type: 'ok', data: undefined };
};

export const deleteEpicWin = async (args: {
  id: string;
}): Promise<Result<undefined, { type: 'unknown'; message: string }>> => {
  const user = await getUser();
  try {
    await db
      .delete(epicwins)
      .where(and(eq(epicwins.id, args.id), eq(epicwins.userId, user.id)));
    revalidatePath('/');
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
  return { type: 'ok', data: undefined };
};
