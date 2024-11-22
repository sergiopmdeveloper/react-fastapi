import { API_ENDPOINTS } from '@/constants';
import { type LoginSuccessResponse, type UserCredentials } from '@/types/login';
import axios, { type AxiosResponse } from 'axios';

/**
 * Service to logs the user in
 * @param {UserCredentials} userCredentials - The user credentials
 * @returns {Promise<AxiosResponse<LoginSuccessResponse>>} The login response containing the token
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
