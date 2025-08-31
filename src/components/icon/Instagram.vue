<template>
  <svg
    :width="size"
    :height="size"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Instagram"
    role="img"
    viewBox="0 0 512 512"
    :class="className"
    v-bind="$attrs"
  >
    <rect width="512" height="512" rx="15%" fill="url(#a)" />
    <defs>
      <linearGradient id="a" x1=".5" x2=".5" y2="1">
        <stop offset=".1" stop-color="#fd5" />
        <stop offset=".5" stop-color="#ff543e" />
        <stop offset="1" stop-color="#c837ab" />
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="15%" fill="url(#a)" />
    <rect x="202" y="202" width="108" height="108" rx="54" fill="white" />
    <rect x="64" y="64" width="384" height="384" rx="192" fill="none" stroke="white" stroke-width="32" />
    <circle cx="405" cy="107" r="35" fill="white" />
  </svg>
</template>

<script setup lang="ts">
export interface Props {
  size?: string | number
  className?: string
}

const {
  size = '40',
  className = '',
} = defineProps<Props>()
</script>
