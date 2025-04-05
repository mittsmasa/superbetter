import type { ReactNode } from 'react';
import { Android, ScriptText, Zap } from '@/assets/icons';
import type { EntityType } from '@/db/types/mission';
import { css } from '@/styled-system/css';

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
      <div className={css({ overflow: 'auto' })}>
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
            {Icon[log.type]}
            <p className={css({ textStyle: 'Body.tertiary' })}>{log.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Icon = {
  powerup: (
    <Zap className={css({ color: 'entity.powerup', width: '[18px]' })} />
  ),
  quest: (
    <ScriptText className={css({ color: 'entity.quest', width: '[18px]' })} />
  ),
  villain: (
    <Android className={css({ color: 'entity.villain', width: '[18px]' })} />
  ),
  epicwin: <>未定</>,
} as const satisfies Record<EntityType, ReactNode>;
