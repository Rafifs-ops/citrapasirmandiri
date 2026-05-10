<script setup lang="ts">
import { MapPin, Clock, ShieldCheck, Award, Navigation } from 'lucide-vue-next'
import gsap from 'gsap'

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
            Partner Terpercaya untuk <br />
            Segala Kebutuhan Cetak Anda.
          </h3>
          <p class="text-gray-600 text-lg mb-10 leading-relaxed">
            Berlokasi strategis di Rawabadak Selatan, Koja, PT Citra Pasirmandiri telah melayani ribuan pelanggan mulai
            dari UMKM hingga perusahaan besar. Kami percaya bahwa kualitas cetak yang baik adalah kunci dari branding
            yang sukses.
          </p>

          <div class="grid sm:grid-cols-2 gap-8 mb-10">
            <div class="flex gap-4">
              <div class="w-12 h-12 shrink-0 bg-blue-50 rounded-xl flex items-center justify-center text-accent">
                <Clock :size="24" />
              </div>
              <div>
                <h5 class="font-bold text-primary mb-1">Cepat & Tepat</h5>
                <p class="text-sm text-gray-500">Deadline mepet? Kami solusinya dengan pengerjaan express.</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="w-12 h-12 shrink-0 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                <ShieldCheck :size="24" />
              </div>
              <div>
                <h5 class="font-bold text-primary mb-1">Kualitas Terjamin</h5>
                <p class="text-sm text-gray-500">QC ketat untuk setiap lembar hasil cetakan Anda.</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="w-12 h-12 shrink-0 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                <Award :size="24" />
              </div>
              <div>
                <h5 class="font-bold text-primary mb-1">Harga Kompetitif</h5>
                <p class="text-sm text-gray-500">Kualitas premium dengan harga yang masuk akal.</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="w-12 h-12 shrink-0 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                <MapPin :size="24" />
              </div>
              <div>
                <h5 class="font-bold text-primary mb-1">Lokasi Strategis</h5>
                <p class="text-sm text-gray-500">Mudah dijangkau di wilayah Koja, Jakarta Utara.</p>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.0189333917815!2d106.9038287!3d-6.1281861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a1f8db604085f%3A0x63351233068e2f60!2sJl.%20Bendungan%20Melayu%20No.32%2C%20RW.1%2C%20Rawabadak%20Sel.%2C%20Kec.%20Koja%2C%20Jkt%20Utara%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2014230!5e0!3m2!1sid!2sid!4v1715340000000!5m2!1sid!2sid"
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
                      Jl Bendungan Melayu No.32 Rawabadak Selatan, Koja - Jakarta Utara
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
