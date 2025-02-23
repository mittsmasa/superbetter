import { signIn } from '@/auth';
import { css } from '@/styled-system/css';
import { Button } from '../button';

export const CredentialsForm = () => {
  return (
    <form
      action={async (formData) => {
        'use server';
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        await signIn('credentials', { email, password, redirectTo: '/' });
      }}
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      })}
    >
      <label className={css({ display: 'flex', gap: '4px' })}>
        Email
        <input name="email" type="email" required />
      </label>
      <label className={css({ display: 'flex', gap: '4px' })}>
        Password
        <input name="password" type="password" required />
      </label>
      <Button type="submit">Sign In</Button>
    </form>
  );
};
