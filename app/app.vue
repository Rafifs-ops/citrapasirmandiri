<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href')
      if (!targetId || targetId === '#' || !targetId.startsWith('#')) return

      e.preventDefault()
      const targetElement = document.querySelector(targetId)
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

    <main>
      <SectionsHero />
      <SectionsServices />
      <SectionsAboutLocation />
    </main>

    <LayoutFooter />
  </div>
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
