import { defineStore } from 'pinia';
import { ref } from 'vue';
import { navigateTo } from '#app';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any>(null);
  const isLogin = ref<boolean>(false);

  const setAuth = (userData: any) => {
    user.value = userData;
    isLogin.value = true;
  };

  const clearAuth = () => {
    user.value = null;
    isLogin.value = false;
  };

  const fetchSession = async () => {
    try {
      const data = await $fetch('/api/auth/me');
      if (data && data.isLogin) {
        setAuth(data);
      }
    } catch (error) {
      clearAuth(); // Menghapus seluruh kredensial auth dan mengubah status login menjadi false
    }
  };

  const logout = async () => {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' });
      clearAuth();
      navigateTo('/login');
    } catch (error: any) {
      console.error('Logout failed', error.statusMessage);
    }
  };

  return {
    user,
    isLogin,
    setAuth,
    clearAuth,
    fetchSession,
    logout
  };
});
