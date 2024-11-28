import { API_ENDPOINTS } from '@/constants';
import {
  type AuthResponseSuccess,
  type UserRegisterData,
} from '@/modules/auth/register/types';
import axios, { type AxiosResponse } from 'axios';

/**
 * Service to register a new user
 * @param {UserRegisterData} userRegisterData - The user register data
 * @returns {Promise<AxiosResponse<AuthResponseSuccess>>} The register response containing the session
 */
export async function register(
  userRegisterData: UserRegisterData
): Promise<AxiosResponse<AuthResponseSuccess>> {
  return await axios.post(API_ENDPOINTS.REGISTER, userRegisterData, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}
