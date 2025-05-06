import { ENTITY_ORDER } from '@/app/_utils/constants';
import { css } from '@/styled-system/css';
import { EntityIcon, type MissionEntity } from '../../entity-icon';

export const sortMissionEntities: (
  a: MissionEntity,
  b: MissionEntity,
) => number = (a, b) => {
  const typeA = ENTITY_ORDER.indexOf(a.itemType);
  const typeB = ENTITY_ORDER.indexOf(b.itemType);
  return typeA - typeB;
};

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
