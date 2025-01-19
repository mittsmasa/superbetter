import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { db } from '../../../db/client';

export const getUser = async () => {
  const session = await auth();
  if (!session?.user) {
    console.error('user not logged in');
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
