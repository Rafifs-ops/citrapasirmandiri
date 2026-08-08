import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET || 'secret-access-key-for-dev-only';
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || 'secret-refresh-key-for-dev-only';

export const generateTokens = (user: any) => {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role
  };

  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as jwt.JwtPayload;
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as jwt.JwtPayload;
  } catch (error) {
    return null;
  }
};
