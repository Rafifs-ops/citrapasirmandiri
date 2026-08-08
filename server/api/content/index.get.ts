import prisma from '../../utils/prisma';

export default defineEventHandler(async (event) => {
  try {
    const hero = await prisma.hero.findFirst();
    const about = await prisma.about.findFirst();
    const servicesData = await prisma.service.findMany({
      orderBy: { id: 'asc' }
    });

    // Parse JSON strings back to objects
    const aboutParsed = about ? {
      ...about,
      features: JSON.parse(about.features)
    } : null;

    const services = servicesData.map(service => ({
      ...service,
      features: JSON.parse(service.features),
      specs: JSON.parse(service.specs)
    }));

    return {
      hero,
      about: aboutParsed,
      services
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching content',
    });
  }
});
