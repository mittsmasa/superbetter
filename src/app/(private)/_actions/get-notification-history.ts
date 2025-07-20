import 'server-only';

import { desc, eq } from 'drizzle-orm';
import { cache } from 'react';
import { db } from '@/db/client';
import { notificationHistories } from '@/db/schema/superbetter';
import { getUser } from './get-user';
import type { Result } from './types/result';

export const getNotificationHistory = cache(
  async (
    limit = 50,
  ): Promise<
    Result<
      (typeof notificationHistories.$inferSelect)[],
      { type: 'unknown'; message: string }
    >
  > => {
    try {
      const user = await getUser();

      const history = await db
        .select()
        .from(notificationHistories)
        .where(eq(notificationHistories.userId, user.id))
        .orderBy(desc(notificationHistories.sentAt))
        .limit(limit);

      return { type: 'ok', data: history };
    } catch (e) {
      console.error(e);
      return {
        type: 'error',
        error: { type: 'unknown', message: 'unknown error' },
      };
    }
  },
);
