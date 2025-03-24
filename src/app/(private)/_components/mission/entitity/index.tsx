import { ENTITY_ORDER } from '@/app/_utils/constants';
import { Android, ScriptText, Zap } from '@/assets/icons';
import type { EntityType } from '@/db/types/mission';
import { css } from '@/styled-system/css';

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
        overflowX: 'auto',
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
          <MissionEntity key={index} {...item} />
        </div>
      ))}
    </div>
  );
};

export type MissionEntity = {
  id: string;
  itemType: EntityType;
  completed: boolean;
};

const MissionEntity = ({ itemType, completed }: MissionEntity) => {
  switch (itemType) {
    case 'quest':
      return (
        <ScriptText
          className={css({
            color: completed ? 'entity.quest' : 'entity.disabled',
            transition: '[color 0.8s ease-in-out]',
          })}
        />
      );
    case 'powerup':
      return (
        <Zap
          className={css({
            color: completed ? 'entity.powerup' : 'entity.disabled',
            transition: '[color 0.8s ease-in-out]',
          })}
        />
      );
    case 'villain':
      return (
        <Android
          className={css({
            color: completed ? 'entity.villain' : 'entity.disabled',
            transition: '[color 0.8s ease-in-out]',
          })}
        />
      );
    default:
      return null;
  }
};
