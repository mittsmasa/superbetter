import { EntityLink } from '@/components/entity-link';
import type { epicwins } from '@/db/schema/superbetter';
import { css } from '@/styled-system/css';

type EpicWin = typeof epicwins.$inferSelect;

export const EpicWinList = ({ epicWins }: { epicWins: EpicWin[] }) => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      })}
    >
      {epicWins.map((epicWin) => (
        <EntityLink
          key={epicWin.id}
          href={`/epicwins/${epicWin.id}`}
          title={
            <p
              className={css({
                textStyle: 'Body.secondary',
                fontWeight: 'normal',
              })}
            >
              {epicWin.title}
            </p>
          }
          description={epicWin.description}
        />
      ))}
    </div>
  );
};
