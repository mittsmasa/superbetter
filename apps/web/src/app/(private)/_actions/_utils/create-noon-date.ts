import { TZDate } from '@date-fns/tz';
import { setHours } from 'date-fns/setHours';
import { fixToUTC, getTZDate } from '@/app/_utils/date';

/**
 * 指定された日付のJST正午（12:00:00）のDateオブジェクトを作成します
 * サーバーがUTC環境で動作していても、JST基準で正午を計算します
 * @param targetDate - 対象の日付
 * @returns JSTの正午を表すDateオブジェクト（UTCで保存される）
 */
export const createNoonDate = (targetDate: Date): Date => {
  // targetDate を JST のタイムゾーンで解釈
  const jstDate = getTZDate(targetDate);

  // JST で正午（12:00:00）に設定
  const noonJST = setHours(jstDate, 12);
  const noonWithZeroMinutes = new TZDate(
    noonJST.getFullYear(),
    noonJST.getMonth(),
    noonJST.getDate(),
    12,
    0,
    0,
    'Asia/Tokyo',
  );

  // UTCに変換して返す
  return fixToUTC(noonWithZeroMinutes);
};
