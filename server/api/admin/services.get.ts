import { requireAuth } from '../../utils/auth';
import prisma from '../../utils/prisma';

export default defineEventHandler(async (event) => {
  requireAuth(event);

  const services = await prisma.service.findMany({
    orderBy: { id: 'asc' }
  });

  return services.map(service => ({
    ...service,
    features: JSON.parse(service.features),
    specs: JSON.parse(service.specs)
  }));
});
