<script setup lang="ts">
import { MapPin, Clock, ShieldCheck, Award, Navigation } from 'lucide-vue-next'
import gsap from 'gsap'

const iconMap: Record<string, any> = { MapPin, Clock, ShieldCheck, Award }

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

onMounted(() => {
  const ctx = gsap.context(() => {
    gsap.from('.about-text', {
      scrollTrigger: {
        trigger: '.about-text',
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      x: -50,
      duration: 1,
      ease: 'power3.out'
    })

    gsap.from('.location-card', {
      scrollTrigger: {
        trigger: '.location-card',
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      x: 50,
      duration: 1,
      ease: 'power3.out'
    })
  })
})
</script>

<template>
  <section id="tentang" class="about-section py-24 overflow-hidden">
    <div class="container mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-20 items-center">
        <!-- About Content -->
        <div class="about-text">
          <h2 class="text-accent font-bold uppercase tracking-widest text-sm mb-4">Tentang Kami</h2>
          <h3 class="text-4xl md:text-5xl font-bold text-primary mb-8 leading-tight">
            {{ data.title }} <br />
            {{ data.subtitle }}
          </h3>
          <p class="text-gray-600 text-lg mb-10 leading-relaxed">
            {{ data.description }}
          </p>

          <div class="grid sm:grid-cols-2 gap-8 mb-10">
            <div v-for="(feature, idx) in data.features" :key="idx" class="flex gap-4">
              <div :class="`w-12 h-12 shrink-0 bg-${feature.color}-50 rounded-xl flex items-center justify-center text-${feature.color}-600`">
                <component :is="iconMap[feature.icon]" :size="24" />
              </div>
              <div>
                <h5 class="font-bold text-primary mb-1">{{ feature.title }}</h5>
                <p class="text-sm text-gray-500">{{ feature.text }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Location Card -->
        <div class="location-card relative">
          <div class="bg-white rounded-[2.5rem] p-4 shadow-2xl border border-gray-100">
            <!-- Map Embed -->
            <div class="rounded-[2rem] overflow-hidden h-[450px] relative">
              <iframe
                :src="data.mapUrl"
                class="w-full h-full border-0" allowfullscreen="false" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>

              <!-- Floating Address Box -->
              <div
                class="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20">
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 shrink-0 bg-primary rounded-full flex items-center justify-center text-white">
                    <MapPin :size="20" />
                  </div>
                  <div class="flex-1">
                    <h6 class="font-bold text-primary mb-1">Lokasi Kami</h6>
                    <p class="text-sm text-gray-600 mb-4">
                      {{ data.address }}
                    </p>
                    <a href="https://maps.app.goo.gl/TQr7vGJ52akXhzNj8" target="_blank"
                      class="inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline">
                      Petunjuk Arah
                      <Navigation :size="14" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Decoration -->
          <div class="absolute -top-10 -right-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl -z-10"></div>
          <div class="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        </div>
      </div>
    </div>
  </section>
</template>
