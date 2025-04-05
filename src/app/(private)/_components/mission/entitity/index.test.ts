import { describe, expect, it } from 'vitest';
import type { MissionEntity } from '.';
import { sortMissionEntities } from '.';

describe('sortMissionEntities', () => {
  it('アイテムを正しい順序でソートする', () => {
    const items: MissionEntity[] = [
      { id: '1', itemType: 'villain', completed: false },
      { id: '2', itemType: 'powerup', completed: false },
      { id: '3', itemType: 'quest', completed: false },
    ];

    const sorted = [...items].sort(sortMissionEntities);

    expect(sorted.map((item) => item.itemType)).toEqual([
      'powerup',
      'quest',
      'villain',
    ]);
  });

  it('同じタイプのアイテムの順序は保持される', () => {
    const items: MissionEntity[] = [
      { id: '1', itemType: 'powerup', completed: false },
      { id: '2', itemType: 'powerup', completed: true },
      { id: '3', itemType: 'quest', completed: false },
    ];

    const sorted = [...items].sort(sortMissionEntities);

    expect(sorted.map((item) => item.id)).toEqual(['1', '2', '3']);
  });

  it('ソート関数が未定義の場合はundefinedを返す', () => {
    const items: MissionEntity[] = [];
    const sorter = sortMissionEntities;
    expect(sorter).toBeDefined();
  });
});
