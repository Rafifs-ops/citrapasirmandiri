import prisma from '../../utils/prisma';
import bcrypt from 'bcryptjs';

/**
 * Setup Admin User
 * 
 * @returns 
 */
export default defineEventHandler(async () => {
  const existingUser = await prisma.user.findFirst(); // Query Prisma ORM Mencari User berdasarkan Username

  // Mengembalikan pesan error jika user sudah ada
  if (existingUser) {
    return { message: 'Admin user already exists' };
  }

  const hashedPassword = await bcrypt.hash('admin123', 10); // Generate hash password

  // Query Prisma ORM Create User
  const user = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    }
  });

  // Mengembalikan pesan sukses
  return { message: 'Admin user created successfully. Username: admin, Password: admin123' };
});
