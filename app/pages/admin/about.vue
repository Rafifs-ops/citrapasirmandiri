<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-4xl">
    <div v-if="successMsg" class="mb-4 bg-green-50 text-green-700 p-4 rounded-lg flex items-center">
      {{ successMsg }}
    </div>
    
    <form @submit.prevent="saveAbout" v-if="form">
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input v-model="form.title" type="text" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
          <input v-model="form.subtitle" type="text" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none">
        </div>
      </div>
      
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea v-model="form.description" required rows="4" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"></textarea>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <input v-model="form.address" type="text" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none">
      </div>

      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-1">Map Embed URL (src)</label>
        <input v-model="form.mapUrl" type="text" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none font-mono text-sm">
      </div>

      <div class="mb-8 border-t border-gray-100 pt-6">
        <div class="flex items-center justify-between mb-4">
          <label class="block text-sm font-medium text-gray-700">Features</label>
          <button type="button" @click="addFeature" class="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded font-medium">
            + Add Feature
          </button>
        </div>
        
        <div class="space-y-4">
          <div v-for="(feature, index) in form.features" :key="index" class="p-4 border border-gray-200 rounded-lg bg-gray-50 flex gap-4">
            <div class="flex-1 grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Title</label>
                <input v-model="feature.title" type="text" required class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm">
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Lucide Icon Name</label>
                <input v-model="feature.icon" type="text" required class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm">
              </div>
              <div class="col-span-2">
                <label class="block text-xs text-gray-500 mb-1">Text/Description</label>
                <input v-model="feature.text" type="text" required class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm">
              </div>
              <div class="col-span-2">
                <label class="block text-xs text-gray-500 mb-1">Color Theme (e.g. blue, green, purple)</label>
                <input v-model="feature.color" type="text" required class="w-full border border-gray-300 rounded px-3 py-1.5 text-sm">
              </div>
            </div>
            <div class="flex flex-col justify-center">
              <button type="button" @click="removeFeature(index)" class="text-red-500 p-2 hover:bg-red-50 rounded" title="Remove">
                &times;
              </button>
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
    if (data.value && data.value.about) {
      form.value = { 
        ...data.value.about,
        features: Array.isArray(data.value.about.features) ? data.value.about.features : []
      };
    }
  } catch (err) {
    console.error(err);
  }
});

const addFeature = () => {
  form.value.features.push({ title: '', text: '', icon: 'Check', color: 'blue' });
};

const removeFeature = (index) => {
  form.value.features.splice(index, 1);
};

const saveAbout = async () => {
  isSaving.value = true;
  successMsg.value = '';
  try {
    await $fetch('/api/admin/about', {
      method: 'PUT',
      body: form.value
    });
    successMsg.value = 'About section updated successfully!';
    setTimeout(() => successMsg.value = '', 3000);
  } catch (err) {
    alert('Failed to save');
    console.error(err);
  } finally {
    isSaving.value = false;
  }
};
</script>
