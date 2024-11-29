import { API_ENDPOINTS } from '@/constants';
import { User } from '@/modules/user/types';
import axios from 'axios';

/**
 * Gets user by id
 * @param {string} userId - The user id
 * @param {string} token - The user token
 * @returns {Promise<User>} The user
 */
export default async function getUser(
  userId: string,
  token: string
): Promise<User> {
  const response = await axios.get(API_ENDPOINTS.USER, {
    params: {
      user_id: userId,
    },
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
