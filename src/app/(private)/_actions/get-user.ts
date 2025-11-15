import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from '@/db/client';
import { auth } from '@/lib/auth';

export const getUser = async () => {
  // BetterAuth APIを使用
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    console.info('user not logged in');
    return redirect('/login');
  }
  const { email } = session.user;
  if (!email) {
    console.error('user email not found');
    return redirect('/login');
  }

  const user = await db.query.users.findFirst({
    columns: {
      id: true,
    },
    where: (users, { eq }) => eq(users.email, email),
  });
  if (!user) {
    console.error('user not found in db');
    return redirect('/login');
  }
  return user;
};
