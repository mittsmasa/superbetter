import { css } from '@/styled-system/css';
import { pixelBorder } from '@/styled-system/patterns';

type EntityStatsProps = {
  totalCount: number;
  weeklyCount: number;
  daysSinceCreation: number;
  lastExecutedAt: Date | null;
};

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Tokyo',
  }).format(date);
};

export const EntityStats = ({
  totalCount,
  weeklyCount,
  daysSinceCreation,
  lastExecutedAt,
}: EntityStatsProps) => {
  return (
    <div
      className={css({
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '8px',
        px: '12px',
      })}
    >
      <StatItem label="そうしょうかかいすう" value={`${totalCount}回`} />
      <StatItem label="こんしゅう" value={`${weeklyCount}回`} />
      <StatItem label="けいかにっすう" value={`${daysSinceCreation}日`} />
      <StatItem
        label="さいしゅうしょうか"
        value={lastExecutedAt ? formatDate(lastExecutedAt) : '未実行'}
      />
    </div>
  );
};

const StatItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div
      className={pixelBorder({
        borderWidth: 2,
        borderColor: 'interactive.border',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          padding: '8px',
          backgroundColor: 'interactive.background',
        })}
      >
        <span
          className={css({ textStyle: 'Body.quaternary', color: 'foreground' })}
        >
          {label}
        </span>
        <span className={css({ textStyle: 'Body.secondary' })}>{value}</span>
      </div>
    </div>
  );
};
