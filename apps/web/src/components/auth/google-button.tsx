'use client';

import { Button } from '@superbetter/ui';
import { authClient } from '@/lib/auth-client';

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
