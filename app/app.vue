<script setup lang="ts">
// SEO Meta configuration moved to pages/index.vue to be more dynamic if needed, 
// or can be kept here if global.
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import "~/assets/css/tailwind.css";

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100;
}

::-webkit-scrollbar-thumb {
  @apply bg-primary/20 rounded-full border-2 border-transparent bg-clip-content;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-primary/40;
}

/* Base Styles */
html {
  scroll-behavior: smooth;
}
</style>
