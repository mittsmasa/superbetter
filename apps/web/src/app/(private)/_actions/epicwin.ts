'use server';

import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getUser } from '@/app/(private)/_actions/get-user';
import type { Result } from '@/app/(private)/_actions/types/result';
import { db } from '@/db/client';
import { epicwinHistories, epicwins } from '@/db/schema/superbetter';

export const getEpicWins = async () => {
  const user = await getUser();
  return await db
    .select()
    .from(epicwins)
    .where(and(eq(epicwins.userId, user.id), eq(epicwins.archived, false)))
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

export const getEpicWin = async (args: {
  id: string;
}): Promise<
  Result<
    typeof epicwins.$inferSelect,
    { type: 'not-found' | 'unknown'; message: string }
  >
> => {
  const user = await getUser();
  try {
    const [epicwin] = await db
      .select()
      .from(epicwins)
      .where(and(eq(epicwins.id, args.id), eq(epicwins.userId, user.id)));

    if (!epicwin) {
      return {
        type: 'error',
        error: { type: 'not-found', message: 'Epic Win not found' },
      };
    }

    return { type: 'ok', data: epicwin };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
};

export const executeEpicWin = async (args: {
  id: string;
}): Promise<
  Result<
    undefined,
    { type: 'not-found' | 'already-archived' | 'unknown'; message: string }
  >
> => {
  const user = await getUser();
  try {
    const [epicwin] = await db
      .select()
      .from(epicwins)
      .where(and(eq(epicwins.id, args.id), eq(epicwins.userId, user.id)));

    if (!epicwin) {
      return {
        type: 'error',
        error: { type: 'not-found', message: 'Epic Win not found' },
      };
    }

    if (epicwin.archived) {
      return {
        type: 'error',
        error: {
          type: 'already-archived',
          message: 'Epic Win is already achieved and archived',
        },
      };
    }

    await db.transaction(async (tx) => {
      await tx
        .update(epicwins)
        .set({
          count: epicwin.count + 1,
          archived: true,
          updatedAt: new Date(),
        })
        .where(eq(epicwins.id, args.id));

      await tx.insert(epicwinHistories).values({
        epicwinId: args.id,
      });
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

export const postEpicWinHistory = async (args: {
  epicwinId: string;
}): Promise<
  Result<undefined, { type: 'not-found' | 'unknown'; message: string }>
> => {
  const user = await getUser();
  try {
    const [epicwin] = await db
      .select()
      .from(epicwins)
      .where(
        and(eq(epicwins.id, args.epicwinId), eq(epicwins.userId, user.id)),
      );

    if (!epicwin) {
      return {
        type: 'error',
        error: { type: 'not-found', message: 'Epic Win not found' },
      };
    }

    await db.insert(epicwinHistories).values({
      epicwinId: args.epicwinId,
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
