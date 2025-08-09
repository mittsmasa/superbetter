import { css } from '@/styled-system/css';
import { getEpicWins } from '../../_actions/epicwin';
import { AddEpicWinButton } from './add-epicwin-button';
import { EpicWinList } from './epicwin-list';

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
      <div>
        {epicWins.length === 0 ? (
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            })}
          >
            <AddEpicWinButton />
          </div>
        ) : (
          <EpicWinList epicWins={epicWins} />
        )}
      </div>
    </div>
  );
};
