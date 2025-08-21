import { CredentialsForm } from '@/components/auth/credentials-form';
import { GoogleButton } from '@/components/auth/google-button';
import { MagicLinksForm } from '@/components/auth/magic-links-form';
import { css } from '@/styled-system/css';

const VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV;

const Login = async (props: PageProps<'/login'>) => {
  const { redirectTo } = await props.searchParams;
  if (Array.isArray(redirectTo)) {
    throw new Error('Invalid redirectTo parameter');
  }
  return (
    <main
      className={css({
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: 'dvh',
        justifyContent: 'center',
        gap: '24px',
      })}
    >
      <p
        className={css({
          color: 'foreground',
          textAlign: 'center',
          textStyle: 'Body.secondary',
        })}
      >
        こころをきたえる勇気と覚悟はあるか
        <br />
        もしおぬしにそれがあるなら
        <br />
        あらたな世界のとびらはここにある
      </p>
      <MagicLinksForm />
      <GoogleButton redirectTo={redirectTo} />
      {VERCEL_ENV !== 'production' && <CredentialsForm />}
    </main>
  );
};

export default Login;
