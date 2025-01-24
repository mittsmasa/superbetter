import { signOut } from '@/auth';
import { Button } from '@/components/button';
import { FooterNavigation } from '@/components/navigation';
import { css } from '@/styled-system/css';
import { use } from 'react';

const Page = (props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = use(props.params);
  const searchParams = use(props.searchParams);
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
      <div
        className={css({
          position: 'sticky',
          bottom: 0,
          padding: '8px',
          width: '[100%]',
        })}
      >
        <FooterNavigation />
      </div>
    </main>
  );
};

export default Page;
