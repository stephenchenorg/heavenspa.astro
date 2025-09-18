<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="currentColor"
    :class="className"
  >
    <path d="M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4M20,8H4V6H20M20,18H4V12H20M4,9H6V11H4V9Z" />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  size?: string | number
  className?: string
}

withDefaults(defineProps<Props>(), {
  size: 18,
  className: '',
})
</script>

<style scoped>
.credit-card-icon {
  color: var(--theme-text, #000000);
  transition: all 0.3s ease;
}

.credit-card-icon:hover {
  color: var(--color-primary-600, #c4a428);
  transform: scale(1.1);
}
</style>
