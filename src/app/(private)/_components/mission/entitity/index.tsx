import { css } from '@/styled-system/css';
import { EntityIcon, type MissionEntity } from '../../entity-icon';
import { sortMissionEntities } from './sort-mission-entities';

export const MissionEntities = (props: { items: MissionEntity[] }) => {
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
