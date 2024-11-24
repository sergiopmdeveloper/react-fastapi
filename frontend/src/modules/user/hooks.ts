import { sessionAtom } from '@/modules/auth/states';
import { getSessionUserId } from '@/modules/auth/utils';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook to validate user ID
 * @param {string} userIdParam - User ID param
 */
export default function useValidateUserId(userIdParam: string) {
  const [session, _] = useAtom(sessionAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = getSessionUserId(session);

    if (userId !== userIdParam) {
      navigate(`/user/${userId}`);
    }
  }, [session]);
}
