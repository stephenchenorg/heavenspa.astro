<template>
  <li>
    <a
      :href
      class="group flex items-center justify-start text-sm text-[var(--theme-text-secondary,#666666)] hover:text-[var(--color-primary-600,#c4a428)] transition-all duration-300 hover:translate-x-1"
    >
      <span class="opacity-0 group-hover:opacity-100 mr-2 transition-all duration-300 transform -translate-x-3 group-hover:translate-x-0">→</span>
      <span>{{ text }}</span>
    </a>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  href: string
  text: string
}>()
</script>
