<script setup lang="ts">
import type { UiAsyncStatus } from './AsyncState.vue'

const props = withDefaults(defineProps<{
  label: string
  value?: string | number | null
  hint?: string
  status?: UiAsyncStatus
  emptyTitle?: string
  errorTitle?: string
}>(), {
  value: undefined,
  hint: undefined,
  status: undefined,
  emptyTitle: 'No value yet',
  errorTitle: 'Could not load this value',
})

defineSlots<{
  actions?: () => unknown
  default?: () => unknown
}>()

const resolvedStatus = computed<UiAsyncStatus>(() => {
  if (props.status) return props.status
  if (props.value === null || props.value === undefined || props.value === '') return 'empty'
  return 'ready'
})

const stateTitle = computed(() => {
  if (resolvedStatus.value === 'error') return props.errorTitle
  if (resolvedStatus.value === 'empty') return props.emptyTitle
  return 'Loading'
})
</script>

<template>
  <div>
    <h2>{{ label }}</h2>
    <UiAsyncState :status="resolvedStatus" :title="stateTitle">
      <p class="ds-price"><slot>{{ value }}</slot></p>
      <p v-if="hint">{{ hint }}</p>
      <slot name="actions" />
      <template #actions>
        <slot name="actions" />
      </template>
    </UiAsyncState>
  </div>
</template>
