import { SignInButton } from '@/components/google/signin-button';
import { css } from '@/styled-system/css';

const Login = async ({
  searchParams,
}: { searchParams: Promise<{ redirectTo?: string }> }) => {
  const { redirectTo } = await searchParams;
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
      <SignInButton redirectTo={redirectTo} />
    </main>
  );
};

export default Login;
