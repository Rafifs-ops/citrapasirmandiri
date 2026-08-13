import { useAuthStore } from '~/stores/auth';
import { defineNuxtRouteMiddleware, navigateTo } from '#app';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  // Jika server memberikan respon 401
  if (!authStore.isLogin) {
    return navigateTo('/login');
  }
});
