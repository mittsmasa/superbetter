/**
 * SuperBetter共通型定義
 *
 * このファイルには、クライアントコンポーネントとサーバーアクションで共有される型を定義します。
 * データベース層（@/db）への依存を持たないようにすることで、
 * Visual Regression Testing (VRT) でコンポーネントをテスト可能にします。
 */

/**
 * エンティティの種類
 */
export type EntityType = 'quest' | 'powerup' | 'villain' | 'epicwin';

/**
 * ミッション条件
 */
export type MissionCondition = 'any' | 'specific';

/**
 * 冒険ログエントリ
 */
export type AdventureLog = {
  id: string;
  type: EntityType;
  title: string;
  createdAt: Date;
};

/**
 * 日次達成状況のステータス
 */
export type DailyAchievementStatus = 'no-data' | 'achieved' | 'not-achieved';

/**
 * Positive/Negativeスコア
 */
export type PosNegScore = {
  positive: number;
  negative: number;
  posNegRatio: number;
};

/**
 * 日次達成データ
 */
export type DailyAchievement = {
  /** @example "2024-01-01"  */
  dateString: string;
  date: Date;
  adventureLogs: AdventureLog[];
  status: DailyAchievementStatus;
  isToday?: boolean;
  /** Positive/Negativeスコア */
  posNegScore?: PosNegScore;
};

/**
 * 週次達成データ
 */
export type WeeklyAchievements = DailyAchievement[];

/**
 * ミッションエンティティ
 */
export type MissionEntity = {
  id: string;
  type: EntityType;
  title: string;
  completed: boolean;
};
