import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import Passkey from 'next-auth/providers/passkey';

export const config = {
  providers: [Google, Passkey],
} satisfies NextAuthConfig;
