<template>
  <div
    class="fixed right-2 top-1/2 z-50 flex -translate-y-1/2 transform flex-col lg:right-6 sm:right-3 border border-[#E4D0C0] rounded-full bg-[#F9EEE4] divide-y divide-[#E4D0C0]">
    <!-- LINE Contact Button -->
    <div class="py-4 px-6 first:rounded-t-full">
      <a
        href="https://line.me/ti/p/"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex h-12 w-12 items-center justify-center rounded-full hover:scale-90 transition-all duration-300 sm:h-10 sm:w-10"
        style="background-color: rgb(156, 113, 74)"
        aria-label="聯絡 LINE"
      >
        <IconLine class="h-6 w-6 sm:h-5 sm:w-5 text-[rgb(255,248,240)]" />
      </a>
    </div>

    <!-- WhatsApp Contact Button -->
    <div class="py-4 px-6">
      <a
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex h-12 w-12 items-center justify-center rounded-full sm:h-10 sm:w-10 hover:scale-90 transition-all duration-300"
        style="background-color: rgb(156, 113, 74)"
        aria-label="WhatsApp 聯絡"
      >
        <IconWhatsapp class="h-6 w-6 sm:h-5 sm:w-5 text-[rgb(255,248,240)]" />
      </a>
    </div>

    <!-- Phone Contact Button -->
    <div class="py-4 px-6 last:rounded-b-full">
      <a
        href="tel:"
        class="group flex h-12 w-12 items-center justify-center rounded-full shadow-lg sm:h-10 sm:w-10 hover:scale-90 transition-all duration-300"
        style="background-color: rgb(156, 113, 74)"
        aria-label="電話聯絡"
      >
        <IconPhone class="h-6 w-6 sm:h-5 sm:w-5 text-[rgb(255,248,240)]" />
      </a>
    </div>
  </div>
</template>

<script setup>
import IconPhone from '~icons/heroicons/phone'
import IconLine from '~icons/tabler/brand-line'
import IconWhatsapp from '~icons/tabler/brand-whatsapp'
</script>
