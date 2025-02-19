'use server';

import { signOut as authSignOut } from '@/auth';

export const signOut = async () => {
  await authSignOut({ redirectTo: '/login' });
};
