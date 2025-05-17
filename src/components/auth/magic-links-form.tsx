import { signIn } from '@/auth';
import { css } from '@/styled-system/css';
import { Button } from '../button';

export const MagicLinksForm = () => {
  return (
    <form
      action={async (formData) => {
        'use server';
        const email = formData.get('email') as string;
        await signIn('resend', { email, redirectTo: '/' });
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
      <Button type="submit">メールアドレスにログインリンクを送る</Button>
    </form>
  );
};
