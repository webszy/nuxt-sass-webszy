<script setup lang="ts">
const config = useRuntimeConfig()
const { open } = useLoginModal()
useSeoMeta({ title: 'Home' })
useHead({ link: [{ rel: 'canonical', href: new URL('/', config.public.siteUrl).href }] })
</script>
<template>
  <div><section class="hero"><p class="eyebrow">Your next chapter</p><h1>A fresh start for your next idea.</h1><p>{{ config.public.siteDescription }}</p><div class="actions"><UButton size="xl" @click="open()">Get started</UButton><UButton size="xl" to="/pricing" variant="outline">View pricing</UButton></div></section><section class="grid-cards"><article class="card"><h2>Your account</h2><p>One place to manage your account and access your workspace.</p></article><article class="card"><h2>Flexible credits</h2><p>Choose a credit pack when you need it. No recurring commitment.</p></article><article class="card"><h2>Clear billing</h2><p>Review your balance, purchases and credit activity.</p></article></section>  </div>
</template>
