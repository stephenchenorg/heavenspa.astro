<template>
  <div id="prose" ref="element" class="prose h-[2000px] w-[1500px]" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  sourceDoc: {
    type: String,
    default: null,
  },
})
console.warn('22223123123')
const element = ref(null)
console.warn(element.value, '2222')
onMounted(() => {
  console.warn(element.value, '2222')
  if (!element.value) return

  const shadowHost = computed(
    () =>
      element.value!.shadowRoot || element.value!.attachShadow({ mode: 'open' })
  )

  shadowHost.value.innerHTML = props.sourceDoc
})
</script>
