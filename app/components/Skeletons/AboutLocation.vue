<template>
  <section class="py-24 overflow-hidden">
    <div class="container mx-auto px-6 animate-pulse">
      <div class="grid lg:grid-cols-2 gap-20 items-center">
        <!-- About Content Skeleton -->
        <div>
          <div class="h-4 bg-gray-200 rounded w-24 mb-4"></div>
          <div class="h-12 bg-gray-200 rounded-lg w-full mb-2"></div>
          <div class="h-12 bg-gray-200 rounded-lg w-3/4 mb-8"></div>
          
          <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6 mb-10"></div>

          <div class="grid sm:grid-cols-2 gap-8 mb-10">
            <div v-for="i in 4" :key="i" class="flex gap-4">
              <div class="w-12 h-12 shrink-0 bg-gray-200 rounded-xl"></div>
              <div class="flex-1">
                <div class="h-5 bg-gray-200 rounded w-24 mb-2"></div>
                <div class="h-3 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Location Card Skeleton -->
        <div class="relative">
          <div class="bg-gray-100 rounded-[2.5rem] p-4 shadow-2xl border border-gray-50">
            <div class="rounded-[2rem] overflow-hidden h-[450px] bg-gray-200 relative">
              
              <!-- Floating Address Box Skeleton -->
              <div class="absolute bottom-6 left-6 right-6 bg-white p-6 rounded-2xl shadow-xl">
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 shrink-0 bg-gray-200 rounded-full"></div>
                  <div class="flex-1">
                    <div class="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div class="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div class="h-3 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div class="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
