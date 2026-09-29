export const websiteInfo = {
  name: 'EgyGreenera',
  taglineKey: 'pdf.tagline',
  descriptionKey: 'pdf.aboutDescription',
  websiteUrl: 'https://www.egygreenera.com',
  sections: [
    {
      id: 'frozen',
      titleKey: 'pdf.sections.frozen.title',
      descriptionKey: 'pdf.sections.frozen.description',
      url: 'https://www.egygreenera.com/frozen',
    },
    {
      id: 'pickled',
      titleKey: 'pdf.sections.pickled.title',
      descriptionKey: 'pdf.sections.pickled.description',
      url: 'https://www.egygreenera.com/pickled',
    },
    {
      id: 'quality',
      titleKey: 'pdf.sections.quality.title',
      descriptionKey: 'pdf.sections.quality.description',
      url: 'https://www.egygreenera.com/quality',
    },
    {
      id: 'markets',
      titleKey: 'pdf.sections.markets.title',
      descriptionKey: 'pdf.sections.markets.description',
      url: 'https://www.egygreenera.com/markets',
    },
    {
      id: 'about',
      titleKey: 'pdf.sections.about.title',
      descriptionKey: 'pdf.sections.about.description',
      url: 'https://www.egygreenera.com/about-us',
    },
    {
      id: 'contact',
      titleKey: 'pdf.sections.contact.title',
      descriptionKey: 'pdf.sections.contact.description',
      url: 'https://www.egygreenera.com/contact',
    },
  ],
  contact: {
    email: 'exportsales@egygreenera.com',
    phone: '+20 3 4222 233',
    addressKey: 'pdf.contact.address',
    website: 'https://www.egygreenera.com',
    socialLinks: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/company/egygreenera' },
      { label: 'Instagram', url: 'https://www.instagram.com/egygreenera' },
      { label: 'Facebook', url: 'https://www.facebook.com/egygreenera' },
      { label: 'X', url: 'https://x.com/egygreenera' },
    ],
  },
}

export function resolveWebsiteInfo(language, t) {
  return {
    ...websiteInfo,
    tagline: t(websiteInfo.taglineKey),
    description: t(websiteInfo.descriptionKey),
    contact: {
      ...websiteInfo.contact,
      address: t(websiteInfo.contact.addressKey),
      socials: websiteInfo.contact.socialLinks.map((link) => ({
        ...link,
        label: link.label,
      })),
    },
    sections: websiteInfo.sections.map((section) => ({
      ...section,
      title: t(section.titleKey),
      description: t(section.descriptionKey),
    })),
    language,
  }
}
