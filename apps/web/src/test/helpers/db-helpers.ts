import { eq } from 'drizzle-orm';
import { db } from '@/db/client';
import { user } from '@/db/schema/auth';
import {
  epicwinHistories,
  epicwins,
  powerupHistories,
  powerups,
  questHistories,
  quests,
  villainHistories,
  villains,
} from '@/db/schema/superbetter';

export const TEST_USER_EMAIL = 'superbetter@example.com';

/**
 * テストユーザーを取得（シードで作成されたユーザー）
 */
export const getTestUser = async () => {
  const testUser = await db.query.user.findFirst({
    where: eq(user.email, TEST_USER_EMAIL),
  });

  if (!testUser) {
    throw new Error(`Test user not found: ${TEST_USER_EMAIL}`);
  }

  return testUser;
};

/**
 * テスト用Questを作成
 */
export const createTestQuest = async (userId: string, title = 'Test Quest') => {
  const [quest] = await db
    .insert(quests)
    .values({
      userId,
      title,
      description: 'Test Description',
      count: 0,
      archived: false,
      order: 0,
    })
    .$returningId();

  return quest.id;
};

/**
 * テスト用Powerupを作成
 */
export const createTestPowerup = async (
  userId: string,
  title = 'Test Powerup',
) => {
  const [powerup] = await db
    .insert(powerups)
    .values({
      userId,
      title,
      description: 'Test Description',
      count: 0,
      archived: false,
      order: 0,
    })
    .$returningId();

  return powerup.id;
};

/**
 * テスト用Villainを作成
 */
export const createTestVillain = async (
  userId: string,
  title = 'Test Villain',
) => {
  const [villain] = await db
    .insert(villains)
    .values({
      userId,
      title,
      description: 'Test Description',
      count: 0,
      archived: false,
      order: 0,
    })
    .$returningId();

  return villain.id;
};

/**
 * テスト用Epicwinを作成
 */
export const createTestEpicwin = async (
  userId: string,
  title = 'Test Epicwin',
) => {
  const [epicwin] = await db
    .insert(epicwins)
    .values({
      userId,
      title,
      archived: false,
    })
    .$returningId();

  return epicwin.id;
};

/**
 * テスト用PowerupHistoryを作成
 */
export const createTestPowerupHistory = async (
  powerupId: string,
  createdAt?: Date,
) => {
  const [history] = await db
    .insert(powerupHistories)
    .values({
      powerupId,
      createdAt: createdAt ?? new Date(),
    })
    .$returningId();

  return history.id;
};

/**
 * テスト用QuestHistoryを作成
 */
export const createTestQuestHistory = async (
  questId: string,
  createdAt?: Date,
) => {
  const [history] = await db
    .insert(questHistories)
    .values({
      questId,
      createdAt: createdAt ?? new Date(),
    })
    .$returningId();

  return history.id;
};

/**
 * テスト用VillainHistoryを作成
 */
export const createTestVillainHistory = async (
  villainId: string,
  createdAt?: Date,
) => {
  const [history] = await db
    .insert(villainHistories)
    .values({
      villainId,
      createdAt: createdAt ?? new Date(),
    })
    .$returningId();

  return history.id;
};

/**
 * テスト用EpicwinHistoryを作成
 */
export const createTestEpicwinHistory = async (
  epicwinId: string,
  createdAt?: Date,
) => {
  const [history] = await db
    .insert(epicwinHistories)
    .values({
      epicwinId,
      createdAt: createdAt ?? new Date(),
    })
    .$returningId();

  return history.id;
};

/**
 * テスト用エンティティと履歴をクリーンアップ
 */
export const cleanupTestEntities = async (userId: string) => {
  await db.delete(quests).where(eq(quests.userId, userId));
  await db.delete(powerups).where(eq(powerups.userId, userId));
  await db.delete(villains).where(eq(villains.userId, userId));
  await db.delete(epicwins).where(eq(epicwins.userId, userId));
};
