<script setup lang="ts">
import { ref, onMounted, watch, type PropType } from 'vue'
import { FileText, Monitor, CreditCard, BookOpen, Image, ChevronRight, X, Check, Clock, Shield, Award } from 'lucide-vue-next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const iconMap: Record<string, any> = {
  FileText, Monitor, CreditCard, BookOpen, Image, Check, Clock, Shield, Award
}

const props = defineProps({
  data: {
    type: Array as PropType<any[]>,
    required: true
  }
})

const servicesRoot = ref<HTMLElement | null>(null)
const isModalOpen = ref(false)
const selectedService = ref<any>(null)
const modalContent = ref(null)
const modalOverlay = ref(null)

const openModal = (service: any) => {
  selectedService.value = service
  isModalOpen.value = true

  // Disable scroll
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  const tl = gsap.timeline({
    onComplete: () => {
      isModalOpen.value = false
      selectedService.value = null
      document.body.style.overflow = ''
    }
  })

  tl.to(modalContent.value, {
    scale: 0.9,
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in'
  })
  tl.to(modalOverlay.value, {
    opacity: 0,
    duration: 0.2
  }, '-=0.2')
}

// Watch for modal open to animate in
watch(isModalOpen, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      const tl = gsap.timeline()
      tl.fromTo(modalOverlay.value,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 }
      )
      tl.fromTo(modalContent.value,
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' },
        '-=0.2'
      )
    }, 0)
  }
})

onMounted(() => {
  const ctx = gsap.context(() => {
    // Animate Header
    gsap.from('.services-header', {
      scrollTrigger: {
        trigger: '.services-header',
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out'
    })

    // Animate Cards individually for better reliability
    const cards = document.querySelectorAll('.service-card')
    cards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: (index % 3) * 0.1, // Small stagger within rows
        ease: 'power3.out'
      })
    })
  }, servicesRoot.value || undefined)

  // Refresh ScrollTrigger to account for image loads
  window.addEventListener('load', () => {
    ScrollTrigger.refresh()
  })
})
</script>

<template>
  <section id="layanan" ref="servicesRoot" class="py-24 bg-gray-50">
    <div class="container mx-auto px-6">
      <!-- Section Header -->
      <div class="services-header text-center mb-20">
        <h2 class="text-accent font-bold uppercase tracking-widest text-sm mb-4">Layanan Unggulan</h2>
        <h3 class="text-4xl md:text-5xl font-bold text-primary mb-6">Solusi Cetak Lengkap & Profesional</h3>
        <p class="text-gray-600 max-w-2xl mx-auto text-lg">
          Kami menyediakan berbagai macam layanan percetakan untuk mendukung kebutuhan promosi dan administrasi bisnis
          Anda.
        </p>
      </div>

      <!-- Services Grid -->
      <div class="services-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(service, index) in props.data" :key="index"
          class="service-card group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
          <!-- Image Container -->
          <div class="relative h-48 overflow-hidden">
            <img :src="service.image" :alt="service.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div
              class="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            </div>

            <!-- Icon Badge -->
            <div
              class="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
              <component :is="iconMap[service.icon]" :size="24" />
            </div>
          </div>

          <!-- Content -->
          <div class="p-8 pt-10">
            <h4 class="text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">
              {{ service.title }}
            </h4>
            <p class="text-gray-600 mb-8 leading-relaxed">
              {{ service.description }}
            </p>

            <button @click="openModal(service)"
              class="flex items-center gap-2 text-sm font-bold text-primary group/btn transition-colors hover:text-accent">
              <span>Detail Layanan</span>
              <div
                class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover/btn:bg-accent group-hover/btn:text-white transition-all">
                <ChevronRight :size="16" />
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Custom CTA -->
      <div
        class="mt-20 p-10 rounded-[2rem] bg-primary text-white flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
        <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div class="relative z-10">
          <h4 class="text-3xl font-bold mb-2">Punya Kebutuhan Cetak Lain?</h4>
          <p class="text-white/70">Konsultasikan gratis dengan tim ahli kami untuk hasil yang optimal.</p>
        </div>
        <a href="https://wa.me/6281234567890" target="_blank"
          class="relative z-10 bg-white text-primary px-10 py-4 rounded-full font-bold hover:bg-accent hover:text-white transition-all shadow-xl">
          Tanya Sekarang
        </a>
      </div>
    </div>

    <!-- Modal Detail Service -->
    <Teleport to="body">
      <div v-if="isModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
        <!-- Backdrop -->
        <div ref="modalOverlay" class="absolute inset-0 bg-primary/40 backdrop-blur-md" @click="closeModal"></div>

        <!-- Modal Content -->
        <div ref="modalContent"
          class="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
          <!-- Close Button -->
          <button @click="closeModal"
            class="absolute top-6 right-6 z-20 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all shadow-lg">
            <X :size="20" />
          </button>

          <!-- Left: Image -->
          <div class="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
            <img :src="selectedService?.image" :alt="selectedService?.title" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
            <div class="absolute bottom-8 left-8">
              <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-accent shadow-xl mb-4">
                <component :is="iconMap[selectedService?.icon]" :size="28" />
              </div>
              <h2 class="text-3xl font-bold text-white">{{ selectedService?.title }}</h2>
            </div>
          </div>

          <!-- Right: Details -->
          <div class="md:w-3/5 p-8 md:p-12 overflow-y-auto">
            <div class="mb-10">
              <h3 class="text-sm font-bold text-accent uppercase tracking-widest mb-3">Tentang Layanan</h3>
              <p class="text-gray-600 leading-relaxed text-lg">
                {{ selectedService?.details }}
              </p>
            </div>

            <div class="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <h3 class="text-sm font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Award :size="16" class="text-accent" />
                  Fitur Unggulan
                </h3>
                <ul class="space-y-3">
                  <li v-for="(feature, fIdx) in selectedService?.features" :key="fIdx"
                    class="flex items-start gap-3 text-gray-600">
                    <Check :size="18" class="text-green-500 shrink-0 mt-0.5" />
                    <span class="text-sm">{{ feature }}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 class="text-sm font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Clock :size="16" class="text-accent" />
                  Spesifikasi
                </h3>
                <div class="space-y-4">
                  <div v-for="(val, key) in selectedService?.specs" :key="key"
                    class="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <p class="text-[10px] text-gray-400 uppercase font-bold mb-1">{{ key === 'minOrder' ? 'Min. Order' :
                      key === 'processTime' ? 'Waktu Proses' : 'Kualitas' }}</p>
                    <p class="text-sm font-bold text-primary">{{ val }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-4">
              <a href="https://wa.me/6281234567890" target="_blank"
                class="flex-1 bg-primary text-white text-center py-4 rounded-2xl font-bold hover:bg-accent transition-all shadow-lg flex items-center justify-center gap-2">
                Pesan Sekarang
              </a>
              <button @click="closeModal"
                class="px-8 py-4 border-2 border-gray-100 text-gray-400 rounded-2xl font-bold hover:bg-gray-50 hover:text-primary transition-all">
                Kembali
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>
