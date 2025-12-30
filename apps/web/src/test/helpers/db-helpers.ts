import { eq } from 'drizzle-orm';
import { db } from '@/db/client';
import { user } from '@/db/schema/auth';
import { powerups, quests, villains } from '@/db/schema/superbetter';

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
