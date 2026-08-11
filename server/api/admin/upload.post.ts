import { requireAuth } from '../../utils/auth';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * Upload Image
 * 
 * @param event 
 */
export default defineEventHandler(async (event) => {
  requireAuth(event); // Memastikan user sudah login

  const multipart = await readMultipartFormData(event); // Mengambil gambar dalam format multipart/form-data dari request

  // Mengembalikan pesan error jika tidak ada file
  if (!multipart || multipart.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' });
  }

  const uploadedFile = multipart.find(field => field.name === 'image'); // Mencari file gambar

  // Mengembalikan pesan error jika format file tidak valid
  if (!uploadedFile || !uploadedFile.filename || !uploadedFile.data) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid file format' });
  }

  // Memastikan nama file unik
  const filename = `${Date.now()}-${uploadedFile.filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

  // Path Direktori Gambar
  const storagePath = path.resolve(process.cwd(), 'storage/images');

  // Path Direktori Gambar
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
