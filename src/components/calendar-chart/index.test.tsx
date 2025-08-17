import { describe, expect, it } from 'vitest';

// CalendarChartのロジック部分をテストするためのヘルパー関数
const generateDaysForMonth = (date: Date, includeWeekends: boolean): Date[] => {
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);

  const days: Date[] = [];

  for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
    const dayOfWeek = day.getDay();

    if (includeWeekends) {
      // 全ての曜日を含める
      days.push(new Date(day));
    } else {
      // 月曜日（1）から金曜日（5）のみ
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        days.push(new Date(day));
      }
    }
  }

  return days;
};

describe('CalendarChart logic', () => {
  describe('平日のみ表示', () => {
    it('2024年1月の平日が正しく生成される', () => {
      const month = new Date(2024, 0, 1); // 2024年1月
      const weekdays = generateDaysForMonth(month, false);

      // 2024年1月の平日は23日
      expect(weekdays).toHaveLength(23);

      // 最初の平日は1月1日（月曜日）
      expect(weekdays[0].getDate()).toBe(1);
      expect(weekdays[0].getDay()).toBe(1); // 月曜日

      // 最後の平日は1月31日（水曜日）
      expect(weekdays[weekdays.length - 1].getDate()).toBe(31);
      expect(weekdays[weekdays.length - 1].getDay()).toBe(3); // 水曜日
    });

    it('週末が除外される', () => {
      const month = new Date(2024, 5, 1); // 2024年6月（土曜日から開始）
      const weekdays = generateDaysForMonth(month, false);

      // 6月1日（土）と6月2日（日）は除外される
      expect(weekdays[0].getDate()).toBe(3); // 最初の平日は3日（月曜日）
      expect(weekdays[0].getDay()).toBe(1); // 月曜日

      // すべて平日であることを確認
      for (const day of weekdays) {
        const dayOfWeek = day.getDay();
        expect(dayOfWeek).toBeGreaterThanOrEqual(1);
        expect(dayOfWeek).toBeLessThanOrEqual(5);
      }
    });

    it('うるう年の2月が正しく処理される', () => {
      const leapYear = new Date(2024, 1, 1); // 2024年2月（うるう年）
      const regularYear = new Date(2023, 1, 1); // 2023年2月（平年）

      const leapWeekdays = generateDaysForMonth(leapYear, false);
      const regularWeekdays = generateDaysForMonth(regularYear, false);

      // うるう年の2月は平年より平日が多い（または同じ）
      expect(leapWeekdays.length).toBeGreaterThanOrEqual(
        regularWeekdays.length,
      );

      // 2024年2月29日が含まれる
      const feb29 = leapWeekdays.find((day) => day.getDate() === 29);
      expect(feb29).toBeDefined();
      expect(feb29?.getDay()).toBe(4); // 2024年2月29日は木曜日
    });

    it('異なる月で正しい平日数が生成される', () => {
      const months = [
        new Date(2024, 0, 1), // 1月
        new Date(2024, 1, 1), // 2月
        new Date(2024, 3, 1), // 4月
        new Date(2024, 10, 1), // 11月
      ];

      const weekdayCounts = months.map(
        (month) => generateDaysForMonth(month, false).length,
      );

      // すべて正の値
      for (const count of weekdayCounts) {
        expect(count).toBeGreaterThan(0);
      }

      // 期待値と照合
      expect(weekdayCounts[0]).toBe(23); // 1月: 23平日
      expect(weekdayCounts[1]).toBe(21); // 2月: 21平日
      expect(weekdayCounts[2]).toBe(22); // 4月: 22平日
      expect(weekdayCounts[3]).toBe(21); // 11月: 21平日
    });
  });

  describe('土日を含む表示', () => {
    it('2024年1月の全ての日が正しく生成される', () => {
      const month = new Date(2024, 0, 1); // 2024年1月
      const allDays = generateDaysForMonth(month, true);

      // 2024年1月は31日
      expect(allDays).toHaveLength(31);

      // 最初の日は1月1日（月曜日）
      expect(allDays[0].getDate()).toBe(1);
      expect(allDays[0].getDay()).toBe(1); // 月曜日

      // 最後の日は1月31日（水曜日）
      expect(allDays[allDays.length - 1].getDate()).toBe(31);
      expect(allDays[allDays.length - 1].getDay()).toBe(3); // 水曜日
    });

    it('土日が含まれる', () => {
      const month = new Date(2024, 0, 1); // 2024年1月
      const allDays = generateDaysForMonth(month, true);

      // 土日が含まれていることを確認
      const weekends = allDays.filter((day) => {
        const dayOfWeek = day.getDay();
        return dayOfWeek === 0 || dayOfWeek === 6; // 日曜日または土曜日
      });

      expect(weekends.length).toBeGreaterThan(0);
    });

    it('平日のみと土日含む場合で日数が異なる', () => {
      const month = new Date(2024, 0, 1); // 2024年1月
      const weekdaysOnly = generateDaysForMonth(month, false);
      const allDays = generateDaysForMonth(month, true);

      expect(allDays.length).toBeGreaterThan(weekdaysOnly.length);
      expect(weekdaysOnly).toHaveLength(23); // 平日のみ
      expect(allDays).toHaveLength(31); // 全日
    });
  });

  describe('日付のフォーマット', () => {
    it('日付オブジェクトが正しい年月日を持つ（平日のみ）', () => {
      const month = new Date(2024, 2, 1); // 2024年3月
      const weekdays = generateDaysForMonth(month, false);

      // すべて2024年3月の日付
      for (const day of weekdays) {
        expect(day.getFullYear()).toBe(2024);
        expect(day.getMonth()).toBe(2); // 3月（0ベース）
      }

      // 日付は昇順
      for (let i = 1; i < weekdays.length; i++) {
        expect(weekdays[i].getTime()).toBeGreaterThan(
          weekdays[i - 1].getTime(),
        );
      }
    });

    it('日付オブジェクトが正しい年月日を持つ（土日含む）', () => {
      const month = new Date(2024, 2, 1); // 2024年3月
      const allDays = generateDaysForMonth(month, true);

      // すべて2024年3月の日付
      for (const day of allDays) {
        expect(day.getFullYear()).toBe(2024);
        expect(day.getMonth()).toBe(2); // 3月（0ベース）
      }

      // 日付は昇順
      for (let i = 1; i < allDays.length; i++) {
        expect(allDays[i].getTime()).toBeGreaterThan(allDays[i - 1].getTime());
      }
    });
  });
});
