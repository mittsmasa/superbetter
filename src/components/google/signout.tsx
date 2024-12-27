import { signOut } from '@/auth';

export const SignOut = () => {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/login' });
      }}
    >
      <button type="submit">Sign out</button>
    </form>
  );
};
