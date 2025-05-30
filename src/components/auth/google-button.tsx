import { signIn } from '@/auth';
import { Button } from '../button';

export const GoogleButton = ({ redirectTo }: { redirectTo?: string }) => {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google', { redirectTo: redirectTo ?? '/' });
      }}
    >
      <Button type="submit">Googleでサインイン</Button>
    </form>
  );
};
