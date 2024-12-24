import NextAuth from 'next-auth';
import { config } from './auth/config';

export const { auth: middleware } = NextAuth(config);
