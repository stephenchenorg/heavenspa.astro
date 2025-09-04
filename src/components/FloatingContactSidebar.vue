<template>
  <div
    class="fixed right-2 top-1/2 z-50 flex -translate-y-1/2 transform flex-col lg:right-6 sm:right-3 border border-primary-200 rounded-full bg-white/95 backdrop-blur-sm shadow-lg divide-y divide-primary-100"
  >
    <!-- LINE Contact Button -->
    <div v-if="companySetting.line_link" class="p-3 first:rounded-t-full">
      <a
        :href="companySetting.line_link"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex h-10 w-10 items-center justify-center rounded-full hover:scale-110 transition-all duration-300 sm:h-8 sm:w-8 bg-gradient-to-br from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-md hover:shadow-lg"
        aria-label="聯絡 LINE"
      >
        <LineMessenger class-name="h-5 w-5 sm:h-4 sm:w-4 text-white" />
      </a>
    </div>

    <!-- WhatsApp Contact Button -->
    <div v-if="companySetting.whatsapp_link" class="p-3">
      <a
        :href="companySetting.whatsapp_link"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex h-10 w-10 items-center justify-center rounded-full sm:h-8 sm:w-8 hover:scale-110 transition-all duration-300 bg-gradient-to-br from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-md hover:shadow-lg"
        aria-label="WhatsApp 聯絡"
      >
        <WhatsApp class-name="h-5 w-5 sm:h-4 sm:w-4 text-white" />
      </a>
    </div>

    <!-- Phone Contact Button -->
    <div v-if="companySetting.phone_1" class="p-3 last:rounded-b-full">
      <a
        :href="`tel:${companySetting.phone_1}`"
        class="group flex h-10 w-10 items-center justify-center rounded-full shadow-md hover:shadow-lg sm:h-8 sm:w-8 hover:scale-110 transition-all duration-300 bg-gradient-to-br from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
        aria-label="電話聯絡"
      >
        <PhoneCall class-name="h-5 w-5 sm:h-4 sm:w-4 text-white" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LineMessenger, PhoneCall, WhatsApp } from '@/components/icon'

interface CompanySetting {
  address_1?: string
  address_2?: string
  description?: string
  email_1?: string
  email_2?: string
  fb_link?: string
  ig_link?: string
  lang?: string
  line_link?: string
  whatsapp_link?: string
  twitter_link?: string
  logo?: string
  name?: string
  phone_1?: string
  phone_2?: string
  tg_link?: string
  vat?: string
}

interface Props {
  companySetting: CompanySetting
}

const { companySetting } = defineProps<Props>()
</script>
