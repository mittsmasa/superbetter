import {
  boolean,
  datetime,
  mysqlEnum as enumField,
  int,
  json,
  mysqlTable as table,
  text,
  varchar,
} from 'drizzle-orm/mysql-core';
import type { AdventureItem, MissionCondition } from '../types/mission';
import type { TestAnswer, TestName } from '../types/test';
import { users } from './auth';

export const userProfile = table('userProfile', {
  userId: varchar('userId', { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  challenge: varchar('challenge', { length: 255 }),
  values: varchar('values', { length: 255 }),
  hiddenIdentity: varchar('hiddenIdentity', { length: 255 }),
});

export const quests = table('quest', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  userId: varchar('userId', { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  count: int('count').notNull().default(0),
  archived: boolean('archived').notNull().default(false),
  order: int('order').notNull().default(0),
  createdAt: datetime('createdAt', { mode: 'date', fsp: 3 })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: datetime('updatedAt', { mode: 'date', fsp: 3 })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});

export const questHistories = table('questHistory', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  questId: varchar('questId', { length: 255 })
    .notNull()
    .references(() => quests.id, { onDelete: 'cascade' }),
  createdAt: datetime('createdAt', { mode: 'date', fsp: 3 })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: datetime('updatedAt', { mode: 'date', fsp: 3 })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});

export const powerups = table('powerup', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  userId: varchar('userId', { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  count: int('count').notNull().default(0),
  archived: boolean('archived').notNull().default(false),
  order: int('order').notNull().default(0),
  createdAt: datetime('createdAt', { mode: 'date', fsp: 3 })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: datetime('updatedAt', { mode: 'date', fsp: 3 })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});

export const powerupHistories = table('powerupHistory', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  powerupId: varchar('powerupId', { length: 255 })
    .notNull()
    .references(() => powerups.id, { onDelete: 'cascade' }),
  createdAt: datetime('createdAt', { mode: 'date', fsp: 3 })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: datetime('updatedAt', { mode: 'date', fsp: 3 })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});

export const villains = table('villain', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  userId: varchar('userId', { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  count: int('count').notNull().default(0),
  archived: boolean('archived').notNull().default(false),
  order: int('order').notNull().default(0),
  createdAt: datetime('createdAt', { mode: 'date', fsp: 3 })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: datetime('updatedAt', { mode: 'date', fsp: 3 })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});

export const villainHistories = table('villainHistory', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  villainId: varchar('villainId', { length: 255 })
    .notNull()
    .references(() => villains.id, { onDelete: 'cascade' }),
  createdAt: datetime('createdAt', { mode: 'date', fsp: 3 })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: datetime('updatedAt', { mode: 'date', fsp: 3 })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});

export const epicwins = table('epicwin', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  userId: varchar('userId', { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  count: int('count').notNull().default(0),
  archived: boolean('archived').notNull().default(false),
  createdAt: datetime('createdAt', { mode: 'date', fsp: 3 })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: datetime('updatedAt', { mode: 'date', fsp: 3 })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});

export const missions = table('mission', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  userId: varchar('userId', { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  type: enumField('type', [
    'system-daily',
    'system-weekly',
    'system-monthly',
    'user-defined',
  ] as const).notNull(),
  deadline: datetime('deadline', { mode: 'date', fsp: 3 }),
  createdAt: datetime('createdAt', { mode: 'date', fsp: 3 })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: datetime('updatedAt', { mode: 'date', fsp: 3 })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});

export const missionConditions = table('missionCondition', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  missionId: varchar('missionId', { length: 255 })
    .notNull()
    .references(() => missions.id, { onDelete: 'cascade' }),
  conditionType: enumField('conditionType', [
    'any',
    'specific',
  ] as const satisfies MissionCondition[]),
  itemType: enumField('itemType', [
    'quest',
    'powerup',
    'villain',
    'epicwin',
  ] as const satisfies AdventureItem[]).notNull(),
  itemId: varchar('itemId', { length: 255 }),
  completed: boolean('completed').notNull().default(false),
  createdAt: datetime('createdAt', { mode: 'date', fsp: 3 })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: datetime('updatedAt', { mode: 'date', fsp: 3 })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});

/** 診断まわり */
export const testTypes = table('testType', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: enumField('name', ['pos-neg'] as const satisfies TestName[])
    .notNull()
    .unique(),
});

export const testResults = table('testResult', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: varchar('userId', { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  testTypeId: varchar('testTypeId', { length: 255 })
    .notNull()
    .references(() => testTypes.id, { onDelete: 'cascade' }),
  answer: json('answer').notNull().$type<TestAnswer>(),
  createdAt: datetime('createdAt', { mode: 'date', fsp: 3 })
    .notNull()
    .$defaultFn(() => new Date()),
});
