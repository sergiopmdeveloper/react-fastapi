export const API_URL = import.meta.env.VITE_API_URL || 'http://0.0.0.0:80';

export const API_ENDPOINTS = {
  LOGIN: `${API_URL}/auth/generate-token`,
};
