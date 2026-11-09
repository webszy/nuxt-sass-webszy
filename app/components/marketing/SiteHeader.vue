<script setup lang="ts">
export interface MarketingNavLink {
  label: string
  to: string
}

withDefaults(defineProps<{
  title: string
  links?: MarketingNavLink[]
  homeTo?: string
  navLabel?: string
}>(), {
  links: () => [],
  homeTo: '/',
  navLabel: 'Main',
})

defineSlots<{
  actions?: () => unknown
}>()
</script>

<template>
  <header class="border-b border-default bg-default">
    <div class="ds-container flex flex-wrap items-center justify-between gap-6 py-5">
      <NuxtLink :to="homeTo" class="text-xl font-bold text-highlighted no-underline">{{ title }}</NuxtLink>
      <nav class="flex flex-wrap items-center gap-5" :aria-label="navLabel">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-toned no-underline [&.router-link-exact-active]:text-primary"
        >
          {{ link.label }}
        </NuxtLink>
        <slot name="actions" />
      </nav>
    </div>
  </header>
</template>
