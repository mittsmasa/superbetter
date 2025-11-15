'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { css } from '@/styled-system/css';
import { Button } from '../button';

export const CredentialsForm = ({ redirectTo }: { redirectTo?: string }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    setIsLoading(true);

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        router.push((redirectTo ?? '/') as `/`);
        router.refresh();
      }
    } catch (err) {
      setError('ログインに失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      })}
    >
      {error && (
        <div
          className={css({ color: 'var(--colors-red-500)', fontSize: '14px' })}
        >
          {error}
        </div>
      )}
      <label className={css({ display: 'flex', gap: '4px' })}>
        Email
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />
      </label>
      <label className={css({ display: 'flex', gap: '4px' })}>
        Password
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />
      </label>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'サインイン中...' : 'Sign In'}
      </Button>
    </form>
  );
};
