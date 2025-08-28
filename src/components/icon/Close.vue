<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="className"
    v-bind="$attrs"
  >
    <path d="M18 6L6 18"/>
    <path d="M6 6l12 12"/>
  </svg>
</template>

<script setup lang="ts">
export interface Props {
  size?: string | number
  className?: string
}

const {
  size = '24',
  className = ''
} = defineProps<Props>()
</script>