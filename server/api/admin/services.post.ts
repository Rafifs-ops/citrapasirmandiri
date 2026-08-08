import { requireAuth } from '../../utils/auth';
import prisma from '../../utils/prisma';

export default defineEventHandler(async (event) => {
  requireAuth(event);

  const body = await readBody(event);
  
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

  return {
    ...newService,
    features: JSON.parse(newService.features),
    specs: JSON.parse(newService.specs)
  };
});
