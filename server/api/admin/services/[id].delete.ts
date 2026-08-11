import { requireAuth } from '../../../utils/auth';
import prisma from '../../../utils/prisma';

/**
 * Delete Data Services
 * 
 * @param event 
 */
export default defineEventHandler(async (event) => {
  requireAuth(event); // Memastikan user sudah login

  const id = parseInt(getRouterParam(event, 'id') || '0', 10); // Mendapatkan Id dari parameter URL

  // Query Prisma ORM Delete data berdasarkan Id
  await prisma.service.delete({
    where: { id }
  });

  return { message: 'Service deleted successfully' }; // Mengembalikan pesan sukses
});
