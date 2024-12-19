import { storage } from '../storage';

export const clearAuthData = () => {
  storage.remove('user');
  storage.remove('auth_token');
  storage.remove('refresh_token');
};