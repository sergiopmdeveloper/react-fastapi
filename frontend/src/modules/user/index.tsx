import useAuth from '@/modules/auth/hooks';
import { getSessionToken } from '@/modules/auth/utils';
import useValidateUserId from '@/modules/user/hooks';
import getUser from '@/modules/user/services';
import Header from '@/shared/components/app/header';
import { Section } from '@/shared/components/app/section-layout';
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
    <div className="w-full">
      <Header />

      <Section>
        <h1 className="text-xl">
          Welcome back <strong>{query.data?.name}</strong>
        </h1>
      </Section>
    </div>
  );
}
