import { TZDate } from '@date-fns/tz';

/**
 * N日前の日付を取得（JST基準）
 * プロダクションコードがJSTで「今日」「昨日」を判定するため、
 * テストもJSTベースで日付を生成する
 */
export const getDaysAgo = (days: number): Date => {
  const nowJST = new TZDate(new Date(), 'Asia/Tokyo');
  const targetJST = new TZDate(
    nowJST.getFullYear(),
    nowJST.getMonth(),
    nowJST.getDate() - days,
    12,
    0,
    0,
    'Asia/Tokyo',
  );
  return new Date(targetJST.toISOString());
};

export const getToday = (): Date => getDaysAgo(0);
export const getYesterday = (): Date => getDaysAgo(1);
