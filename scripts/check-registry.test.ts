import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { describe, it } from 'node:test'
import { validateRegistry } from './check-registry.mjs'

const registry = JSON.parse(readFileSync(new URL('../registry/components.json', import.meta.url), 'utf8'))

describe('component registry', () => {
  it('points every entry at a real component and document', () => {
    assert.deepEqual(validateRegistry(registry), [])
  })

  it('reports a missing source file', () => {
    const broken = {
      ...registry,
      components: registry.components.map((component: { source: string }, index: number) => index === 0
        ? { ...component, source: 'app/components/ui/Missing.vue' }
        : component),
    }
    const errors = validateRegistry(broken)
    assert.ok(errors.some((error: string) => error.includes('source does not exist')))
  })
})
