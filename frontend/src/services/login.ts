import { API_ENDPOINTS } from '@/constants';
import { type LoginSuccessResponse, type UserCredentials } from '@/types/login';
import axios, { type AxiosResponse } from 'axios';

/**
 * Logs in the user
 * @param {UserCredentials} userCredentials - The user credentials
 * @returns {Promise<AxiosResponse<LoginSuccessResponse>>} The login response
 */
export async function login(
  userCredentials: UserCredentials
): Promise<AxiosResponse<LoginSuccessResponse>> {
  return await axios.post(
    API_ENDPOINTS.LOGIN,
    new URLSearchParams({
      username: userCredentials.email,
      password: userCredentials.password,
    }),
    {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
}
