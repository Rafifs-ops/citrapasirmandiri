<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 class="text-lg font-bold text-gray-700 mb-2">Total Services</h3>
        <p class="text-4xl font-bold text-primary">{{ servicesCount }}</p>
        <div class="mt-4">
          <NuxtLink to="/admin/services" class="text-sm text-accent hover:underline">Manage Services &rarr;</NuxtLink>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 class="text-lg font-bold text-gray-700 mb-2">Landing Page</h3>
        <p class="text-gray-500 text-sm mb-4">Edit konten halaman utama website Anda agar selalu up-to-date.</p>
        <div class="flex gap-4">
          <NuxtLink to="/admin/hero" class="text-sm text-accent hover:underline">Edit Hero</NuxtLink>
          <NuxtLink to="/admin/about" class="text-sm text-accent hover:underline">Edit About</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
});

const servicesCount = ref(0);

onMounted(async () => {
  try {
    const { data } = await useFetch('/api/content');
    if (data.value && data.value.services) {
      servicesCount.value = data.value.services.length;
    }
  } catch (error) {
    console.error(error);
  }
});
</script>
