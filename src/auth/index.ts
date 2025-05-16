import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { and, eq } from 'drizzle-orm';
import type { AuthOptions as NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { createInitialEntity } from '@/app/(private)/_server-only/create-initial-entity';
import { users } from '@/db/schema/auth';
import { db } from '../db/client';

export const config = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: 'database',
  },
  events: {
    signIn: async ({ user, isNewUser }) => {
      if (!(isNewUser && user.id)) {
        return;
      }
      await createInitialEntity(user.id);
    },
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET || '',
      checks: ['state'],
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error(
            'Invalid credentials. No email or password was provided.',
          );
        }
        // logic to verify if the user exists
        const user = await db.query.users.findFirst({
          columns: {
            id: true,
            email: true,
          },
          where: and(
            eq(users.email, credentials.email as string),
            eq(users.password, credentials.password as string),
          ),
        });
        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error('Invalid credentials.');
        }
        // return user object with their profile data
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const handler = NextAuth(config);
