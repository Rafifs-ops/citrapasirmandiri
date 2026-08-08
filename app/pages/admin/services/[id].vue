<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-4xl">
    <div class="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
      <h2 class="text-xl font-bold text-gray-800">Edit Service</h2>
      <NuxtLink to="/admin/services" class="text-sm text-gray-500 hover:text-primary">&larr; Back to list</NuxtLink>
    </div>

    <div v-if="successMsg" class="mb-4 bg-green-50 text-green-700 p-4 rounded-lg flex items-center">
      {{ successMsg }}
    </div>

    <form @submit.prevent="saveService" v-if="form">
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input v-model="form.title" type="text" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Icon (Lucide Name)</label>
          <input v-model="form.icon" type="text" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none">
        </div>
      </div>
      
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
        <textarea v-model="form.description" required rows="2" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"></textarea>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
        <textarea v-model="form.details" required rows="3" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"></textarea>
      </div>

      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Image</label>
        <div class="flex items-start gap-6">
          <div v-if="form.image" class="w-32 h-32 rounded-lg overflow-hidden border border-gray-200 shrink-0 bg-gray-50">
            <img :src="form.image" class="w-full h-full object-cover">
          </div>
          <div class="flex-1">
            <input type="file" accept="image/*" @change="handleFileUpload" class="w-full border border-gray-300 rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 text-sm">
          </div>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-8 mb-8 border-t border-gray-100 pt-6">
        <!-- Features List -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <label class="block text-sm font-medium text-gray-700">Features</label>
            <button type="button" @click="addFeature" class="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded">
              + Add Feature
            </button>
          </div>
          <div class="space-y-2">
            <div v-for="(feature, index) in form.features" :key="index" class="flex gap-2">
              <input v-model="form.features[index]" type="text" class="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm" placeholder="Feature item">
              <button type="button" @click="removeFeature(index)" class="text-red-500 hover:bg-red-50 px-2 rounded">&times;</button>
            </div>
          </div>
        </div>

        <!-- Specs Form -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-4">Specifications</label>
          <div class="space-y-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Min. Order</label>
              <input v-model="form.specs.minOrder" type="text" class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm">
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Process Time</label>
              <input v-model="form.specs.processTime" type="text" class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm">
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Quality</label>
              <input v-model="form.specs.quality" type="text" class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm">
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <button type="submit" :disabled="isSaving" class="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50">
          {{ isSaving ? 'Saving...' : 'Save Changes' }}
        </button>
      </div>
    </form>
    <div v-else class="py-8 text-center text-gray-500">Loading service data...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from '#app';

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
});

const route = useRoute();
const id = route.params.id;

const form = ref(null);
const isSaving = ref(false);
const successMsg = ref('');

onMounted(async () => {
  try {
    const { data } = await useFetch('/api/admin/services');
    if (data.value) {
      const service = data.value.find(s => s.id === parseInt(id));
      if (service) {
        form.value = { ...service };
      } else {
        alert('Service not found');
      }
    }
  } catch (err) {
    console.error(err);
  }
});

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('image', file);

  try {
    const data = await $fetch('/api/admin/upload', {
      method: 'POST',
      body: formData
    });
    
    if (data && data.url) {
      form.value.image = data.url;
    }
  } catch (err) {
    alert('Upload failed');
    console.error(err);
  }
};

const addFeature = () => form.value.features.push('');
const removeFeature = (index) => form.value.features.splice(index, 1);

const saveService = async () => {
  isSaving.value = true;
  successMsg.value = '';
  try {
    await $fetch(`/api/admin/services/${id}`, {
      method: 'PUT',
      body: form.value
    });
    successMsg.value = 'Service updated successfully!';
    setTimeout(() => successMsg.value = '', 3000);
  } catch (err) {
    alert('Failed to save');
    console.error(err);
  } finally {
    isSaving.value = false;
  }
};
</script>
