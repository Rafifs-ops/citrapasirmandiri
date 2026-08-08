import prisma from '../../utils/prisma';
import { generateTokens } from '../../utils/jwt';
import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username and password are required',
    });
  }

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid username or password',
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid username or password',
    });
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user);

  // Set cookies
  setCookie(event, 'access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 15, // 15 minutes
    path: '/',
  });

  setCookie(event, 'refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;

  return {
    message: 'Login successful',
    user: userWithoutPassword,
  };
});
