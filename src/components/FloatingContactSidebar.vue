<template>
  <div
    class="fixed right-2 top-1/2 z-50 flex -translate-y-1/2 transform flex-col lg:right-6 sm:right-3 border border-[#E4D0C0] rounded-full bg-[#F9EEE4] divide-y divide-[#E4D0C0]"
  >
    <!-- LINE Contact Button -->
    <div class="p-3 first:rounded-t-full">
      <a
        href="https://line.me/ti/p/"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex h-10 w-10 items-center justify-center rounded-full hover:scale-90 transition-all duration-300 sm:h-8 sm:w-8"
        style="background-color: rgb(156, 113, 74)"
        aria-label="聯絡 LINE"
      >
        <LineMessenger className="h-5 w-5 sm:h-4 sm:w-4" />
      </a>
    </div>

    <!-- WhatsApp Contact Button -->
    <div class="p-3">
      <a
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex h-10 w-10 items-center justify-center rounded-full sm:h-8 sm:w-8 hover:scale-90 transition-all duration-300"
        style="background-color: rgb(156, 113, 74)"
        aria-label="WhatsApp 聯絡"
      >
        <WhatsApp className="h-5 w-5 sm:h-4 sm:w-4" />
      </a>
    </div>

    <!-- Phone Contact Button -->
    <div class="p-3 last:rounded-b-full">
      <a
        href="tel:"
        class="group flex h-10 w-10 items-center justify-center rounded-full shadow-lg sm:h-8 sm:w-8 hover:scale-90 transition-all duration-300"
        style="background-color: rgb(156, 113, 74)"
        aria-label="電話聯絡"
      >
        <PhoneCall className="h-5 w-5 sm:h-4 sm:w-4" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LineMessenger, WhatsApp, PhoneCall } from '@/components/icon'
</script>
