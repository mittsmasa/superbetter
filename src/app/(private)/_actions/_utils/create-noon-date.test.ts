import { TZDate } from '@date-fns/tz';
import { describe, expect, it } from 'vitest';
import { createNoonDate } from './create-noon-date';

describe('createNoonDate', () => {
  describe('UTC環境での動作（サーバー環境を想定）', () => {
    it('JSTの日付からJST正午（12:00）を作成する', () => {
      // JST: 2025-12-13 10:00
      const targetDate = new TZDate(2025, 11, 13, 10, 0, 0, 'Asia/Tokyo');

      const result = createNoonDate(targetDate);

      // 期待値: JST 2025-12-13 12:00 = UTC 2025-12-13 03:00
      expect(result.toISOString()).toBe('2025-12-13T03:00:00.000Z');
    });

    it('異なる時刻のJST日付でも同じJST正午になる', () => {
      // JST: 2025-12-13 23:59
      const targetDate1 = new TZDate(2025, 11, 13, 23, 59, 0, 'Asia/Tokyo');
      // JST: 2025-12-13 00:01
      const targetDate2 = new TZDate(2025, 11, 13, 0, 1, 0, 'Asia/Tokyo');

      const result1 = createNoonDate(targetDate1);
      const result2 = createNoonDate(targetDate2);

      // どちらも JST 2025-12-13 12:00 = UTC 03:00 になるべき
      expect(result1.toISOString()).toBe('2025-12-13T03:00:00.000Z');
      expect(result2.toISOString()).toBe('2025-12-13T03:00:00.000Z');
    });

    it('異なる日付は異なるJST正午になる', () => {
      // JST: 2025-12-13
      const targetDate1 = new TZDate(2025, 11, 13, 10, 0, 0, 'Asia/Tokyo');
      // JST: 2025-12-14
      const targetDate2 = new TZDate(2025, 11, 14, 10, 0, 0, 'Asia/Tokyo');

      const result1 = createNoonDate(targetDate1);
      const result2 = createNoonDate(targetDate2);

      // JST 2025-12-13 12:00 = UTC 03:00
      expect(result1.toISOString()).toBe('2025-12-13T03:00:00.000Z');
      // JST 2025-12-14 12:00 = UTC 03:00
      expect(result2.toISOString()).toBe('2025-12-14T03:00:00.000Z');
    });

    it('UTCで表現された日付でもJST基準で正午を作成', () => {
      // UTC: 2025-12-13 06:00 = JST: 2025-12-13 15:00
      const targetDate = new Date('2025-12-13T06:00:00.000Z');

      const result = createNoonDate(targetDate);

      // 期待値: JST 2025-12-13 12:00 = UTC 2025-12-13 03:00
      expect(result.toISOString()).toBe('2025-12-13T03:00:00.000Z');
    });

    it('境界値: JST日付変更直後（UTC 15:00:01 = JST 00:00:01）', () => {
      // UTC: 2025-12-12 15:00:01 = JST: 2025-12-13 00:00:01
      const targetDate = new Date('2025-12-12T15:00:01.000Z');

      const result = createNoonDate(targetDate);

      // 期待値: JST 2025-12-13 12:00 = UTC 2025-12-13 03:00
      expect(result.toISOString()).toBe('2025-12-13T03:00:00.000Z');
    });

    it('境界値: JST日付変更直前（UTC 14:59:59 = JST 23:59:59）', () => {
      // UTC: 2025-12-12 14:59:59 = JST: 2025-12-12 23:59:59
      const targetDate = new Date('2025-12-12T14:59:59.000Z');

      const result = createNoonDate(targetDate);

      // 期待値: JST 2025-12-12 12:00 = UTC 2025-12-12 03:00
      expect(result.toISOString()).toBe('2025-12-12T03:00:00.000Z');
    });
  });
});
