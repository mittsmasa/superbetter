import { SignIn } from '@/components/google/signin';
import { SignOut } from '@/components/google/signout';

const Login = () => {
  return (
    <main>
      <SignIn />
      <SignOut />
    </main>
  );
};

export default Login;
