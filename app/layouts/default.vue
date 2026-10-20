<script setup lang="ts">
const config = useRuntimeConfig()
</script>
<template>
  <div>
    <header class="site-header"><div class="container header-inner"><NuxtLink class="brand" to="/">{{ config.public.siteName }}</NuxtLink><nav class="nav" aria-label="Main"><NuxtLink to="/pricing">Pricing</NuxtLink><AuthActions /></nav></div></header>
    <main class="container"><slot /></main>
    <footer class="site-footer"><div class="container footer-inner"><span>© {{ new Date().getFullYear() }} {{ config.public.siteName }}</span><nav class="nav" aria-label="Legal"><NuxtLink to="/terms">Terms</NuxtLink><NuxtLink to="/privacy">Privacy</NuxtLink><NuxtLink to="/refund-policy">Refunds</NuxtLink></nav></div></footer>
  </div>
</template>
