<template>
  <div ref="element" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  sourceDoc: {
    type: String,
    default: null,
  },
})

const element = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!element.value || !props.sourceDoc) return

  const shadowHost = computed(
    () =>
      element.value!.shadowRoot || element.value!.attachShadow({ mode: 'open' })
  )

  shadowHost.value.innerHTML = props.sourceDoc
})
</script>
