import { describe, expect, it } from 'vitest';
import type { EntityIconProps } from '../../entity-icon';
import { sortMissionEntities } from './sort-mission-entities';

describe('sortMissionEntities', () => {
  it('アイテムを正しい順序でソートする', () => {
    const items: EntityIconProps[] = [
      { itemType: 'villain', completed: false },
      { itemType: 'powerup', completed: false },
      { itemType: 'quest', completed: false },
    ];

    const sorted = [...items].sort(sortMissionEntities);

    expect(sorted.map((item) => item.itemType)).toEqual([
      'powerup',
      'quest',
      'villain',
    ]);
  });
});
