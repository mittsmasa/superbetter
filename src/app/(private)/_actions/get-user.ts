'server-only';

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { config } from '@/auth';
import { db } from '@/db/client';

export const getUser = async () => {
  const session = await getServerSession(config);
  if (!session?.user) {
    console.log(session);
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
