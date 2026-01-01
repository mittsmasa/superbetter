'use client';

import { Select } from '@superbetter/ui';
import { useMemo, useState } from 'react';
import { getDateString } from '@/app/_utils/date';
import type { MonthlyAchievements } from '@/app/(private)/_actions/get-monthly-achievements';
import type { WeekelyAchievements } from '@/app/(private)/_actions/types/weekly-achievements';
import { AdventureLog } from '@/app/(private)/_components/adventure-log';
import { CalendarChart } from '@/components/calendar-chart';
import { TimeSeriesChart } from '@/components/time-series-chart';
import { css } from '@/styled-system/css';
import { usePeriodAchievements } from './hooks/use-period-achievements';

export const LogSection = ({
  weeklyAchievement,
  monthlyAchievement,
}: {
  weeklyAchievement: WeekelyAchievements;
  monthlyAchievement: MonthlyAchievements;
}) => {
  const {
    periodType,
    setPeriodType,
    currentData,
    chartData,
    periodOptions,
    isMonthlyDataAvailable,
  } = usePeriodAchievements(weeklyAchievement, monthlyAchievement);

  const [selectedDate, setSelectedDate] = useState(
    () =>
      currentData.find((d) => d.isToday)?.dateString ||
      currentData[0]?.dateString,
  );
  const [showPosNegRatio, setShowPosNegRatio] = useState(true);

  const achievement = currentData.find((d) => d.dateString === selectedDate);

  const getCellStyle = useMemo(() => {
    if (periodType !== 'month') return undefined;

    return (date: Date) => {
      const dateString = getDateString(date);

      const achievement = currentData.find((a) => a.dateString === dateString);
      const isSelected = selectedDate === dateString;

      if (isSelected) {
        return css({
          backgroundColor: 'interactive.background.hover',
          color: 'foreground.secondary',
        });
      }

      if (!achievement) {
        return css({
          backgroundColor: 'background',
          color: 'foreground.disabled',
        });
      }

      switch (achievement.status) {
        case 'achieved':
          return css({
            backgroundColor: 'foreground',
            color: 'background',
          });
        case 'not-achieved':
          return css({
            backgroundColor: 'background',
            color: 'foreground',
          });
        default:
          return css({
            backgroundColor: 'background',
            color: 'foreground.disabled',
          });
      }
    };
  }, [periodType, currentData, selectedDate]);

  const handleCalendarClick = (date: Date) => {
    const dateString = getDateString(date);
    setSelectedDate(dateString);
  };
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      })}
    >
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          })}
        >
          <h2 className={css({ textStyle: 'Heading.primary' })}>冒険ログ</h2>
          {isMonthlyDataAvailable && (
            <Select.Root
              key={periodType}
              options={periodOptions}
              defaultValue={periodType}
              onValueChange={(value) =>
                setPeriodType(value as 'week' | 'month')
              }
            >
              <Select.Trigger placeholder="期間を選択" />
              <Select.Content>
                {periodOptions.map((option) => (
                  <Select.Item key={option.value} value={option.value}>
                    {option.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          )}
        </div>
        {periodType === 'week' && (
          <label
            className={css({
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              textStyle: 'Body.secondary',
            })}
          >
            <input
              type="checkbox"
              checked={showPosNegRatio}
              onChange={(e) => setShowPosNegRatio(e.target.checked)}
            />
            魔力測定
          </label>
        )}
      </div>
      {periodType === 'week' ? (
        <TimeSeriesChart
          onClickBar={setSelectedDate}
          data={chartData}
          showPosNegRatio={showPosNegRatio}
        />
      ) : (
        currentData.length > 0 && (
          <div className={css({ display: 'flex', justifyContent: 'center' })}>
            <CalendarChart
              month={currentData[0].date}
              onClick={handleCalendarClick}
              cellStyle={getCellStyle}
              size="md"
              includeWeekends={true}
            />
          </div>
        )
      )}
      {achievement && (
        <AdventureLog
          heading={achievement.isToday ? '本日' : `${achievement.dateString}`}
          logs={achievement.adventureLogs}
        />
      )}
    </div>
  );
};
