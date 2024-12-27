import { signIn } from '@/auth';
import { Button } from '../button';

export const SignInButton = () => {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google');
      }}
    >
      <Button type="submit">Googleでサインイン</Button>
    </form>
  );
};
