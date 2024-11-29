import useAuth from '@/modules/auth/hooks';
import { getSessionToken } from '@/modules/auth/utils';
import useValidateUserId from '@/modules/user/hooks';
import getUser from '@/modules/user/services';
import { ThemeToggle } from '@/shared/components/app/theme-toggle';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

/**
 * User page
 */
export default function UserPage() {
  const { userId } = useParams<{ userId: string }>();
  const [userIdIsValid, setUserIdIsValid] = useState(false);
  const { session } = useAuth();

  useValidateUserId(userId as string, setUserIdIsValid);

  const query = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(userId as string, getSessionToken(session)),
    enabled: userIdIsValid,
  });

  return (
    <main>
      <section className="flex h-screen w-full flex-col items-center justify-center">
        <h1>{query.data?.name}</h1>
        <h1>{query.data?.email}</h1>
        <ThemeToggle />
      </section>
    </main>
  );
}
