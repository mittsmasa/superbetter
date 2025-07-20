import 'server-only';

import { eq } from 'drizzle-orm';
import { cache } from 'react';
import { db } from '@/db/client';
import { notificationSettings } from '@/db/schema/superbetter';
import { getUser } from './get-user';
import type { Result } from './types/result';

export const getNotificationSettings = cache(
  async (): Promise<
    Result<typeof notificationSettings.$inferSelect, { type: 'unknown'; message: string }>
  > => {
    try {
      const user = await getUser();
      
      let settings = await db.query.notificationSettings.findFirst({
        where: eq(notificationSettings.userId, user.id),
      });

      // 設定が存在しない場合はデフォルト値で作成
      if (!settings) {
        await db.insert(notificationSettings).values({
          userId: user.id,
          dailyMissionReminder: true,
          reminderTime: '20:00:00',
          enablePushNotifications: false,
        });

        settings = await db.query.notificationSettings.findFirst({
          where: eq(notificationSettings.userId, user.id),
        });
      }

      if (!settings) {
        return {
          type: 'error',
          error: { type: 'unknown', message: 'Failed to create notification settings' },
        };
      }

      return { type: 'ok', data: settings };
    } catch (e) {
      console.error(e);
      return {
        type: 'error',
        error: { type: 'unknown', message: 'unknown error' },
      };
    }
  },
);