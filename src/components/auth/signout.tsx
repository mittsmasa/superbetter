'use client';

import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export const SignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <button type="button" onClick={handleSignOut}>
      Sign out
    </button>
  );
};
