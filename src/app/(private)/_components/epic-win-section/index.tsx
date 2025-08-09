import { css } from '@/styled-system/css';
import { getEpicWins } from '../../_actions/epic-win';
import { AddEpicWinButton } from './add-epic-win-button';
import { EpicWinList } from './epic-win-list';

export const EpicWinSection = async () => {
  const epicWins = await getEpicWins();

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'stretch',
        gap: '8px',
        padding: '8px',
      })}
    >
      {/* Heading */}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'stretch',
        })}
      >
        <h2
          className={css({
            textStyle: 'Heading.primary',
            fontSize: '16px',
            lineHeight: '1.5em',
            textAlign: 'left',
            color: 'foreground.secondary',
          })}
        >
          エピックウィン
        </h2>
      </div>

      {/* Content Container */}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'stretch',
          padding: '4px',
        })}
      >
        {epicWins.length === 0 ? (
          // Empty state - show add button
          <AddEpicWinButton />
        ) : (
          // Data exists - show list
          <EpicWinList epicWins={epicWins} />
        )}
      </div>
    </div>
  );
};
