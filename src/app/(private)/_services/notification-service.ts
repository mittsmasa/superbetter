import 'server-only';

import { and, count, eq, gte, lt, sql } from 'drizzle-orm';
import { db } from '@/db/client';
import { 
  missions, 
  missionConditions, 
  notificationSettings, 
  notificationHistories 
} from '@/db/schema/superbetter';
import { users } from '@/db/schema/auth';
import { getStartAndEndOfDay } from '@/app/_utils/date';

export interface NotificationTrigger {
  consecutiveMissedDays: number;
  recentCompletionRate: number;
  lastNotificationDate: Date | null;
}

export interface NotificationCandidate {
  userId: string;
  email: string;
  dailyMissionReminder: boolean;
  reminderTime: string;
  missedDays: number;
  lastNotificationDate: Date | null;
}

/**
 * デイリーミッション未達成の通知対象ユーザーを取得
 */
export async function getNotificationCandidates(): Promise<NotificationCandidate[]> {
  const today = new Date();
  const { start: todayStart, end: todayEnd } = getStartAndEndOfDay(today);
  
  // 昨日の日付を取得
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const { start: yesterdayStart, end: yesterdayEnd } = getStartAndEndOfDay(yesterday);

  try {
    // 通知設定が有効で、昨日のデイリーミッションが未完了のユーザーを取得
    const candidates = await db
      .select({
        userId: users.id,
        email: users.email,
        dailyMissionReminder: notificationSettings.dailyMissionReminder,
        reminderTime: notificationSettings.reminderTime,
        lastNotificationDate: sql<Date | null>`(
          SELECT MAX(sentAt) 
          FROM ${notificationHistories} 
          WHERE ${notificationHistories.userId} = ${users.id} 
          AND ${notificationHistories.type} = 'daily_mission_reminder'
        )`,
      })
      .from(users)
      .leftJoin(notificationSettings, eq(users.id, notificationSettings.userId))
      .where(
        and(
          eq(notificationSettings.dailyMissionReminder, true),
          // 昨日のデイリーミッションが存在する
          sql`EXISTS (
            SELECT 1 FROM ${missions} 
            WHERE ${missions.userId} = ${users.id} 
            AND ${missions.type} = 'system-daily'
            AND ${missions.deadline} BETWEEN ${yesterdayStart} AND ${yesterdayEnd}
          )`,
          // 昨日のデイリーミッションが未完了
          sql`NOT EXISTS (
            SELECT 1 FROM ${missions} m
            INNER JOIN ${missionConditions} mc ON m.id = mc.missionId
            WHERE m.userId = ${users.id} 
            AND m.type = 'system-daily'
            AND m.deadline BETWEEN ${yesterdayStart} AND ${yesterdayEnd}
            GROUP BY m.id
            HAVING COUNT(mc.id) = COUNT(CASE WHEN mc.completed = true THEN 1 END)
          )`
        )
      );

    // 各ユーザーの連続未達成日数を計算
    const candidatesWithMissedDays = await Promise.all(
      candidates.map(async (candidate) => {
        const missedDays = await calculateConsecutiveMissedDays(candidate.userId);
        return {
          ...candidate,
          missedDays,
        };
      })
    );

    return candidatesWithMissedDays;
  } catch (error) {
    console.error('Error getting notification candidates:', error);
    return [];
  }
}

/**
 * 連続未達成日数を計算
 */
async function calculateConsecutiveMissedDays(userId: string): Promise<number> {
  let missedDays = 0;
  const today = new Date();

  // 過去30日間をチェック（上限設定）
  for (let i = 1; i <= 30; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - i);
    const { start, end } = getStartAndEndOfDay(checkDate);

    try {
      // その日のデイリーミッションが存在するかチェック
      const missionExists = await db.query.missions.findFirst({
        where: and(
          eq(missions.userId, userId),
          eq(missions.type, 'system-daily'),
          gte(missions.deadline, start),
          lt(missions.deadline, end)
        ),
      });

      if (!missionExists) {
        // ミッション自体が存在しない場合はスキップ
        continue;
      }

      // ミッションが完了しているかチェック
      const missionCompleted = await db
        .select({ 
          totalConditions: count(missionConditions.id),
          completedConditions: count(sql`CASE WHEN ${missionConditions.completed} = true THEN 1 END`)
        })
        .from(missions)
        .innerJoin(missionConditions, eq(missions.id, missionConditions.missionId))
        .where(
          and(
            eq(missions.userId, userId),
            eq(missions.type, 'system-daily'),
            gte(missions.deadline, start),
            lt(missions.deadline, end)
          )
        )
        .groupBy(missions.id);

      if (missionCompleted.length === 0) {
        missedDays++;
        continue;
      }

      const { totalConditions, completedConditions } = missionCompleted[0];
      
      if (totalConditions !== completedConditions) {
        // 未完了
        missedDays++;
      } else {
        // 完了している場合は連続カウント終了
        break;
      }
    } catch (error) {
      console.error(`Error checking mission for date ${checkDate}:`, error);
      break;
    }
  }

  return missedDays;
}

/**
 * 通知を送信すべきかどうかを判定
 */
export function shouldSendNotification(candidate: NotificationCandidate): boolean {
  // 2日連続未達成の場合
  if (candidate.missedDays >= 2) {
    // 最後の通知から24時間経過している場合
    if (!candidate.lastNotificationDate) {
      return true;
    }
    
    const now = new Date();
    const hoursSinceLastNotification = 
      (now.getTime() - candidate.lastNotificationDate.getTime()) / (1000 * 60 * 60);
    
    return hoursSinceLastNotification >= 24;
  }

  return false;
}

/**
 * 通知を送信して履歴に記録
 */
export async function sendNotificationAndRecord(
  userId: string,
  message: string,
  type: 'daily_mission_reminder' | 'missed_streak' | 'achievement_unlock' = 'daily_mission_reminder'
): Promise<void> {
  try {
    // 通知履歴に記録
    await db.insert(notificationHistories).values({
      userId,
      type,
      message,
      sentAt: new Date(),
      isRead: false,
    });

    // 実際の通知送信（ここではブラウザ通知APIを使用）
    // 本格的な実装では、Web Push APIやメール通知なども対応
    console.log(`Notification sent to user ${userId}: ${message}`);
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
}

/**
 * デイリーミッション通知のメイン処理
 */
export async function processDailyMissionNotifications(): Promise<void> {
  try {
    const candidates = await getNotificationCandidates();
    
    for (const candidate of candidates) {
      if (shouldSendNotification(candidate)) {
        const message = candidate.missedDays >= 7 
          ? `もう${candidate.missedDays}日もデイリーミッションをお休みしています。少しずつでも英雄への道を歩み続けませんか？`
          : `${candidate.missedDays}日連続でデイリーミッションが未達成です。今日こそは挑戦してみませんか？`;
        
        await sendNotificationAndRecord(
          candidate.userId,
          message,
          candidate.missedDays >= 7 ? 'missed_streak' : 'daily_mission_reminder'
        );
      }
    }
  } catch (error) {
    console.error('Error processing daily mission notifications:', error);
    throw error;
  }
}

/**
 * ユーザーの通知設定を取得または作成
 */
export async function getOrCreateNotificationSettings(userId: string) {
  try {
    let settings = await db.query.notificationSettings.findFirst({
      where: eq(notificationSettings.userId, userId),
    });

    if (!settings) {
      // デフォルト設定で作成
      await db.insert(notificationSettings).values({
        userId,
        dailyMissionReminder: true,
        reminderTime: '20:00:00',
        enablePushNotifications: false,
      });

      settings = await db.query.notificationSettings.findFirst({
        where: eq(notificationSettings.userId, userId),
      });
    }

    return settings;
  } catch (error) {
    console.error('Error getting or creating notification settings:', error);
    throw error;
  }
}