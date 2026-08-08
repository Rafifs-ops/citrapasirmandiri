import { promises as fs } from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const pathname = getRouterParam(event, 'pathname');
  
  if (!pathname) {
    throw createError({ statusCode: 400, statusMessage: 'Path is required' });
  }

  // Resolve the image path inside the storage folder
  const storagePath = path.resolve(process.cwd(), 'storage');
  const imagePath = path.join(storagePath, pathname);

  // Security check to ensure the resolved path is within the storage directory
  if (!imagePath.startsWith(storagePath)) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' });
  }

  try {
    // Check if file exists and get stats
    const stats = await fs.stat(imagePath);
    
    if (!stats.isFile()) {
      throw createError({ statusCode: 404, statusMessage: 'File not found' });
    }

    // Determine content type based on extension
    const ext = path.extname(imagePath).toLowerCase();
    let contentType = 'application/octet-stream';
    if (ext === '.png') contentType = 'image/png';
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.svg') contentType = 'image/svg+xml';
    else if (ext === '.gif') contentType = 'image/gif';

    setHeader(event, 'Content-Type', contentType);
    
    // Read and return the file
    const file = await fs.readFile(imagePath);
    return file;
    
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      throw createError({ statusCode: 404, statusMessage: 'Image not found' });
    }
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
});
