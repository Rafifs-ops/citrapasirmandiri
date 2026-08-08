<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10">
      <div class="h-16 flex items-center px-6 border-b border-gray-200">
        <h1 class="text-xl font-bold text-primary">Admin Panel</h1>
      </div>
      <div class="flex-1 overflow-y-auto py-4">
        <nav class="space-y-1 px-3">
          <NuxtLink to="/admin" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-primary hover:bg-gray-50" active-class="bg-gray-100 text-primary">
            Dashboard
          </NuxtLink>
          <NuxtLink to="/admin/hero" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-primary hover:bg-gray-50" active-class="bg-gray-100 text-primary">
            Hero Section
          </NuxtLink>
          <NuxtLink to="/admin/about" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-primary hover:bg-gray-50" active-class="bg-gray-100 text-primary">
            About Section
          </NuxtLink>
          <NuxtLink to="/admin/services" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-primary hover:bg-gray-50" active-class="bg-gray-100 text-primary" :class="{ 'bg-gray-100 text-primary': $route.path.includes('/admin/services') }">
            Services
          </NuxtLink>
        </nav>
      </div>
      <div class="p-4 border-t border-gray-200">
        <div class="mb-4">
          <p class="text-xs text-gray-500 uppercase tracking-wider font-semibold">Logged in as</p>
          <p class="text-sm font-bold text-gray-800">{{ authStore.user?.username }}</p>
        </div>
        <button 
          @click="handleLogout"
          class="w-full bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded text-sm font-medium transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 ml-64 flex flex-col min-h-screen">
      <header class="h-16 bg-white border-b border-gray-200 flex items-center px-8 justify-between shrink-0 sticky top-0 z-10">
        <h2 class="text-lg font-medium text-gray-800">{{ pageTitle }}</h2>
        <a href="/" target="_blank" class="text-sm font-medium text-accent hover:underline">View Live Site</a>
      </header>
      <main class="flex-1 p-8 overflow-y-auto">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';
import { computed } from 'vue';
import { useRoute } from '#app';

const authStore = useAuthStore();
const route = useRoute();

const handleLogout = () => {
  authStore.logout();
};

const pageTitle = computed(() => {
  const path = route.path;
  if (path === '/admin') return 'Dashboard';
  if (path.includes('/admin/hero')) return 'Manage Hero Section';
  if (path.includes('/admin/about')) return 'Manage About Section';
  if (path.includes('/admin/services')) return 'Manage Services';
  return 'Admin';
});
</script>
