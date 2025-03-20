import { describe, expect, it } from 'vitest';
import {
  fixToUTC,
  getDateTimeFormat,
  getStartAndEndOfDay,
  getTZDate,
} from './date';

describe('date utils', () => {
  describe('test environment', () => {
    it('タイムゾーンが UTC に設定されている', () => {
      expect(process.env.TZ).toBe('UTC');
    });
  });

  describe('getTZDate', () => {
    it('指定したタイムゾーンで Date オブジェクトを作成できる', () => {
      const date = new Date('2025-03-16T04:43:00Z'); // UTC時間
      const tzDate = getTZDate(date, 'Asia/Tokyo');
      // タイムゾーンを Asia/Tokyo に設定しても、時刻自体は変わらない
      expect(tzDate.toISOString()).toBe('2025-03-16T13:43:00.000+09:00');
    });

    it('デフォルトで Asia/Tokyo タイムゾーンが使用される', () => {
      const date = new Date('2025-03-16T04:43:00Z');
      const tzDate = getTZDate(date);
      expect(tzDate.toISOString()).toBe('2025-03-16T13:43:00.000+09:00');
    });
  });

  describe('fixToUTC', () => {
    it('UTCの新しい Date インスタンスを返す', () => {
      const original = new Date('2025-03-16T04:43:00Z');
      const tzDate = getTZDate(original, 'Asia/Tokyo');
      const fixed = fixToUTC(original);

      expect(tzDate.toISOString()).toBe('2025-03-16T13:43:00.000+09:00');
      expect(fixed.toISOString()).toBe('2025-03-16T04:43:00.000Z');
      expect(fixed.getTime()).toBe(tzDate.getTime());
    });

    describe('getDateTimeFormat', () => {
      it('日本語の曜日と日付を正しく返す', () => {
        const date = new Date('2025-03-16T00:00:00Z');
        // UTC時間（日本時間で3月16日（日））
        const result = getDateTimeFormat(date);

        expect(result.day).toBe('日');
        expect(result.date).toBe('16');
      });

      it('異なるタイムゾーンでも正しく動作する', () => {
        const date = new Date('2025-03-16T00:00:00Z');
        // UTC時間（アメリカ東部時間で3月15日（土））
        const result = getDateTimeFormat(date, 'America/New_York');

        expect(result.day).toBe('土');
        expect(result.date).toBe('15');
      });
    });
  });

  describe('getStartAndEndOfDay', () => {
    it('指定した日の開始時刻と終了時刻を返す', () => {
      const date = new Date('2025-03-16T04:43:00Z');
      const { start, end } = getStartAndEndOfDay(date);

      // JST 2025-03-16 00:00:00 = UTC 2025-03-15 15:00:00
      expect(start.toISOString()).toBe('2025-03-15T15:00:00.000Z');

      // JST 2025-03-16 23:59:59.999 = UTC 2025-03-16 14:59:59.999
      expect(end.toISOString()).toBe('2025-03-16T14:59:59.999Z');
    });
  });
});
