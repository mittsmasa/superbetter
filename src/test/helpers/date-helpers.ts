/**
 * N日前の日付を取得（UTC midnight）
 */
export const getDaysAgo = (days: number): Date => {
  const now = new Date();
  now.setUTCDate(now.getUTCDate() - days);
  now.setUTCHours(0, 0, 0, 0);
  return now;
};

export const getToday = (): Date => getDaysAgo(0);
export const getYesterday = (): Date => getDaysAgo(1);
