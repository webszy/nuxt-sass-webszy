<script setup lang="ts">
export interface MarketingNavLink {
  label: string
  to: string
}

withDefaults(defineProps<{
  title: string
  links?: MarketingNavLink[]
  navLabel?: string
}>(), {
  links: () => [],
  navLabel: 'Legal',
})
</script>

<template>
  <footer class="border-t border-default text-sm">
    <div class="ds-container flex flex-wrap items-center justify-between gap-6 py-5">
      <span>© {{ new Date().getFullYear() }} {{ title }}</span>
      <nav class="flex flex-wrap items-center gap-5" :aria-label="navLabel">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-toned no-underline [&.router-link-exact-active]:text-primary"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
  </footer>
</template>
