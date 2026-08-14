<template>
  <section class="py-24 bg-gray-50">
    <div class="container mx-auto px-6 animate-pulse">
      <!-- Section Header Skeleton -->
      <div class="text-center mb-20 flex flex-col items-center">
        <div class="h-4 bg-gray-200 rounded w-32 mb-4"></div>
        <div class="h-12 bg-gray-200 rounded-lg w-full max-w-xl mb-6"></div>
        <div class="h-6 bg-gray-200 rounded w-full max-w-2xl"></div>
      </div>

      <!-- Services Grid Skeleton -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="i in 6" :key="i" class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
          <div class="relative h-48 bg-gray-200">
            <div class="absolute bottom-6 right-6 w-12 h-12 bg-gray-300 rounded-2xl"></div>
          </div>
          <div class="p-8 pt-10">
            <div class="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-5/6 mb-8"></div>
            
            <div class="flex items-center gap-2">
              <div class="h-4 bg-gray-200 rounded w-24"></div>
              <div class="w-8 h-8 rounded-full bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Custom CTA Skeleton -->
      <div class="mt-20 p-10 rounded-[2rem] bg-gray-200 flex flex-col md:flex-row items-center justify-between gap-8 h-40">
        <div>
          <div class="h-8 bg-gray-300 rounded w-64 mb-2"></div>
          <div class="h-4 bg-gray-300 rounded w-80"></div>
        </div>
        <div class="w-48 h-14 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  </section>
</template>
