import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { and, eq } from 'drizzle-orm';
import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { createInitialEntity } from '@/app/(private)/_server-only/create-initial-entity';
import { users } from '@/db/schema/auth';
import { db } from '../db/client';

const config = {
  events: {
    signIn: async ({ user, isNewUser }) => {
      if (!(isNewUser && user.id)) {
        return;
      }
      await createInitialEntity(user.id);
    },
  },
  providers: [
    Google,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
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

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: {
    strategy: 'database',
  },
  ...config,
});
