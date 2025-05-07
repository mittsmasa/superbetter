'server-only';

import { eq } from 'drizzle-orm';
import { union } from 'drizzle-orm/mysql-core';
import { db } from '@/db/client';
import { powerups, quests, villains } from '@/db/schema/superbetter';
import type { Result } from '../../_actions/types/result';
import * as entities from './entities';

export const createInitialEntity = async (
  userId: string,
): Promise<Result<undefined, { type: 'unknown'; message: string }>> => {
  try {
    const entityCount = await union(
      db.select().from(quests).where(eq(quests.userId, userId)).limit(1),
      db.select().from(powerups).where(eq(powerups.userId, userId)).limit(1),
      db.select().from(villains).where(eq(villains.userId, userId)).limit(1),
    );
    if (entityCount.length > 0) {
      return {
        type: 'ok',
        data: undefined,
      };
    }

    await db
      .insert(quests)
      .values(entities.quests.map((q) => ({ userId, ...q })));
    await db
      .insert(powerups)
      .values(entities.powerups.map((p) => ({ userId, ...p })));

    return {
      type: 'ok',
      data: undefined,
    };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: {
        type: 'unknown',
        message: 'エラーが発生しました',
      },
    };
  }
};
