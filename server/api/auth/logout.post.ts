/**
 * Logout User
 * 
 * @param event 
 */
export default defineEventHandler((event) => {
  deleteCookie(event, 'access_token', { path: '/' }); // Menghapus cookie access_token
  deleteCookie(event, 'refresh_token', { path: '/' }); // Menghapus cookie refresh_token

  // Mengembalikan pesan sukses
  return {
    message: 'Logged out successfully'
  };
});
