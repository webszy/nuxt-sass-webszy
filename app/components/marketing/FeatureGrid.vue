<script setup lang="ts">
import type { UiAsyncStatus } from '../ui/AsyncState.vue'

export interface MarketingFeature {
  title: string
  description: string
}

const props = withDefaults(defineProps<{
  items: MarketingFeature[]
  status?: UiAsyncStatus
  emptyTitle?: string
  emptyDescription?: string
  errorTitle?: string
  errorDescription?: string
}>(), {
  status: 'ready',
  emptyTitle: 'Nothing to show yet',
  emptyDescription: 'Features will appear here.',
  errorTitle: 'Could not load this section',
  errorDescription: 'Please try again.',
})

defineSlots<{
  item?: (props: { item: MarketingFeature }) => unknown
  actions?: () => unknown
}>()

const resolvedStatus = computed<UiAsyncStatus>(() => {
  if (props.status === 'loading' || props.status === 'error') return props.status
  if (props.status === 'empty' || props.items.length === 0) return 'empty'
  return 'ready'
})

const stateTitle = computed(() => {
  if (resolvedStatus.value === 'error') return props.errorTitle
  if (resolvedStatus.value === 'empty') return props.emptyTitle
  return undefined
})
const stateDescription = computed(() => {
  if (resolvedStatus.value === 'error') return props.errorDescription
  if (resolvedStatus.value === 'empty') return props.emptyDescription
  return undefined
})
</script>

<template>
  <UiAsyncState
    v-if="resolvedStatus !== 'ready'"
    :status="resolvedStatus"
    :title="stateTitle"
    :description="stateDescription"
  >
    <template v-if="$slots.actions" #actions>
      <slot name="actions" />
    </template>
  </UiAsyncState>
  <div v-else class="ds-grid">
    <UCard v-for="(item, index) in items" :key="`${item.title}-${index}`">
      <slot name="item" :item="item">
        <h2>{{ item.title }}</h2>
        <p>{{ item.description }}</p>
      </slot>
    </UCard>
  </div>
</template>
