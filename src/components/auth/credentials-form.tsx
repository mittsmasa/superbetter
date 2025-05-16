'use client';

import { signIn } from 'next-auth/react';
import { css } from '@/styled-system/css';
import { Button } from '../button';

export const CredentialsForm = () => {
  return (
    <form
      action={async (formData) => {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        signIn('credentials', { email, password, callbackUrl: '/' });
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
