export const DEFAULT_CREDENTIALS = {
  email: 'test@example.com',
  password: 'Test123!',
} as const;

export const AUTH_CONFIG = {
  tokenKey: 'auth_token',
  refreshTokenKey: 'refresh_token',
  tokenExpiry: 60 * 60 * 1000, // 1 hour
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
} as const;