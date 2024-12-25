import { SignIn } from '@/components/signin/google';
import { css } from '@/styled-system/css';

export default function Home() {
  return (
    <div>
      <main
        className={css({ color: 'yellow.800', textStyle: 'Heading.primary' })}
      >
        <SignIn />
      </main>
    </div>
  );
}
