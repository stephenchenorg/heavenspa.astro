<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="currentColor"
    :class="className"
  >
    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" />
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
.clock-icon {
  color: var(--theme-text, #000000);
  transition: all 0.3s ease;
}

.clock-icon:hover {
  color: var(--color-primary-600, #c4a428);
  transform: scale(1.1);
}
</style>
