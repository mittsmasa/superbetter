'use client';

import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/webauthn';
import { Button } from '../button';

export const WebauthnButton = ({ redirectTo }: { redirectTo?: string }) => {
  const { status } = useSession();
  return status === 'authenticated' ? (
    <Button
      type="button"
      onClick={() =>
        signIn('passkey', {
          action: 'register',
          redirectTo: redirectTo ?? '/',
        })
      }
    >
      新しいPass Keyを追加
    </Button>
  ) : (
    <Button
      type="button"
      onClick={() => signIn('passkey', { redirectTo: redirectTo ?? '/' })}
    >
      Passkeyでサインイン
    </Button>
  );
};
