'use client';

import { authClient } from '@/lib/auth-client';
import { Button } from '../button';

export const GoogleButton = ({ redirectTo }: { redirectTo?: string }) => {
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: redirectTo ?? '/',
    });
  };

  return (
    <Button type="button" onClick={handleGoogleLogin}>
      Googleでサインイン
    </Button>
  );
};
