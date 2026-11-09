/** Drop local design-system routes so they are not part of a production build. */
export function removeDevOnlyPages(pages) {
  for (let index = pages.length - 1; index >= 0; index -= 1) {
    const page = pages[index]
    const path = page?.path ?? ''
    const file = page?.file ?? ''
    const devRoute = path === '/dev' || path.startsWith('/dev/')
    const devFile = file.includes('/pages/dev/') || file.includes('\\pages\\dev\\')
    if (devRoute || devFile) {
      pages.splice(index, 1)
      continue
    }
    if (page?.children?.length) removeDevOnlyPages(page.children)
  }
  return pages
}
