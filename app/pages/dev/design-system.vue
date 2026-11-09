<script setup lang="ts">
if (import.meta.env.PROD) {
  throw createError({ statusCode: 404, statusMessage: 'Not found', fatal: true })
}

useSeoMeta({ title: 'Design system', robots: 'noindex, nofollow' })

const features = [
  { title: 'Your account', description: 'One place to manage your account and access your workspace.' },
  { title: 'Flexible credits', description: 'Choose a credit pack when you need it. No recurring commitment.' },
]

const previewLinks = [{ label: 'Pricing', to: '/pricing' }]
const previewLegal = [
  { label: 'Terms', to: '/terms' },
  { label: 'Privacy', to: '/privacy' },
]
</script>

<template>
  <div class="grid gap-12">
    <header>
      <p class="ds-eyebrow">Local only</p>
      <h1>Design system</h1>
      <p>These examples are for development. The route is removed from production builds.</p>
    </header>

    <section>
      <h2>Marketing hero</h2>
      <MarketingHero eyebrow="Your next chapter" title="A fresh start for your next idea." description="A short description for the product.">
        <template #actions>
          <UButton>Primary action</UButton>
          <UButton variant="outline">Secondary action</UButton>
        </template>
      </MarketingHero>
    </section>

    <section>
      <h2>Feature grid</h2>
      <h3 class="mb-2 text-sm font-semibold text-toned">Ready</h3>
      <MarketingFeatureGrid :items="features" />
      <h3 class="mb-2 text-sm font-semibold text-toned">Loading</h3>
      <MarketingFeatureGrid :items="[]" status="loading" />
      <h3 class="mb-2 text-sm font-semibold text-toned">Empty</h3>
      <MarketingFeatureGrid :items="[]" />
      <h3 class="mb-2 text-sm font-semibold text-toned">Error</h3>
      <MarketingFeatureGrid :items="features" status="error" error-title="Could not load features" error-description="Please try again.">
        <template #actions>
          <UButton size="sm" variant="outline">Retry</UButton>
        </template>
      </MarketingFeatureGrid>
    </section>

    <section>
      <h2>Article</h2>
      <div class="grid gap-6">
        <MarketingArticle title="Published article">
          <p>Published body copy goes in the default slot.</p>
        </MarketingArticle>
        <MarketingArticle title="Unpublished article" status="empty" description="This policy has not been published yet." />
        <MarketingArticle title="Loading article" status="loading" />
        <MarketingArticle title="Failed article" status="error" description="The article could not be loaded." />
      </div>
    </section>

    <section>
      <h2>Metric</h2>
      <div class="ds-grid">
        <div class="ds-panel">
          <UiMetric label="Available credits" :value="120" hint="Ready to use" />
        </div>
        <div class="ds-panel">
          <UiMetric label="Available credits" status="loading" />
        </div>
        <div class="ds-panel">
          <UiMetric label="Available credits" status="empty" />
        </div>
        <div class="ds-panel">
          <UiMetric label="Available credits" status="error">
            <template #actions>
              <UButton size="sm" variant="outline">Retry</UButton>
            </template>
          </UiMetric>
        </div>
      </div>
    </section>

    <section>
      <h2>Async state</h2>
      <div class="grid gap-6">
        <UiAsyncState status="ready">
          <p>Ready content is shown in the default slot.</p>
        </UiAsyncState>
        <UiAsyncState status="loading" title="Loading account" />
        <UiAsyncState status="empty" title="No purchases yet" description="Purchases will appear here." />
        <UiAsyncState status="error" title="Could not load your balance" description="Please try again.">
          <template #actions>
            <UButton size="sm" variant="outline">Retry</UButton>
          </template>
        </UiAsyncState>
      </div>
    </section>

    <section>
      <h2>Site chrome</h2>
      <div class="overflow-hidden rounded-2xl border border-default bg-default">
        <MarketingSiteHeader title="SaaS Starter" :links="previewLinks">
          <template #actions>
            <UButton size="sm">Sign in</UButton>
          </template>
        </MarketingSiteHeader>
        <MarketingSiteFooter title="SaaS Starter" :links="previewLegal" />
      </div>
    </section>
  </div>
</template>
