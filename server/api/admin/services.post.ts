import { requireAuth } from '../../utils/auth';
import prisma from '../../utils/prisma';

/**
 * Create New Data Services
 * 
 * @param event 
 */
export default defineEventHandler(async (event) => {
  requireAuth(event); // Memastikan user sudah login

  const body = await readBody(event); // Mengambil data body dari request

  // Query Prisma ORM Create Data Services
  const newService = await prisma.service.create({
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
    ...newService,
    features: JSON.parse(newService.features),
    specs: JSON.parse(newService.specs)
  };
});
