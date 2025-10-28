<template>
  <div v-if="showPagination" :class="props.class">
    <a v-if="canFirst" :href="localizedFirstUrl">First</a>
    <a v-if="canPrev" :href="localizedPrevUrl">Previous</a>
    <template v-for="page in items" :key="page">
      <span v-if="page === currentPage">{{ page }}</span>
      <a v-else :href="getLocalizedUrl(page)">{{ page }}</a>
    </template>
    <a v-if="canNext" :href="localizedNextUrl">Next</a>
    <a v-if="canLast" :href="localizedLastUrl">Last</a>
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { usePagination } from '@stephenchenorg/astro/pagination-vue-server-side'
import { computed } from 'vue'
import { getLinkByLocaleBrowser } from '@/utils/i18n'

const props = withDefaults(defineProps<{
  total: number
  perPage?: number
  visiblePages?: number
  currentPage?: number
  url: string
  class?: HTMLAttributes['class']
}>(), {
  currentPage: 1,
})

const {
  items,
  showPagination,
  canFirst,
  canPrev,
  canNext,
  canLast,
  firstUrl,
  prevUrl,
  nextUrl,
  lastUrl,
  getUrl,
} = usePagination({
  total: props.total,
  perPage: props.perPage,
  visiblePages: props.visiblePages,
  currentPage: props.currentPage,
  url: props.url,
})

// Localized URL computed properties
const localizedFirstUrl = computed(() => getLinkByLocaleBrowser(firstUrl.value))
const localizedPrevUrl = computed(() => getLinkByLocaleBrowser(prevUrl.value))
const localizedNextUrl = computed(() => getLinkByLocaleBrowser(nextUrl.value))
const localizedLastUrl = computed(() => getLinkByLocaleBrowser(lastUrl.value))

// Helper function to get localized URL for specific page
function getLocalizedUrl(page: number): string {
  return getLinkByLocaleBrowser(getUrl(page))
}
</script>
