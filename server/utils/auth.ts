import { verifyAccessToken } from './jwt';

/**
 * Verify Access Token
 * 
 * @param event 
 */
export const requireAuth = (event: any) => {
  const accessToken = getCookie(event, 'access_token'); // Mengambil access_token dari cookie

  // Mengembalikan pesan error jika tidak ada access_token
  if (!accessToken) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const decoded = verifyAccessToken(accessToken); // Verifikasi token from utils/jwt.ts

  // Mengembalikan pesan error jika token tidak valid
  if (!decoded) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid or expired token',
    });
  }

  return decoded;
};
