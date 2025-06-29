import { and, between, eq } from 'drizzle-orm';
import { type NextRequest, NextResponse } from 'next/server';
import { getStartAndEndOfDay } from '@/app/_utils/date';
import { db } from '@/db/client';
import { users } from '@/db/schema/auth';
import { missionConditions, missions } from '@/db/schema/superbetter';

/**
 * 認証されたVercel Cronからのみ実行されることを確認する
 */
const validateRequest = (request: NextRequest): boolean => {
  // 環境変数からCronシークレットを取得
  const cronSecret = process.env.CRON_SECRET;
  // シークレットが設定されていない場合はエラー
  if (!cronSecret) {
    console.error('CRON_SECRET environment variable not set');
    return false;
  }

  // リクエストヘッダーからAuthorization値を取得
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    console.error('Missing Authorization header');
    return false;
  }

  // Bearer トークンフォーマットの検証
  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    console.error('Invalid Authorization header format');
    return false;
  }

  // トークンの検証
  if (token !== cronSecret) {
    console.error('Invalid cron token');
    return false;
  }

  return true;
};

/**
 * 特定のユーザーに対してデイリーミッションを作成する
 */
const createDailyMissionForUser = async (userId: string): Promise<void> => {
  const { start: todayStart, end: todayEnd } = getStartAndEndOfDay(new Date());

  try {
    // 既にその日のデイリーミッションが存在するかチェック
    const mission = await db.query.missions.findFirst({
      where: (mission) =>
        and(
          eq(mission.userId, userId),
          eq(mission.type, 'system-daily'),
          between(mission.deadline, todayStart, todayEnd),
        ),
    });

    // 既に存在する場合は作成しない
    if (mission) {
      return;
    }

    // トランザクションでミッションとミッション条件を作成
    await db.transaction(async (tx) => {
      const [{ id }] = await tx
        .insert(missions)
        .values({
          deadline: todayEnd,
          description:
            '秘宝を使い、挑戦を受け、悪を討て\n小さな積み重ねが、真の英雄への道となる',
          title: 'デイリーミッション',
          type: 'system-daily',
          userId,
        })
        .$returningId();

      await tx.insert(missionConditions).values([
        {
          conditionType: 'any',
          itemType: 'powerup',
          missionId: id,
        },
        {
          conditionType: 'any',
          itemType: 'powerup',
          missionId: id,
        },
        {
          conditionType: 'any',
          itemType: 'powerup',
          missionId: id,
        },
        {
          conditionType: 'any',
          itemType: 'quest',
          missionId: id,
        },
        {
          conditionType: 'any',
          itemType: 'villain',
          missionId: id,
        },
      ]);
    });
  } catch (e) {
    console.error(`Failed to create daily mission for user ${userId}:`, e);
  }
};

export async function GET(request: NextRequest) {
  // 認証チェック
  if (!validateRequest(request)) {
    return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 401,
    });
  }

  try {
    // 全ユーザーを取得
    const allUsers = await db.select().from(users);

    // 各ユーザーに対してデイリーミッションを作成
    const results = await Promise.allSettled(
      allUsers.map((user) => createDailyMissionForUser(user.id)),
    );

    // 結果を集計
    const succeeded = results.filter((r) => r.status === 'fulfilled').length;
    const failed = results.filter((r) => r.status === 'rejected').length;

    return NextResponse.json({
      message: `Created daily missions for ${succeeded} users. Failed: ${failed}`,
      success: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error creating daily missions:', error);
    return NextResponse.json(
      { error: 'Failed to create daily missions', success: false },
      { status: 500 },
    );
  }
}
