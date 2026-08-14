<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Services</h2>
      <NuxtLink to="/admin/services/create"
        class="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors">
        + Add Service
      </NuxtLink>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Service</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description</th>
            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <template v-if="pending">
            <tr v-for="i in 3" :key="`skeleton-${i}`" class="animate-pulse">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 bg-gray-200 rounded"></div>
                  <div class="ml-4">
                    <div class="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div class="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="h-4 bg-gray-200 rounded w-48"></div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <div class="flex justify-end gap-4">
                  <div class="h-4 bg-gray-200 rounded w-8"></div>
                  <div class="h-4 bg-gray-200 rounded w-12"></div>
                </div>
              </td>
            </tr>
          </template>
          <tr v-else-if="!services || services.length === 0">
            <td colspan="3" class="px-6 py-8 text-center text-gray-500">No services found.</td>
          </tr>
          <tr v-for="service in services" :key="service.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <img class="h-10 w-10 rounded object-cover" :src="service.image" alt="" />
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ service.title }}</div>
                  <div class="text-sm text-gray-500">Icon: {{ service.icon }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-gray-900 truncate max-w-xs">{{ service.description }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <NuxtLink :to="`/admin/services/${service.id}`" class="text-accent hover:text-accent/80 mr-4">Edit
              </NuxtLink>
              <button @click="deleteService(service.id)" class="text-red-600 hover:text-red-900">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['auth']
});

const { data: services, pending, error, refresh } = useFetch('/api/admin/services', { lazy: true });

if (error.value && error.value.statusCode === 401) {
  navigateTo('/login');
}

const deleteService = async (id) => {
  if (!confirm('Are you sure you want to delete this service?')) return;

  try {
    await $fetch(`/api/admin/services/${id}`, {
      method: 'DELETE'
    });
    refresh();
  } catch (error) {
    if (error && error.statusCode === 401) {
      navigateTo('/login');
    }
    alert('Failed to delete');
    console.error(error);
  }
};
</script>
