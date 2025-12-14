import { TZDate } from '@date-fns/tz';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { isEditableDate } from './editable-date';

describe('isEditableDate', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('JST環境での動作', () => {
    it('JSTの今日の日付は編集可能', () => {
      // JST: 2025-12-13 15:00
      const nowJST = new TZDate(2025, 11, 13, 15, 0, 0, 'Asia/Tokyo');
      vi.setSystemTime(nowJST);

      // JST: 2025-12-13 の任意の時刻
      const targetDate = new TZDate(2025, 11, 13, 10, 0, 0, 'Asia/Tokyo');

      expect(isEditableDate(targetDate)).toBe(true);
    });

    it('JSTの昨日の日付は編集可能', () => {
      // JST: 2025-12-13 15:00
      const nowJST = new TZDate(2025, 11, 13, 15, 0, 0, 'Asia/Tokyo');
      vi.setSystemTime(nowJST);

      // JST: 2025-12-12 の任意の時刻
      const targetDate = new TZDate(2025, 11, 12, 10, 0, 0, 'Asia/Tokyo');

      expect(isEditableDate(targetDate)).toBe(true);
    });

    it('JSTの一昨日の日付は編集不可', () => {
      // JST: 2025-12-13 15:00
      const nowJST = new TZDate(2025, 11, 13, 15, 0, 0, 'Asia/Tokyo');
      vi.setSystemTime(nowJST);

      // JST: 2025-12-11 の任意の時刻
      const targetDate = new TZDate(2025, 11, 11, 10, 0, 0, 'Asia/Tokyo');

      expect(isEditableDate(targetDate)).toBe(false);
    });

    it('JSTの明日の日付は編集不可', () => {
      // JST: 2025-12-13 15:00
      const nowJST = new TZDate(2025, 11, 13, 15, 0, 0, 'Asia/Tokyo');
      vi.setSystemTime(nowJST);

      // JST: 2025-12-14 の任意の時刻
      const targetDate = new TZDate(2025, 11, 14, 10, 0, 0, 'Asia/Tokyo');

      expect(isEditableDate(targetDate)).toBe(false);
    });
  });

  describe('UTC環境での動作（サーバー環境を想定）', () => {
    it('UTC環境でもJSTの今日の日付は編集可能', () => {
      // UTC: 2025-12-13 06:00 = JST: 2025-12-13 15:00
      const nowUTC = new Date('2025-12-13T06:00:00.000Z');
      vi.setSystemTime(nowUTC);

      // JST: 2025-12-13 の任意の時刻
      const targetDate = new TZDate(2025, 11, 13, 10, 0, 0, 'Asia/Tokyo');

      expect(isEditableDate(targetDate)).toBe(true);
    });

    it('UTC環境でもJSTの昨日の日付は編集可能', () => {
      // UTC: 2025-12-13 06:00 = JST: 2025-12-13 15:00
      const nowUTC = new Date('2025-12-13T06:00:00.000Z');
      vi.setSystemTime(nowUTC);

      // JST: 2025-12-12 の任意の時刻
      const targetDate = new TZDate(2025, 11, 12, 10, 0, 0, 'Asia/Tokyo');

      expect(isEditableDate(targetDate)).toBe(true);
    });

    it('UTC環境でもJSTの一昨日の日付は編集不可', () => {
      // UTC: 2025-12-13 06:00 = JST: 2025-12-13 15:00
      const nowUTC = new Date('2025-12-13T06:00:00.000Z');
      vi.setSystemTime(nowUTC);

      // JST: 2025-12-11 の任意の時刻
      const targetDate = new TZDate(2025, 11, 11, 10, 0, 0, 'Asia/Tokyo');

      expect(isEditableDate(targetDate)).toBe(false);
    });

    it('境界値テスト: JST日付変更直後（UTC 15:00:01）', () => {
      // UTC: 2025-12-12 15:00:01 = JST: 2025-12-13 00:00:01
      const nowUTC = new Date('2025-12-12T15:00:01.000Z');
      vi.setSystemTime(nowUTC);

      // JST: 2025-12-12（前日）は編集可能
      const yesterday = new TZDate(2025, 11, 12, 10, 0, 0, 'Asia/Tokyo');
      expect(isEditableDate(yesterday)).toBe(true);

      // JST: 2025-12-13（今日）は編集可能
      const today = new TZDate(2025, 11, 13, 10, 0, 0, 'Asia/Tokyo');
      expect(isEditableDate(today)).toBe(true);

      // JST: 2025-12-11（一昨日）は編集不可
      const dayBeforeYesterday = new TZDate(
        2025,
        11,
        11,
        10,
        0,
        0,
        'Asia/Tokyo',
      );
      expect(isEditableDate(dayBeforeYesterday)).toBe(false);
    });

    it('境界値テスト: JST日付変更直前（UTC 14:59:59）', () => {
      // UTC: 2025-12-12 14:59:59 = JST: 2025-12-12 23:59:59
      const nowUTC = new Date('2025-12-12T14:59:59.000Z');
      vi.setSystemTime(nowUTC);

      // JST: 2025-12-12（今日）は編集可能
      const today = new TZDate(2025, 11, 12, 10, 0, 0, 'Asia/Tokyo');
      expect(isEditableDate(today)).toBe(true);

      // JST: 2025-12-11（昨日）は編集可能
      const yesterday = new TZDate(2025, 11, 11, 10, 0, 0, 'Asia/Tokyo');
      expect(isEditableDate(yesterday)).toBe(true);

      // JST: 2025-12-13（明日）は編集不可
      const tomorrow = new TZDate(2025, 11, 13, 10, 0, 0, 'Asia/Tokyo');
      expect(isEditableDate(tomorrow)).toBe(false);
    });
  });
});
