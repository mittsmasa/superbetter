import { css } from '@/styled-system/css';
import type { EntityIconProps } from '../../entity-icon';
import { EntityIcon } from '../../entity-icon';
import { sortMissionEntities } from './sort-mission-entities';

export const MissionEntities = (props: { items: EntityIconProps[] }) => {
  return (
    <div
      className={css({
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
      })}
    >
      {props.items.sort(sortMissionEntities).map((item, index) => (
        <div
          key={index}
          className={css({
            height: '[24px]',
            width: '[24px]',
            flexShrink: 0,
          })}
        >
          <EntityIcon key={index} {...item} />
        </div>
      ))}
    </div>
  );
};
