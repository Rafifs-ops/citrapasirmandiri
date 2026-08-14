<template>
  <section class="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center">
    <div class="container mx-auto px-6 animate-pulse">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Text Content Skeleton -->
        <div class="z-10">
          <div class="h-8 bg-gray-200 rounded-full w-32 mb-6"></div>
          <div class="h-16 bg-gray-200 rounded-lg w-full mb-4"></div>
          <div class="h-16 bg-gray-200 rounded-lg w-3/4 mb-6"></div>
          
          <div class="h-6 bg-gray-200 rounded w-full mb-2"></div>
          <div class="h-6 bg-gray-200 rounded w-5/6 mb-10"></div>
          
          <div class="flex flex-wrap gap-4 mb-12">
            <div class="h-16 bg-gray-200 rounded-lg w-48"></div>
            <div class="h-16 bg-gray-200 rounded-lg w-40"></div>
          </div>
          
          <div class="grid grid-cols-3 gap-8 border-t border-gray-100 pt-8">
            <div v-for="i in 3" :key="i" class="flex flex-col gap-2">
              <div class="h-10 bg-gray-200 rounded w-16"></div>
              <div class="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>
        
        <!-- Visual Content Skeleton -->
        <div class="relative">
          <div class="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white bg-gray-200 aspect-[4/3]"></div>
          
          <div class="absolute -top-10 -right-10 bg-white p-6 rounded-xl shadow-xl z-20 hidden md:block w-48">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div class="flex-1">
                <div class="h-4 bg-gray-200 rounded w-full mb-1"></div>
                <div class="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
          
          <div class="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl z-20 hidden md:block w-56">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div class="flex-1">
                <div class="h-4 bg-gray-200 rounded w-full mb-1"></div>
                <div class="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
