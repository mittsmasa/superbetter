import { GoogleButton } from '@/components/auth/google-button';
import { css } from '@/styled-system/css';

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
      <GoogleButton redirectTo={redirectTo} />
    </main>
  );
};

export default Login;
