<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { data: contentData } = await useFetch('/api/content')

// SEO Meta
useSeoMeta({
  title: 'Jasa Percetakan Murah & Cepat Jakarta Utara | PT Citra Pasirmandiri',
  description: 'PT Citra Pasirmandiri - Solusi percetakan modern di Koja, Jakarta Utara. Cetak brosur, banner, kartu nama, dan poster dengan kualitas tinggi dan proses cepat.',
  ogTitle: 'PT Citra Pasirmandiri | Percetakan Modern & Cepat di Jakarta Utara',
  ogDescription: 'Cetak kebutuhan bisnis Anda dengan teknologi terbaru. Brosur, Banner, Kartu Nama, dan lainnya. Lokasi di Koja, Jakarta Utara.',
  ogImage: '/images/img-6.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  keywords: 'percetakan jakarta utara, cetak brosur koja, percetakan murah jakarta, cetak banner cepat, pt citra pasirmandiri, cetak kartu nama koja, printing jakarta utara'
})

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e: Event) => {
      const targetId = anchor.getAttribute('href')
      if (!targetId || targetId === '#' || !targetId.startsWith('#')) return

      e.preventDefault()
      const targetElement = document.querySelector(targetId) as HTMLElement | null
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        })
      }
    })
  })
})
</script>

<template>
  <div class="min-h-screen bg-white selection:bg-accent/30 selection:text-primary overflow-x-hidden">
    <LayoutHeader />

    <main v-if="contentData">
      <SectionsHero v-if="contentData.hero" :data="contentData.hero" />
      <SectionsServices v-if="contentData.services" :data="contentData.services" />
      <SectionsAboutLocation v-if="contentData.about" :data="contentData.about" />
    </main>

    <LayoutFooter />
  </div>
</template>

