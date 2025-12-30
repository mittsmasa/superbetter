import { beforeAll } from 'vitest';

beforeAll(() => {
  // テスト実行時のタイムゾーンを UTC に設定
  process.env.TZ = 'UTC';
});
