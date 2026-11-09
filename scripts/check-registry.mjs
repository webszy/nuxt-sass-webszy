import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const STATUSES = new Set(['loading', 'empty', 'error', 'ready'])
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

export function validateRegistry(registry, directory = root) {
  const errors = []
  if (registry?.schemaVersion !== 1) errors.push('schemaVersion must be 1')
  if (!Array.isArray(registry?.components) || registry.components.length === 0) {
    errors.push('components must be a non-empty array')
    return errors
  }

  const names = new Set()
  const slugs = new Set()
  const sources = new Set()

  for (const component of registry.components) {
    const label = component?.name || '(unnamed component)'
    for (const key of ['name', 'slug', 'category', 'purpose', 'source', 'docs']) {
      if (typeof component?.[key] !== 'string' || component[key].trim() === '') {
        errors.push(`${label} is missing ${key}`)
      }
    }
    if (component?.category && !['ui', 'marketing'].includes(component.category)) {
      errors.push(`${label} category must be ui or marketing`)
    }
    if (component?.name) {
      if (names.has(component.name)) errors.push(`duplicate component name ${component.name}`)
      names.add(component.name)
      const expected = expectedComponentName(component.source)
      if (expected && expected !== component.name) {
        errors.push(`${component.name} should be named ${expected} from ${component.source}`)
      }
    }
    if (component?.slug) {
      if (slugs.has(component.slug)) errors.push(`duplicate slug ${component.slug}`)
      slugs.add(component.slug)
    }

    if (typeof component?.source === 'string') {
      sources.add(component.source)
      const sourcePath = resolve(directory, component.source)
      if (!component.source.startsWith('app/components/') || !component.source.endsWith('.vue') || !existsSync(sourcePath)) {
        errors.push(`${label} source does not exist: ${component.source}`)
      } else {
        const source = readFileSync(sourcePath, 'utf8')
        for (const prop of component.props ?? []) {
          if (!prop?.name || !new RegExp(`\\b${prop.name}\\b`).test(source)) {
            errors.push(`${label} source is missing prop ${prop?.name}`)
          }
        }
        for (const slot of component.slots ?? []) {
          if (!slotDeclares(source, slot?.name)) errors.push(`${label} source is missing slot ${slot?.name}`)
        }
      }
    }

    if (typeof component?.docs === 'string') {
      const docsPath = resolve(directory, component.docs)
      if (!component.docs.startsWith('docs/') || !component.docs.endsWith('.md') || !existsSync(docsPath)) {
        errors.push(`${label} docs do not exist: ${component.docs}`)
      } else {
        const docs = readFileSync(docsPath, 'utf8')
        if (component.name && !docs.includes(component.name)) errors.push(`${label} docs do not mention ${component.name}`)
        if (!docs.includes('```vue')) errors.push(`${label} docs are missing a Vue example`)
        const states = component.states ?? []
        if (!Array.isArray(states) || states.some(state => !STATUSES.has(state))) {
          errors.push(`${label} states must only use loading, empty, error, or ready`)
        } else if (states.length === 0 && !docs.includes('不适用于')) {
          errors.push(`${label} docs must say when loading, empty, and error do not apply`)
        } else {
          for (const state of states) {
            if (!docs.includes(state)) errors.push(`${label} docs do not mention state ${state}`)
          }
        }
      }
    }

    if (!Array.isArray(component?.props)) errors.push(`${label} props must be an array`)
    if (!Array.isArray(component?.slots)) errors.push(`${label} slots must be an array`)
  }

  for (const directoryName of ['ui', 'marketing']) {
    const componentDir = join(directory, 'app/components', directoryName)
    if (!existsSync(componentDir)) continue
    for (const file of readdirSync(componentDir)) {
      if (!file.endsWith('.vue')) continue
      const source = `app/components/${directoryName}/${file}`
      if (!sources.has(source)) errors.push(`${source} is not registered`)
    }
  }

  return errors
}

function expectedComponentName(source) {
  const match = typeof source === 'string' ? source.match(/^app\/components\/(.+)\.vue$/) : null
  if (!match) return null
  return match[1].split('/').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('')
}

function slotDeclares(source, name) {
  if (!name) return false
  if (name === 'default') return source.includes('<slot')
  return source.includes(`#${name}`) || source.includes(`name="${name}"`) || source.includes(`'${name}'`)
}

function readRegistry(directory) {
  const path = resolve(directory, 'registry/components.json')
  return JSON.parse(readFileSync(path, 'utf8'))
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const errors = validateRegistry(readRegistry(root))
  if (errors.length) {
    for (const error of errors) console.error(error)
    process.exit(1)
  }
  const count = JSON.parse(readFileSync(resolve(root, 'registry/components.json'), 'utf8')).components.length
  console.log(`Registry OK (${count} components)`)
}

