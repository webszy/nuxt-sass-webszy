<script setup lang="ts">
const config = useRuntimeConfig()
const primaryLinks = [{ label: 'Pricing', to: '/pricing' }]
const legalLinks = [
  { label: 'Terms', to: '/terms' },
  { label: 'Privacy', to: '/privacy' },
  { label: 'Refunds', to: '/refund-policy' },
]
</script>

<template>
  <div>
    <MarketingSiteHeader :title="config.public.siteName" :links="primaryLinks">
      <template #actions>
        <AuthActions />
      </template>
    </MarketingSiteHeader>
    <main class="ds-container ds-main">
      <slot />
    </main>
    <MarketingSiteFooter :title="config.public.siteName" :links="legalLinks" />
  </div>
</template>
