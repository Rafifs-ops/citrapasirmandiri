<script setup lang="ts">
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-vue-next'

const currentYear = new Date().getFullYear()

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Layanan', href: '#layanan' },
  { name: 'Tentang Kami', href: '#tentang' },
  { name: 'Kontak', href: '#kontak' },
]

const services = [
  { name: 'Brosur & Flier', href: '#' },
  { name: 'Banner & Spanduk', href: '#' },
  { name: 'Kartu Nama', href: '#' },
  { name: 'Sampul Map', href: '#' },
  { name: 'Poster & Layout', href: '#' },
]
</script>

<template>
  <footer id="kontak" class="bg-primary pt-24 pb-12 text-white">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        <!-- Brand Info -->
        <div class="col-span-1 lg:col-span-1">
          <div class="flex items-center gap-3 mb-8">
            <img src="/images/logo_pasir_citra-removebg-preview.png" alt="Logo" class="h-12 brightness-0 invert" />
          </div>
          <p class="text-white/60 mb-8 leading-relaxed">
            Solusi percetakan modern di Jakarta Utara. Mengutamakan kualitas, kecepatan, dan kepuasan pelanggan di
            setiap lembar cetakan.
          </p>
          <div class="flex gap-4">
            <a href="instagram.com/citrapasirmandiri"
              class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
              <Instagram :size="20" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-bold mb-8 relative inline-block">
            Navigasi
            <span class="absolute -bottom-2 left-0 w-8 h-1 bg-accent"></span>
          </h4>
          <ul class="flex flex-col gap-4">
            <li v-for="link in quickLinks" :key="link.name">
              <a :href="link.href"
                class="text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                <span
                  class="w-1.5 h-1.5 rounded-full bg-accent scale-0 group-hover:scale-100 transition-transform"></span>
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Services Links -->
        <div>
          <h4 class="text-lg font-bold mb-8 relative inline-block">
            Layanan Kami
            <span class="absolute -bottom-2 left-0 w-8 h-1 bg-accent"></span>
          </h4>
          <ul class="flex flex-col gap-4">
            <li v-for="item in services" :key="item.name">
              <a :href="item.href"
                class="text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                <span
                  class="w-1.5 h-1.5 rounded-full bg-accent scale-0 group-hover:scale-100 transition-transform"></span>
                {{ item.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="text-lg font-bold mb-8 relative inline-block">
            Hubungi Kami
            <span class="absolute -bottom-2 left-0 w-8 h-1 bg-accent"></span>
          </h4>
          <ul class="flex flex-col gap-6">
            <li class="flex gap-4">
              <div class="w-10 h-10 shrink-0 bg-white/10 rounded-lg flex items-center justify-center text-accent">
                <MapPin :size="20" />
              </div>
              <p class="text-sm text-white/60 leading-relaxed">
                Jl Bendungan Melayu No.32 Rawabadak Selatan, Koja - Jakarta Utara
              </p>
            </li>
            <li class="flex gap-4">
              <div class="w-10 h-10 shrink-0 bg-white/10 rounded-lg flex items-center justify-center text-accent">
                <Phone :size="20" />
              </div>
              <p class="text-sm text-white/60">
                (021) 43922236
              </p>
            </li>
            <li class="flex gap-4">
              <div class="w-10 h-10 shrink-0 bg-white/10 rounded-lg flex items-center justify-center text-accent">
                <Mail :size="20" />
              </div>
              <p class="text-sm text-white/60">
                info@citrapasirmandiri.com
              </p>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p class="text-white/40 text-sm">
          &copy; {{ currentYear }} PT Citra Pasirmandiri. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
