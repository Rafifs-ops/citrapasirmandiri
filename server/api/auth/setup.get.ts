import prisma from '../../utils/prisma';
import bcrypt from 'bcryptjs';

export default defineEventHandler(async () => {
  const existingUser = await prisma.user.findFirst();
  
  if (existingUser) {
    return { message: 'Admin user already exists' };
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const user = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    }
  });

  return { message: 'Admin user created successfully. Username: admin, Password: admin123' };
});
