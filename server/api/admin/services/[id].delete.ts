import { requireAuth } from '../../../utils/auth';
import prisma from '../../../utils/prisma';

export default defineEventHandler(async (event) => {
  requireAuth(event);

  const id = parseInt(getRouterParam(event, 'id') || '0', 10);

  await prisma.service.delete({
    where: { id }
  });

  return { message: 'Service deleted successfully' };
});
