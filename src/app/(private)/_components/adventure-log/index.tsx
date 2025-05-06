import type { EntityType } from '@/db/types/mission';
import { css } from '@/styled-system/css';
import { EntityIcon } from '../entity-icon';

export const AdventureLog = ({
  heading,
  logs,
}: {
  heading: string;
  logs: {
    id: string;
    type: EntityType;
    title: string;
  }[];
}) => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        maxHeight: '[240px]',
        padding: '8px',
      })}
    >
      <h2>{heading}</h2>
      <div className={css({ overflow: 'auto', height: '[100px]' })}>
        {logs.length === 0 && (
          <p
            className={css({ textAlign: 'center', textStyle: 'Body.tertiary' })}
          >
            ログがありません
          </p>
        )}

        {logs.map((log) => (
          <div
            key={log.id}
            className={css({
              alignItems: 'center',
              display: 'flex',
              gap: '8px',
            })}
          >
            <span className={css({ width: '[18px]', height: '[18px]' })}>
              <EntityIcon itemType={log.type} completed />
            </span>
            <p className={css({ textStyle: 'Body.tertiary' })}>{log.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
