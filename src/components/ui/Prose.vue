<template>
  <div
    :class="cn('prose', props.class)"
    v-html="content"
  />
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/className'

const props = defineProps<{
  content?: string
  class?: HTMLAttributes['class']
}>()
</script>
