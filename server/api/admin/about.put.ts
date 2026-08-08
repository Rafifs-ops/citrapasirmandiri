import { requireAuth } from '../../utils/auth';
import prisma from '../../utils/prisma';

export default defineEventHandler(async (event) => {
  requireAuth(event);

  const body = await readBody(event);
  
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

  return {
    ...updatedAbout,
    features: JSON.parse(updatedAbout.features)
  };
});
