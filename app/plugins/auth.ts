import { defineNuxtPlugin } from '#app';
import { useAuthStore } from '~/stores/auth';

export default defineNuxtPlugin(async (nuxtApp) => {
  const authStore = useAuthStore();
  
  // Call fetchSession to initialize user state if they have a valid cookie
  // We only really need to do this on the server side to hydrate, or client side on first load
  await authStore.fetchSession();
});
