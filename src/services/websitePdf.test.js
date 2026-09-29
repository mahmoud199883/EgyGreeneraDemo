import { describe, it, expect } from 'vitest'
import { buildWebsitePdfData } from './websitePdf'

describe('buildWebsitePdfData', () => {
  it('uses centralized website info and localized labels for the active language', () => {
    const pdfData = buildWebsitePdfData('en')

    expect(pdfData.name).toBe('EgyGreenera')
    expect(pdfData.websiteUrl).toBe('https://www.egygreenera.com')
    expect(pdfData.sections).toHaveLength(6)
    expect(pdfData.sections[0].title).toBe('Frozen Products')
    expect(pdfData.sections[0].url).toBe('https://www.egygreenera.com/frozen')
    expect(pdfData.sections[4].title).toBe('About Us')
    expect(pdfData.contact.email).toBe('exportsales@egygreenera.com')
    expect(pdfData.tagline).toBe('Premium Egyptian produce, tracked from farm to freight.')
  })

  it('switches to Arabic labels when the active language is Arabic', () => {
    const pdfData = buildWebsitePdfData('ar')

    expect(pdfData.tagline).toBe('منتجات مصرية متميزة، من المزرعة إلى الشحن.')
    expect(pdfData.sections[1].title).toBe('منتجات مخللة')
    expect(pdfData.contact.address).toBe('سموحة، الإسكندرية، مصر')
  })
})
