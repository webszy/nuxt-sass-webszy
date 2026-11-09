import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { removeDevOnlyPages } from './dev-pages.mjs'

describe('removeDevOnlyPages', () => {
  it('removes the design-system route and keeps public pages', () => {
    const pages = [
      { path: '/', file: '/repo/app/pages/index.vue' },
      { path: '/dev/design-system', file: '/repo/app/pages/dev/design-system.vue' },
      { path: '/pricing', file: '/repo/app/pages/pricing.vue' },
    ]
    removeDevOnlyPages(pages)
    assert.deepEqual(pages.map(page => page.path), ['/', '/pricing'])
  })

  it('removes a nested dev route by file path', () => {
    const pages = [{
      path: '/dev',
      children: [{ path: '/dev/design-system', file: '/repo/app/pages/dev/design-system.vue' }],
    }]
    removeDevOnlyPages(pages)
    assert.deepEqual(pages, [])
  })
})
