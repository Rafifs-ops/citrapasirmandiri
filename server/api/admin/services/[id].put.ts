import { requireAuth } from '../../../utils/auth';
import prisma from '../../../utils/prisma';

export default defineEventHandler(async (event) => {
  requireAuth(event);

  const id = parseInt(getRouterParam(event, 'id') || '0', 10);
  const body = await readBody(event);

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

  return {
    ...updatedService,
    features: JSON.parse(updatedService.features),
    specs: JSON.parse(updatedService.specs)
  };
});
