import { SignOut } from '@/components/google/signout';
import { css } from '@/styled-system/css';

export default function Home() {
  return (
    <div>
      <main
        className={css({ color: 'yellow.800', textStyle: 'Heading.primary' })}
      >
        main
        <SignOut />
      </main>
    </div>
  );
}
