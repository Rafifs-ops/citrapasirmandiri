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
  const oldImageField = multipart.find(field => field.name === 'oldImage'); // Mencari field gambar lama

  // Mengembalikan pesan error jika format file tidak valid
  if (!uploadedFile || !uploadedFile.filename || !uploadedFile.data) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid file format' });
  }

  // Path Direktori Gambar di public/images
  const storagePath = path.resolve(process.cwd(), 'public/images');

  // Proses hapus gambar lama jika ada
  if (oldImageField && oldImageField.data) {
    const oldImageUrl = oldImageField.data.toString();
    if (oldImageUrl) {
      // Ekstrak nama file dari URL (contoh URL: "/images/123-abc.jpg")
      const oldImageFilename = oldImageUrl.split('/').pop();
      if (oldImageFilename) {
        const oldImagePath = path.join(storagePath, oldImageFilename);
        try {
          await fs.access(oldImagePath);
          await fs.unlink(oldImagePath);
        } catch (error) {
          console.error('Gagal menghapus gambar lama:', error);
          // Abaikan error jika gambar lama tidak ditemukan
        }
      }
    }
  }

  // Memastikan nama file unik
  const filename = `${Date.now()}-${uploadedFile.filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

  // Path File Baru
  const filePath = path.join(storagePath, filename);

  // Ensure directory exists
  await fs.mkdir(storagePath, { recursive: true });

  // Save the file
  await fs.writeFile(filePath, uploadedFile.data);

  // Return the public URL
  return {
    url: `/images/${filename}`
  };
});
