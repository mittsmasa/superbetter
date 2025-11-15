import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { createAuthMiddleware } from 'better-auth/api';
import { nextCookies } from 'better-auth/next-js';
import { createInitialEntity } from '@/app/(private)/_server-only/create-initial-entity';
import { db } from '@/db/client';
import * as schema from '@/db/schema/auth';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'mysql',
    schema,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    },
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      // サインアップ時（新規セッション作成時）に初期エンティティを作成
      const newSession = ctx.context.newSession;
      if (newSession) {
        await createInitialEntity(newSession.user.id);
      }
    }),
  },
  // フィールドマッピング設定（トップレベル）
  user: {
    fields: {
      emailVerified: 'emailVerifiedTemp',
    },
  },
  session: {
    fields: {
      token: 'sessionToken',
      expiresAt: 'expires',
    },
  },
  account: {
    fields: {
      providerId: 'provider',
      accountId: 'providerAccountId',
      refreshToken: 'refresh_token',
      accessToken: 'access_token',
      accessTokenExpiresAt: 'refreshTokenExpiresAt',
      idToken: 'id_token',
    },
  },
  verification: {
    fields: {
      value: 'token',
      expiresAt: 'expires',
    },
  },
  plugins: [nextCookies()],
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});

export type Session = typeof auth.$Infer.Session;
