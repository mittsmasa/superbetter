'use client';

import { ChevlonLeft } from '@superbetter/ui/icons';
import { getTZDate } from '@/app/_utils/date';
import { MotionLink } from '@/components/motion-link';
import { css } from '@/styled-system/css';

type DateNavigationProps = {
  currentDate: Date;
};

const formatDateForUrl = (date: Date) => {
  const jstDate = getTZDate(date);
  const year = jstDate.getFullYear();
  const month = String(jstDate.getMonth() + 1).padStart(2, '0');
  const day = String(jstDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatDateForDisplay = (date: Date) => {
  const jstDate = getTZDate(date);
  const year = jstDate.getFullYear();
  const month = String(jstDate.getMonth() + 1).padStart(2, '0');
  const day = String(jstDate.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};

export const DateNavigation = ({ currentDate }: DateNavigationProps) => {
  const prevDate = new Date(currentDate);
  prevDate.setDate(prevDate.getDate() - 1);

  const nextDate = new Date(currentDate);
  nextDate.setDate(nextDate.getDate() + 1);

  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        padding: '12px',
      })}
    >
      <MotionLink href={`/history/${formatDateForUrl(prevDate)}` as never}>
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
          })}
        >
          <ChevlonLeft size={24} />
        </div>
      </MotionLink>

      <div
        className={css({
          textStyle: 'Heading.primary',
          textAlign: 'center',
          flex: '1',
        })}
      >
        {formatDateForDisplay(currentDate)}
      </div>

      <MotionLink href={`/history/${formatDateForUrl(nextDate)}` as never}>
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
            transform: 'rotate(180deg)',
          })}
        >
          <ChevlonLeft size={24} />
        </div>
      </MotionLink>
    </div>
  );
};
