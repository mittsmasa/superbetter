import { describe, expect, it } from 'vitest';
import type { MissionEntity } from '../../entity-icon';
import { sortMissionEntities } from '.';

describe('sortMissionEntities', () => {
  it('アイテムを正しい順序でソートする', () => {
    const items: MissionEntity[] = [
      { completed: false, itemType: 'villain' },
      { completed: false, itemType: 'powerup' },
      { completed: false, itemType: 'quest' },
    ];

    const sorted = [...items].sort(sortMissionEntities);

    expect(sorted.map((item) => item.itemType)).toEqual([
      'powerup',
      'quest',
      'villain',
    ]);
  });
});
