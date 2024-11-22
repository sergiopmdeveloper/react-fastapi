import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

/**
 * Custom hook to validate user ID
 * @param {string} userIdParam - User ID param
 */
export default function useValidateUserId(userIdParam: string) {
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId !== userIdParam) {
      navigate(`/user/${userId}`);
    }
  }, []);
}
