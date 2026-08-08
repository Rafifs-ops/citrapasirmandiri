import { verifyAccessToken } from './jwt';

export const requireAuth = (event: any) => {
  const accessToken = getCookie(event, 'access_token');

  if (!accessToken) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const decoded = verifyAccessToken(accessToken);

  if (!decoded) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid or expired token',
    });
  }

  return decoded;
};
