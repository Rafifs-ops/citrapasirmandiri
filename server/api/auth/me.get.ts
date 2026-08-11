import { verifyAccessToken } from '../../utils/jwt';

/**
 * Get Current User
 * 
 * @param event 
 */
export default defineEventHandler(async (event) => {
  const accessToken = getCookie(event, 'access_token'); // Mengambil cookie access_token

  // Mengembalikan pesan error jika tidak ada cookie access_token
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

  // Mengembalikan data user
  return {
    ...decoded,
    isLogin: true,
  };
});
