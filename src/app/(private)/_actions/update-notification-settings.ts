import 'server-only';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '@/db/client';
import { notificationSettings } from '@/db/schema/superbetter';
import { getUser } from './get-user';
import type { Result } from './types/result';

interface UpdateNotificationSettingsInput {
  dailyMissionReminder?: boolean;
  reminderTime?: string;
  enablePushNotifications?: boolean;
  pushSubscription?: any;
}

export async function updateNotificationSettings(
  input: UpdateNotificationSettingsInput
): Promise<
  Result<undefined, { type: 'unknown' | 'validation'; message: string }>
> {
  try {
    const user = await getUser();

    // 時間形式の検証
    if (input.reminderTime) {
      const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
      if (!timeRegex.test(input.reminderTime)) {
        return {
          type: 'error',
          error: { type: 'validation', message: '時間の形式が正しくありません (HH:MM:SS)' },
        };
      }
    }

    // 設定が存在するかチェック
    const existingSettings = await db.query.notificationSettings.findFirst({
      where: eq(notificationSettings.userId, user.id),
    });

    if (!existingSettings) {
      // 新規作成
      await db.insert(notificationSettings).values({
        userId: user.id,
        dailyMissionReminder: input.dailyMissionReminder ?? true,
        reminderTime: input.reminderTime ?? '20:00:00',
        enablePushNotifications: input.enablePushNotifications ?? false,
        pushSubscription: input.pushSubscription,
      });
    } else {
      // 更新
      const updateData: Partial<typeof notificationSettings.$inferInsert> = {};
      
      if (input.dailyMissionReminder !== undefined) {
        updateData.dailyMissionReminder = input.dailyMissionReminder;
      }
      if (input.reminderTime !== undefined) {
        updateData.reminderTime = input.reminderTime;
      }
      if (input.enablePushNotifications !== undefined) {
        updateData.enablePushNotifications = input.enablePushNotifications;
      }
      if (input.pushSubscription !== undefined) {
        updateData.pushSubscription = input.pushSubscription;
      }

      updateData.updatedAt = new Date();

      await db
        .update(notificationSettings)
        .set(updateData)
        .where(eq(notificationSettings.userId, user.id));
    }

    revalidatePath('/me');
    
    return { type: 'ok', data: undefined };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
}