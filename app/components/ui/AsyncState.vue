<script setup lang="ts">
export type UiAsyncStatus = 'loading' | 'empty' | 'error' | 'ready'

const props = withDefaults(defineProps<{
  status: UiAsyncStatus
  title?: string
  description?: string
}>(), {
  title: undefined,
  description: undefined,
})

defineSlots<{
  default?: () => unknown
  loading?: () => unknown
  empty?: () => unknown
  error?: () => unknown
  actions?: () => unknown
}>()

const emptyTitle = computed(() => props.title || 'Nothing here yet')
const errorTitle = computed(() => props.title || 'Something went wrong')
</script>

<template>
  <div v-if="status === 'loading'" role="status">
    <slot name="loading">
      <div class="grid gap-3" aria-hidden="true">
        <USkeleton class="h-5 w-40" />
        <USkeleton class="h-4 w-full max-w-md" />
      </div>
      <p class="sr-only">{{ title || 'Loading' }}</p>
    </slot>
  </div>

  <slot v-else-if="status === 'empty'" name="empty">
    <UEmpty variant="naked" :title="emptyTitle" :description="description">
      <template v-if="$slots.actions" #actions>
        <slot name="actions" />
      </template>
    </UEmpty>
  </slot>

  <slot v-else-if="status === 'error'" name="error">
    <UAlert color="error" variant="subtle" role="alert" :title="errorTitle" :description="description">
      <template v-if="$slots.actions" #actions>
        <slot name="actions" />
      </template>
    </UAlert>
  </slot>

  <slot v-else />
</template>
