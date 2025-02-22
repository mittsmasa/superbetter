import { GoogleButton } from '@/components/google/signin-button';
import { WebauthnButton } from '@/components/webauthn/signin-button';
import { css } from '@/styled-system/css';
import { SessionProvider } from 'next-auth/react';

const Login = async ({
  searchParams,
}: { searchParams: Promise<{ redirectTo?: string }> }) => {
  const { redirectTo } = await searchParams;
  return (
    <SessionProvider>
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
            color: 'white',
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
        <GoogleButton redirectTo={redirectTo} />
        <WebauthnButton redirectTo={redirectTo} />
      </main>
    </SessionProvider>
  );
};

export default Login;
