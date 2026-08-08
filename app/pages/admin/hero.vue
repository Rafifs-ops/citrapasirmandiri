<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-3xl">
    <div v-if="successMsg" class="mb-4 bg-green-50 text-green-700 p-4 rounded-lg flex items-center">
      {{ successMsg }}
    </div>
    
    <form @submit.prevent="saveHero" v-if="form">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
        <input v-model="form.badgeText" type="text" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
      </div>
      
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input v-model="form.title" type="text" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Title Accent</label>
          <input v-model="form.titleAccent" type="text" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
        </div>
      </div>
      
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea v-model="form.description" required rows="4" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"></textarea>
      </div>

      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Image</label>
        <div class="flex items-start gap-6">
          <div v-if="form.image" class="w-48 h-32 rounded-lg overflow-hidden border border-gray-200 shrink-0 bg-gray-50">
            <img :src="form.image" class="w-full h-full object-cover">
          </div>
          <div class="flex-1">
            <input type="file" accept="image/*" @change="handleFileUpload" class="w-full border border-gray-300 rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 text-sm">
            <p class="text-xs text-gray-500 mt-2">Upload a new image to replace the current one. Max size 2MB.</p>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <button type="submit" :disabled="isSaving" class="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50">
          {{ isSaving ? 'Saving...' : 'Save Changes' }}
        </button>
      </div>
    </form>
    <div v-else class="py-8 text-center text-gray-500">Loading data...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
});

const form = ref(null);
const isSaving = ref(false);
const successMsg = ref('');

onMounted(async () => {
  try {
    const { data } = await useFetch('/api/content');
    if (data.value && data.value.hero) {
      form.value = { ...data.value.hero };
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

const saveHero = async () => {
  isSaving.value = true;
  successMsg.value = '';
  try {
    await $fetch('/api/admin/hero', {
      method: 'PUT',
      body: form.value
    });
    successMsg.value = 'Hero section updated successfully!';
    setTimeout(() => successMsg.value = '', 3000);
  } catch (err) {
    alert('Failed to save');
    console.error(err);
  } finally {
    isSaving.value = false;
  }
};
</script>
