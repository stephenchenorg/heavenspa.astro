<template>
  <li>
    <a
      :href
      class="group flex items-center justify-start text-sm transition-all duration-300 hover:translate-x-1 hover:text-[var(--color-primary-600,#c4a428)]"
      style="color: var(--theme-nav-text, #000000);"
    >
      <span class="opacity-0 group-hover:opacity-100 w-0 group-hover:w-auto group-hover:mr-2 transition-all duration-300 transform -translate-x-3 group-hover:translate-x-0 overflow-hidden text-[var(--color-primary-600,#c4a428)]">→</span>
      <span class="text-sm text-[var(--theme-text-secondary,#666666)]">{{ text }}</span>
    </a>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  href: string
  text: string
}>()
</script>
