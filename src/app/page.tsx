import { SignIn } from '@/components/signin/google';
import { css } from '@/styled-system/css';

export default function Home() {
  return (
    <div>
      <main className={css({ color: 'blue.500' })}>
        <SignIn />
      </main>
    </div>
  );
}
