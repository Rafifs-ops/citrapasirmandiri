import { requireAuth } from '../../utils/auth';
import prisma from '../../utils/prisma';

export default defineEventHandler(async (event) => {
  requireAuth(event);

  const body = await readBody(event);
  
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

  return updatedHero;
});
