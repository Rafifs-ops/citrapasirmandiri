import jwt from 'jsonwebtoken';

/**
 * Generate Tokens
 * 
 * @param user 
 */
export const generateTokens = (user: any) => {
  const config = useRuntimeConfig();
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role
  };

  const accessToken = jwt.sign(payload, config.jwtAccessSecret, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, config.jwtRefreshSecret, { expiresIn: '7d' });

  return { accessToken, refreshToken };
};

/**
 * Verify Access Token
 * 
 * @param token 
 */
export const verifyAccessToken = (token: string) => {
  const config = useRuntimeConfig();
  try {
    return jwt.verify(token, config.jwtAccessSecret) as jwt.JwtPayload;
  } catch (error) {
    return null;
  }
};

/**
 * Verify Refresh Token
 * 
 * @param token 
 */
export const verifyRefreshToken = (token: string) => {
  const config = useRuntimeConfig();
  try {
    return jwt.verify(token, config.jwtRefreshSecret) as jwt.JwtPayload;
  } catch (error) {
    return null;
  }
};
