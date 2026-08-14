import { requireAuth } from '../../utils/auth';
import prisma from '../../utils/prisma';

/**
 * Get All Data Services
 * 
 * @param event 
 */
export default defineEventHandler(async (event) => {
  requireAuth(event); // Memastikan user sudah login, bisa lgsg throw error 401 jika token auth kadaluwarsa

  // Query Prisma ORM Get All Data Services
  const services = await prisma.service.findMany({
    orderBy: { id: 'asc' } // Mengurutkan data berdasarkan Id
  });

  // Mengembalikan data yang sudah diupdate
  return services.map(service => ({
    ...service,
    features: JSON.parse(service.features),
    specs: JSON.parse(service.specs)
  }));
});
