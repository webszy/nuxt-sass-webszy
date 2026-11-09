<script setup lang="ts">
import type { UiAsyncStatus } from '../ui/AsyncState.vue'

const props = withDefaults(defineProps<{
  title: string
  status?: UiAsyncStatus
  description?: string
  errorTitle?: string
}>(), {
  status: 'ready',
  description: undefined,
  errorTitle: 'This page could not be loaded',
})

defineSlots<{
  default?: () => unknown
  actions?: () => unknown
}>()

const stateTitle = computed(() => props.status === 'error' ? props.errorTitle : undefined)
</script>

<template>
  <article class="ds-panel">
    <h1>{{ title }}</h1>
    <p v-if="status === 'empty'">{{ description || 'Nothing has been published yet.' }}</p>
    <UiAsyncState v-else :status="status" :title="stateTitle" :description="description">
      <slot />
      <template v-if="$slots.actions" #actions>
        <slot name="actions" />
      </template>
    </UiAsyncState>
  </article>
</template>
