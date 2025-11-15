import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { createInitialEntity } from '@/app/(private)/_server-only/create-initial-entity';
import { db } from '@/db/client';
import * as schema from '@/db/schema/auth';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'mysql',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    async onSignUp(user: { id?: string }) {
      if (user.id) {
        await createInitialEntity(user.id);
      }
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    },
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
