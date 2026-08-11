import prisma from '../../utils/prisma';
import { generateTokens } from '../../utils/jwt';
import bcrypt from 'bcryptjs';

/**
 * Login User
 * 
 * @param event 
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event); // Mengambil data body dari request
  const { username, password } = body; // Mengambil username dan password dari body

  // Mengembalikan pesan error jika username atau password tidak diisi
  if (!username || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username and password are required',
    });
  }

  // Query Prisma ORM Mencari User berdasarkan Username
  const user = await prisma.user.findUnique({
    where: { username },
  });

  // Mengembalikan pesan error jika user tidak ditemukan
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid username or password',
    });
  }

  // Membandingkan Password dengan bcrypt.compare
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // Mengembalikan pesan error jika password tidak valid
  if (!isPasswordValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid username or password',
    });
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user); // From Utils/jwt.ts

  // Get runtime config
  const config = useRuntimeConfig(event);
  const isProduction = config.nodeEnv === 'production';

  // Set cookies
  setCookie(event, 'access_token', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 60 * 15, // 15 minutes
    path: '/',
  });

  setCookie(event, 'refresh_token', refreshToken, {
    httpOnly: true,
    secure: isProduction,
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
