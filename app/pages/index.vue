<script setup lang="ts">
const config = useRuntimeConfig()
const { open } = useLoginModal()
const features = [
  { title: 'Your account', description: 'One place to manage your account and access your workspace.' },
  { title: 'Flexible credits', description: 'Choose a credit pack when you need it. No recurring commitment.' },
  { title: 'Clear billing', description: 'Review your balance, purchases and credit activity.' },
]
useSeoMeta({ title: 'Home' })
useHead({ link: [{ rel: 'canonical', href: new URL('/', config.public.siteUrl).href }] })
</script>

<template>
  <div>
    <MarketingHero
      eyebrow="Your next chapter"
      title="A fresh start for your next idea."
      :description="config.public.siteDescription"
    >
      <template #actions>
        <UButton size="xl" @click="open()">Get started</UButton>
        <UButton size="xl" to="/pricing" variant="outline">View pricing</UButton>
      </template>
    </MarketingHero>
    <MarketingFeatureGrid :items="features" />
  </div>
</template>
