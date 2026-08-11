import { requireAuth } from '../../utils/auth';
import prisma from '../../utils/prisma';

/**
 * Update Data About
 * 
 * @param event 
 */
export default defineEventHandler(async (event) => {
  requireAuth(event); // Memastikan user sudah login

  const body = await readBody(event); // Mengambil data body dari request

  // Query Prisma ORM Update data berdasarkan Id
  const updatedAbout = await prisma.about.update({
    where: { id: 1 },
    data: {
      title: body.title,
      subtitle: body.subtitle,
      description: body.description,
      address: body.address,
      mapUrl: body.mapUrl,
      features: JSON.stringify(body.features)
    }
  });

  // Mengembalikan data yang sudah diupdate
  return {
    ...updatedAbout,
    features: JSON.parse(updatedAbout.features)
  };
});
