import {
  boolean,
  int,
  primaryKey,
  mysqlTable as table,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import type { AdapterAccountType } from 'next-auth/adapters';

// Phase 2用スキーマ: 既存の主キーとカラムを保持しつつ、新規カラムを追加

export const users = table('user', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  password: varchar('password', { length: 255 }),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date', fsp: 3 }),
  // Phase 2で追加: 一時カラム
  emailVerifiedTemp: boolean('emailVerifiedTemp').default(false),
  image: varchar('image', { length: 255 }),
});

// セッションテーブル: 既存の主キー(sessionToken)を保持
export const sessions = table('session', {
  sessionToken: varchar('sessionToken', { length: 255 }).primaryKey(),
  userId: varchar('userId', { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date', fsp: 3 }).notNull(),
  // 新規カラム
  id: varchar('id', { length: 36 }).$defaultFn(() => crypto.randomUUID()),
  createdAt: timestamp('createdAt', { mode: 'date', fsp: 3 })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date', fsp: 3 })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
});

// アカウントテーブル: 既存の複合主キーを保持
export const accounts = table(
  'account',
  {
    userId: varchar('userId', { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    // Phase 4まで保持するカラム
    type: varchar('type', { length: 255 })
      .$type<AdapterAccountType>()
      .notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
    refresh_token: varchar('refresh_token', { length: 255 }),
    access_token: text('access_token'),
    expires_at: int('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: varchar('id_token', { length: 2048 }),
    session_state: varchar('session_state', { length: 255 }),
    // 新規カラム
    id: varchar('id', { length: 36 }).$defaultFn(() => crypto.randomUUID()),
    refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt', {
      mode: 'date',
      fsp: 3,
    }),
    password: text('password'),
    createdAt: timestamp('createdAt', { mode: 'date', fsp: 3 })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updatedAt', { mode: 'date', fsp: 3 })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (account) => [
    primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  ],
);

// 検証トークンテーブル: 既存の複合主キーを保持
export const verificationTokens = table(
  'verificationToken',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
    // 新規カラム
    id: varchar('id', { length: 36 }).$defaultFn(() => crypto.randomUUID()),
    createdAt: timestamp('createdAt', { mode: 'date', fsp: 3 })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updatedAt', { mode: 'date', fsp: 3 })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (verificationToken) => [
    primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  ],
);

export const authenticators = table(
  'authenticator',
  {
    credentialID: varchar('credentialID', { length: 255 }).notNull().unique(),
    userId: varchar('userId', { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
    credentialPublicKey: varchar('credentialPublicKey', {
      length: 255,
    }).notNull(),
    counter: int('counter').notNull(),
    credentialDeviceType: varchar('credentialDeviceType', {
      length: 255,
    }).notNull(),
    credentialBackedUp: boolean('credentialBackedUp').notNull(),
    transports: varchar('transports', { length: 255 }),
  },
  (authenticator) => [
    primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  ],
);
