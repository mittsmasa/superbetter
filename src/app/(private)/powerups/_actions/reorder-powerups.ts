'use server';

import { inArray, type SQL, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '@/db/client';
import { powerups } from '@/db/schema/superbetter';
import { getUser } from '../../_actions/get-user';
import type { Result } from '../../_actions/types/result';

export const reorderPowerups = async (
  newOrder: { id: string }[],
): Promise<Result<undefined, { type: 'unknown'; message: string }>> => {
  console.log(newOrder);
  const _user = getUser();
  if (newOrder.length === 0) {
    return { type: 'ok', data: undefined };
  }
  try {
    const chunks: SQL[] = [];
    const ids: string[] = [];

    chunks.push(sql`(case`);
    for (const [index, p] of Object.entries(newOrder)) {
      chunks.push(sql`when ${powerups.id} = ${p.id} then ${index}`);
      ids.push(p.id);
    }
    chunks.push(sql`end)`);
    const finalSql: SQL = sql.join(chunks, sql.raw(' '));

    await db
      .update(powerups)
      .set({ order: finalSql })
      .where(inArray(powerups.id, ids));
    revalidatePath('/powerups', 'page');
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
  return { type: 'ok', data: undefined };
};
