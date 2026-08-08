<script setup lang="ts">
import { onMounted } from 'vue'
import { ArrowRight, Printer, Zap, CheckCircle } from 'lucide-vue-next'
import gsap from 'gsap'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

  tl.from('.hero-badge', { opacity: 0, y: 20, duration: 0.8 })
    .from('.hero-title', { opacity: 0, y: 40, duration: 1, stagger: 0.2 }, '-=0.4')
    .from('.hero-desc', { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
    .from('.hero-btns', { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
    .from('.hero-image', { opacity: 0, scale: 0.9, duration: 1.2, ease: 'expo.out' }, '-=1')
    .from('.hero-stats', { opacity: 0, y: 30, duration: 0.8 }, '-=0.8')
})
</script>

<template>
  <section id="home" class="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center">
    <!-- Background Decor -->
    <div
      class="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10">
    </div>
    <div
      class="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl -z-10">
    </div>

    <div class="container mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Text Content -->
        <div class="z-10">
          <div
            class="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent font-semibold text-sm mb-6">
            <Zap :size="16" />
            {{ data.badgeText }}
          </div>

          <h1 class="hero-title text-5xl md:text-7xl font-bold text-primary leading-[1.1] mb-6">
            {{ data.title }} <br />
            <span class="text-accent">{{ data.titleAccent }}</span>
          </h1>

          <p class="hero-desc text-lg md:text-xl text-gray-600 mb-10 max-w-xl leading-relaxed">
            {{ data.description }}
          </p>

          <div class="hero-btns flex flex-wrap gap-4 mb-12">
            <a href="#layanan" class="btn-primary px-8 py-4 text-lg">
              Pesan Sekarang
              <ArrowRight :size="20" />
            </a>
            <a href="#tentang" class="btn-outline px-8 py-4 text-lg">
              Lihat Layanan
            </a>
          </div>

          <div class="hero-stats grid grid-cols-3 gap-8 border-t border-gray-100 pt-8">
            <div class="flex flex-col">
              <span class="text-3xl font-bold text-primary">10+</span>
              <span class="text-sm text-gray-500 uppercase tracking-wider font-semibold">Tahun Pengalaman</span>
            </div>
            <div class="flex flex-col">
              <span class="text-3xl font-bold text-primary">5k+</span>
              <span class="text-sm text-gray-500 uppercase tracking-wider font-semibold">Project Selesai</span>
            </div>
            <div class="flex flex-col">
              <span class="text-3xl font-bold text-primary">99%</span>
              <span class="text-sm text-gray-500 uppercase tracking-wider font-semibold">Kepuasan Pelanggan</span>
            </div>
          </div>
        </div>

        <!-- Visual Content -->
        <div class="relative hero-image">
          <div class="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
            <img :src="data.image" alt="Hero Image"
              class="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700" />
          </div>

          <!-- Floating Cards -->
          <div
            class="absolute -top-10 -right-10 bg-white p-6 rounded-xl shadow-xl z-20 hidden md:block animate-bounce-slow">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <CheckCircle :size="24" />
              </div>
              <div>
                <p class="text-sm font-bold text-primary leading-none">Kualitas HD</p>
                <p class="text-xs text-gray-500">Warna Tajam & Presisi</p>
              </div>
            </div>
          </div>

          <div
            class="absolute -bottom-6 -left-6 bg-primary p-6 rounded-xl shadow-xl z-20 hidden md:block animate-float">
            <div class="flex items-center gap-4 text-white">
              <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Printer :size="24" />
              </div>
              <div>
                <p class="text-sm font-bold leading-none">Express Delivery</p>
                <p class="text-xs text-white/70">Selesai dalam waktu cepat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-15px);
  }
}

@keyframes bounce-slow {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 5s ease-in-out infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 4s ease-in-out infinite;
}
</style>
