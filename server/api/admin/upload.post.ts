import { requireAuth } from '../../utils/auth';
import { promises as fs } from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  requireAuth(event);

  const multipart = await readMultipartFormData(event);
  if (!multipart || multipart.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' });
  }

  const uploadedFile = multipart.find(field => field.name === 'image');
  if (!uploadedFile || !uploadedFile.filename || !uploadedFile.data) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid file format' });
  }

  // Ensure unique filename
  const filename = `${Date.now()}-${uploadedFile.filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const storagePath = path.resolve(process.cwd(), 'storage/images');
  const filePath = path.join(storagePath, filename);

  // Ensure directory exists
  await fs.mkdir(storagePath, { recursive: true });

  // Save the file
  await fs.writeFile(filePath, uploadedFile.data);

  // Return the public URL
  return {
    url: `/api/images/images/${filename}`
  };
});
