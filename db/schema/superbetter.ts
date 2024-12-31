import {
  boolean,
  mysqlEnum as enumField,
  int,
  mysqlTable as table,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
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
  createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).notNull().onUpdateNow(),
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
  createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).notNull().onUpdateNow(),
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
  createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).notNull().onUpdateNow(),
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
  createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).notNull().onUpdateNow(),
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
  count: int('count').notNull().default(0),
  completed: boolean('completed').notNull().default(false),
  deadline: timestamp('deadline', { mode: 'date' }),
  createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).notNull().onUpdateNow(),
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
  ] as const satisfies MissionItem[]),
  itemId: varchar('itemId', { length: 255 }),
  completed: boolean('completed').notNull().default(false),
  createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).notNull().onUpdateNow(),
});

export type MissionItem = 'quest' | 'powerup' | 'villain' | 'epicwin';
export type MissionCondition = 'any' | 'specific';
