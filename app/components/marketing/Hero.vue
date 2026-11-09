<script setup lang="ts">
defineProps<{
  title: string
  eyebrow?: string
  description?: string
}>()

defineSlots<{
  default?: () => unknown
  title?: () => unknown
  description?: () => unknown
  actions?: () => unknown
}>()
</script>

<template>
  <section class="max-w-[45rem] py-12">
    <p v-if="eyebrow" class="ds-eyebrow">{{ eyebrow }}</p>
    <h1>
      <slot name="title">{{ title }}</slot>
    </h1>
    <p v-if="description || $slots.description">
      <slot name="description">{{ description }}</slot>
    </p>
    <div v-if="$slots.actions" class="my-6 flex flex-wrap gap-3">
      <slot name="actions" />
    </div>
    <slot />
  </section>
</template>
