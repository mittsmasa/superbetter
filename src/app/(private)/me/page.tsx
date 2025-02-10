import { signOut } from '@/auth';
import { Button } from '@/components/button';
import { css } from '@/styled-system/css';

const Page = async (props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  return (
    <main
      className={css({
        display: 'flex',
        flexDirection: 'column',
        textStyle: 'Body.primary',
        height: '[100%]',
      })}
    >
      <div
        className={css({
          alignItems: 'center',
          display: 'flex',
          flex: '1',
          flexDirection: 'column',
          gap: '24px',
          justifyContent: 'center',
        })}
      >
        <h1 className={css({ textStyle: 'Heading.primary' })}>
          とりいそぎログアウトできるようにしたよ ↓
        </h1>
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/login' });
          }}
        >
          <Button type="submit">ログアウト</Button>
        </form>
      </div>
    </main>
  );
};

export default Page;
