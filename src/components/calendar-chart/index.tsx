'use client';

import { useTapFeeling } from '@/hooks/feeling';
import { css, cx, sva } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';

type Size = 'sm' | 'md' | 'lg';

const calendarChart = sva({
  slots: ['container', 'cell'],
  base: {
    container: {
      display: 'grid',
      width: '[fit-content]',
    },
    cell: {
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textStyle: 'Body.primary',
      fontSize: '12px',
      backgroundColor: 'background',
      _hover: {
        backgroundColor: 'interactive.background.hover',
      },
      _active: {
        transform: 'scale(0.95)',
      },
    },
  },
  variants: {
    size: {
      sm: {
        container: {
          gap: '[2px]',
        },
        cell: {
          width: '[32px]',
          height: '[32px]',
        },
      },
      md: {
        container: {
          gap: '[4px]',
        },
        cell: {
          width: '[40px]',
          height: '[40px]',
        },
      },
      lg: {
        container: {
          gap: '[8px]',
        },
        cell: {
          width: '[48px]',
          height: '[48px]',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface CalendarChartProps {
  /**
   * 表示する月
   */
  month: Date;
  /**
   * 日のアイテムがクリックされた時のイベントハンドラー
   * @param date クリックされた日付
   * @param index その日のインデックス（月曜日が0、土日含む場合は日曜日が0）
   */
  onClick?: (date: Date, index: number) => void;
  /**
   * 各日のセルに適用するカスタムスタイル
   * セルの状態や日付に基づいてスタイルを動的に決定可能
   */
  cellStyle?: (
    date: Date,
    index: number,
  ) => {
    backgroundColor?: string;
    borderColor?: string;
    opacity?: number;
    [key: string]: string | number | undefined;
  };
  /**
   * セルのサイズとギャップサイズ
   * @default 'md'
   */
  size?: Size;
  /**
   * 土日を含めて表示するかどうか
   * @default true
   */
  includeWeekends?: boolean;
}

interface CalendarCellProps {
  date: Date;
  index: number;
  size: Size;
  cellClassName: string;
  style?: {
    backgroundColor?: string;
    borderColor?: string;
    opacity?: number;
    [key: string]: string | number | undefined;
  };
  onClick?: (date: Date, index: number) => void;
}

const CalendarCell = ({
  date,
  index,
  cellClassName,
  style,
  onClick,
}: CalendarCellProps) => {
  const feeling = useTapFeeling();

  const handleClick = () => {
    onClick?.(date, index);
  };

  return (
    <button
      {...feeling.props}
      onClick={handleClick}
      className={cx(
        pixelBorder({
          borderWidth: 1,
          borderColor: 'interactive.border.alt',
        }),
        cellClassName,
        css(feeling.cssRaw),
      )}
      style={{
        backgroundColor: style?.backgroundColor,
        opacity: style?.opacity,
      }}
    >
      {date.getDate()}
    </button>
  );
};

/**
 * 月ごとのカレンダーを表示するカレンダーチャートコンポーネント
 */
export const CalendarChart = ({
  month,
  onClick,
  cellStyle,
  size = 'md',
  includeWeekends = true,
}: CalendarChartProps) => {
  // 月ごとの日付データを生成（月曜始まりのカレンダー形式）
  const generateCalendarDaysForMonth = (
    date: Date,
    includeWeekends: boolean,
  ): (Date | null)[] => {
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);

    const days: (Date | null)[] = [];

    // 月の最初の日の曜日を取得（日曜日=0を月曜日=0に変換）
    let firstDayOfWeek = firstDay.getDay();
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1; // 月曜日を0とする

    if (includeWeekends) {
      // 月曜日から始まるカレンダー形式
      // 最初の週の空白を追加
      for (let i = 0; i < firstDayOfWeek; i++) {
        days.push(null);
      }

      // 月の全ての日を追加
      for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
        days.push(new Date(day));
      }
    } else {
      // 平日のみの場合は空白なしで月曜日から金曜日のみ
      for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
        const dayOfWeek = day.getDay();
        // 月曜日（1）から金曜日（5）のみ
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
          days.push(new Date(day));
        }
      }
    }

    return days;
  };

  const days = generateCalendarDaysForMonth(month, includeWeekends);
  const columnsCount = includeWeekends ? 7 : 5;
  const classes = calendarChart({ size });

  return (
    <div
      className={classes.container}
      style={{
        gridTemplateColumns: `repeat(${columnsCount}, 1fr)`,
      }}
    >
      {days.map((date, index) => {
        // 空白セル（null）の場合
        if (date === null) {
          return (
            <div
              key={`empty-${index}`}
              className={classes.cell || ''}
              style={{ visibility: 'hidden' }}
            />
          );
        }

        const style = cellStyle?.(date, index);
        return (
          <CalendarCell
            key={date.toISOString()}
            date={date}
            index={index}
            size={size}
            cellClassName={classes.cell || ''}
            style={style}
            onClick={onClick}
          />
        );
      })}
    </div>
  );
};
