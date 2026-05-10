<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Phone, Menu, X } from 'lucide-vue-next'
import gsap from 'gsap'

const isScrolled = ref(false)
const isMenuOpen = ref(false)

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Layanan', href: '#layanan' },
  { name: 'Tentang Kami', href: '#tentang' },
  { name: 'Kontak', href: '#kontak' },
]

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })

  // Entrance animation for header
  gsap.from('.header-content', {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
  })
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header :class="[
    'fixed top-0 left-0 w-full z-50 transition-all duration-500',
    isScrolled ? 'py-3 bg-white/90 backdrop-blur-md shadow-md' : 'py-6 bg-transparent'
  ]">
    <div class="container mx-auto px-6 flex justify-between items-center header-content">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <img src="/images/logo_pasir_citra-removebg-preview.png" alt="Citra Pasirmandiri"
          class="h-10 md:h-12 transition-transform duration-300 group-hover:scale-110" />
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="hidden lg:flex items-center gap-8">
        <ul class="flex gap-8">
          <li v-for="link in navLinks" :key="link.name">
            <a :href="link.href"
              class="text-sm font-medium text-primary hover:text-accent transition-colors relative group">
              {{ link.name }}
              <span
                class="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
        </ul>

        <a href="https://wa.me/6281234567890" target="_blank" class="btn-primary">
          <Phone :size="18" />
          Hubungi WhatsApp
        </a>
      </nav>

      <!-- Mobile Menu Toggle -->
      <button class="lg:hidden text-primary" @click="toggleMenu">
        <Menu v-if="!isMenuOpen" :size="28" />
        <X v-else :size="28" />
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 -translate-y-10"
      enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-10">
      <div v-if="isMenuOpen"
        class="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 py-6 px-6">
        <ul class="flex flex-col gap-4 mb-6">
          <li v-for="link in navLinks" :key="link.name">
            <a :href="link.href" class="text-lg font-medium text-primary block py-2" @click="isMenuOpen = false">
              {{ link.name }}
            </a>
          </li>
        </ul>
        <a href="https://wa.me/6281234567890" target="_blank" class="btn-primary justify-center w-full">
          <Phone :size="18" />
          Hubungi WhatsApp
        </a>
      </div>
    </Transition>
  </header>
</template>
