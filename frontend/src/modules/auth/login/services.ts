import { API_ENDPOINTS } from '@/constants';
import {
  type LoginResponseSuccess,
  type UserLoginData,
} from '@/modules/auth/login/types';
import axios, { type AxiosResponse } from 'axios';

/**
 * Service to logs the user in
 * @param {UserLoginData} userLoginData - The user login data
 * @returns {Promise<AxiosResponse<LoginResponseSuccess>>} The login response containing the token
 */
export async function login(
  userLoginData: UserLoginData
): Promise<AxiosResponse<LoginResponseSuccess>> {
  return await axios.post(
    API_ENDPOINTS.LOGIN,
    new URLSearchParams({
      username: userLoginData.email,
      password: userLoginData.password,
    }),
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
}
