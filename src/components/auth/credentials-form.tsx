import { signIn } from '@/auth';

export const CredentialsForm = () => {
  return (
    <form
      action={async (formData) => {
        'use server';
        await signIn('credentials', formData);
      }}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button type="submit">Sign In</button>
    </form>
  );
};
