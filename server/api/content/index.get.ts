import prisma from '../../utils/prisma';

/**
 * Get All Content
 * 
 * @param event 
 */
export default defineEventHandler(async (event) => {
  try {
    const hero = await prisma.hero.findFirst(); // Query Prisma ORM Mencari Data Hero
    const about = await prisma.about.findFirst(); // Query Prisma ORM Mencari Data About
    const servicesData = await prisma.service.findMany({ // Query Prisma ORM Mencari Data Services
      orderBy: { id: 'asc' }
    });

    // Parse JSON strings back to objects
    const aboutParsed = about ?
      {
        ...about,
        features: JSON.parse(about.features)
      } : null;

    const services = servicesData.map(service => ({
      ...service,
      features: JSON.parse(service.features),
      specs: JSON.parse(service.specs)
    }));

    // Mengembalikan data hero, about, dan services
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
