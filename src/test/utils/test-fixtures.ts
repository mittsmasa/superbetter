import { addDays } from 'date-fns';
import { test as base } from 'vitest';
import { users } from '@/db/schema/auth';
import {
  epicwinHistories,
  epicwins,
  missionConditions,
  missions,
  powerupHistories,
  powerups,
  questHistories,
  quests,
  villainHistories,
  villains,
} from '@/db/schema/superbetter';
import { createTestDatabase } from './test-db';

export interface TestContext {
  testDb: Awaited<ReturnType<typeof createTestDatabase>>;
  testUser: { id: string; email: string };
  seedData: {
    powerups: Array<{ id: number; title: string }>;
    quests: Array<{ id: number; title: string }>;
    villains: Array<{ id: number; title: string }>;
    epicwins: Array<{ id: number; title: string }>;
    missions: Array<{ id: string; deadline: Date }>;
  };
}

export const test = base.extend<TestContext>({
  testDb: async ({ task: _ }, use) => {
    const testDb = await createTestDatabase();
    await use(testDb);
    await testDb.close();
  },
  // テストユーザーを作成（task.idでユニーク）
  testUser: async ({ task, testDb }, use) => {
    const { db } = testDb;
    const uniqueId = task.id.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8);
    const testUser = {
      id: `user-${uniqueId}`,
      email: `test-${uniqueId}@example.com`,
    };

    await db.insert(users).values({
      id: testUser.id,
      email: testUser.email,
      emailVerified: new Date(),
    });

    await use(testUser);
  },

  // シードデータを作成（必要な時のみ実行）
  seedData: async ({ testDb, testUser, task }, use) => {
    const uniqueId = task.id.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8);
    const baseDate = new Date('2025-01-01');
    const { db } = testDb;

    // PowerUps
    const powerupData = [
      { title: `テストパワーアップ1-${uniqueId}`, userId: testUser.id },
      { title: `テストパワーアップ2-${uniqueId}`, userId: testUser.id },
    ];
    const powerup = await db
      .insert(powerups)
      .values(powerupData)
      .$returningId();

    // PowerUp履歴
    await db.insert(powerupHistories).values([
      { powerupId: powerup[0].id, createdAt: baseDate },
      { powerupId: powerup[1].id, createdAt: addDays(baseDate, 1) },
    ]);

    // Quests
    const questData = [
      { title: `テストクエスト1-${uniqueId}`, userId: testUser.id },
      { title: `テストクエスト2-${uniqueId}`, userId: testUser.id },
    ];

    const quest = await db.insert(quests).values(questData).$returningId();

    // Quest履歴
    await db.insert(questHistories).values([
      { questId: quest[0].id, createdAt: baseDate },
      { questId: quest[1].id, createdAt: addDays(baseDate, 2) },
    ]);

    // Villains
    const villainData = [
      { title: `テストヴィラン1-${uniqueId}`, userId: testUser.id },
    ];
    const villain = await db
      .insert(villains)
      .values(villainData)
      .$returningId();

    // Villain履歴
    await db
      .insert(villainHistories)
      .values([{ villainId: villain[0].id, createdAt: addDays(baseDate, 1) }]);

    // Epic Wins
    const epicwinData = [
      {
        title: `テストエピックウィン1-${uniqueId}`,
        userId: testUser.id,
      },
    ];

    const epicwin = await db
      .insert(epicwins)
      .values(epicwinData)
      .$returningId();

    // Epic Win履歴
    await db
      .insert(epicwinHistories)
      .values([{ epicwinId: epicwin[0].id, createdAt: addDays(baseDate, 3) }]);

    // Missions
    const missionData = [
      {
        id: `mission-${uniqueId}-1`,
        userId: testUser.id,
        type: 'system-daily' as const,
        deadline: baseDate,
        title: `デイリーミッション-${uniqueId}`,
      },
    ];
    await db.insert(missions).values(missionData);

    // Mission Conditions
    await db.insert(missionConditions).values([
      {
        missionId: missionData[0].id,
        conditionType: 'any' as const,
        itemType: 'powerup' as const,
        itemId: '1',
        completed: true,
      },
    ]);

    const seedData = {
      powerups: powerupData.map((p, i) => ({ id: i + 1, title: p.title })),
      quests: questData.map((q, i) => ({ id: i + 3, title: q.title })),
      villains: villainData.map((v, i) => ({ id: i + 5, title: v.title })),
      epicwins: epicwinData.map((e, i) => ({ id: i + 6, title: e.title })),
      missions: missionData.map((m) => ({
        id: m.id,
        deadline: m.deadline ?? new Date(),
      })),
    };

    await use(seedData);
  },
});
