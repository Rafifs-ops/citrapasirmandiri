import { requireAuth } from '../../../utils/auth';
import prisma from '../../../utils/prisma';

/**
 * Update Data Services
 * 
 * @param event 
 */
export default defineEventHandler(async (event) => {
  requireAuth(event); // Memastikan user sudah login

  const id = parseInt(getRouterParam(event, 'id') || '0', 10); // Mendapatkan Id dari parameter URL
  const body = await readBody(event); // Mengambil data body dari request

  // Query Prisma ORM Update data berdasarkan Id
  const updatedService = await prisma.service.update({
    where: { id },
    data: {
      title: body.title,
      description: body.description,
      details: body.details,
      icon: body.icon,
      image: body.image,
      features: JSON.stringify(body.features),
      specs: JSON.stringify(body.specs)
    }
  });

  // Mengembalikan data yang sudah diupdate
  return {
    ...updatedService,
    features: JSON.parse(updatedService.features),
    specs: JSON.parse(updatedService.specs)
  };
});
