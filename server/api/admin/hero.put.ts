import { requireAuth } from '../../utils/auth';
import prisma from '../../utils/prisma';

/**
 * Update Data Hero
 * 
 * @param event 
 */
export default defineEventHandler(async (event) => {
  requireAuth(event); // Memastikan user sudah login

  const body = await readBody(event); // Mengambil data body dari request

  // Query Prisma ORM Update data berdasarkan Id
  const updatedHero = await prisma.hero.update({
    where: { id: 1 },
    data: {
      badgeText: body.badgeText,
      title: body.title,
      titleAccent: body.titleAccent,
      description: body.description,
      image: body.image
    }
  });

  // Mengembalikan data yang sudah diupdate
  return updatedHero;
});
