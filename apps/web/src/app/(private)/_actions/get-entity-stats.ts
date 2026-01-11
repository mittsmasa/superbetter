import 'server-only';

import {
  addDays,
  differenceInDays,
  endOfDay,
  getDay,
  startOfDay,
} from 'date-fns';
import { and, between, count, desc, eq } from 'drizzle-orm';
import { db } from '@/db/client';
import {
  powerupHistories,
  questHistories,
  villainHistories,
} from '@/db/schema/superbetter';
import { fixToUTC, getTZDate } from '@/utils/date';
import type { Result } from './types/result';

export type EntityStats = {
  weeklyCount: number;
  daysSinceCreation: number;
  lastExecutedAt: Date | null;
};

type EntityType = 'quest' | 'powerup' | 'villain';

export const getEntityStats = async (
  entityType: EntityType,
  entityId: string,
  createdAt: Date,
): Promise<Result<EntityStats, { type: 'unknown'; message: string }>> => {
  const now = getTZDate(new Date());

  // 今週の期間を計算（月曜〜日曜）
  const day = getDay(now);
  const distanceToMonday = day === 0 ? 6 : day - 1;
  const mondayStart = fixToUTC(startOfDay(addDays(now, -distanceToMonday)));
  const sundayEnd = fixToUTC(endOfDay(addDays(now, -distanceToMonday + 6)));

  try {
    // エンティティタイプに応じたヒストリーテーブルと外部キーカラムを選択
    const { historyTable, foreignKeyColumn } = getHistoryTableInfo(entityType);

    // 今週の消化回数を取得
    const [weeklyResult] = await db
      .select({ count: count() })
      .from(historyTable)
      .where(
        and(
          eq(foreignKeyColumn, entityId),
          between(historyTable.createdAt, mondayStart, sundayEnd),
        ),
      );

    // 最終消化日を取得
    const lastHistory = await db
      .select({ createdAt: historyTable.createdAt })
      .from(historyTable)
      .where(eq(foreignKeyColumn, entityId))
      .orderBy(desc(historyTable.createdAt))
      .limit(1);

    // 作成日からの経過日数
    const daysSinceCreation = differenceInDays(now, createdAt);

    return {
      type: 'ok',
      data: {
        weeklyCount: weeklyResult?.count ?? 0,
        daysSinceCreation,
        lastExecutedAt: lastHistory[0]?.createdAt ?? null,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
};

const getHistoryTableInfo = (entityType: EntityType) => {
  switch (entityType) {
    case 'quest':
      return {
        historyTable: questHistories,
        foreignKeyColumn: questHistories.questId,
      };
    case 'powerup':
      return {
        historyTable: powerupHistories,
        foreignKeyColumn: powerupHistories.powerupId,
      };
    case 'villain':
      return {
        historyTable: villainHistories,
        foreignKeyColumn: villainHistories.villainId,
      };
  }
};
