'use client';

import { signIn } from 'next-auth/react';
import { Button } from '../button';

export const GoogleButton = ({ redirectTo }: { redirectTo?: string }) => {
  return (
    <Button
      type="button"
      onClick={() => signIn('google', { callbackUrl: redirectTo ?? '/' })}
    >
      Googleでサインイン
    </Button>
  );
};
