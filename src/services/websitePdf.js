import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { createTranslator } from '../i18n/translations'
import { resolveWebsiteInfo } from '../config/websiteInfo'

export function buildWebsitePdfData(language = 'en') {
  const t = createTranslator(language)
  return resolveWebsiteInfo(language, t)
}

function buildPdfMarkup(info, language) {
  const isArabic = language === 'ar'
  const sectionHtml = info.sections
    .map(
      (section) => `
        <div class="pdf-section">
          <h3>${section.title}</h3>
          <p>${section.description}</p>
          <a href="${section.url}">${section.url}</a>
        </div>
      `,
    )
    .join('')

  return `
    <div class="pdf-document" dir="${isArabic ? 'rtl' : 'ltr'}" lang="${language}">
      <div class="pdf-header">
        <div class="pdf-brand">
          <div class="pdf-logo">EG</div>
          <div>
            <h1>${info.name}</h1>
            <p>${info.tagline}</p>
            <a href="${info.websiteUrl}">${info.websiteUrl}</a>
          </div>
        </div>
      </div>

      <section class="pdf-block">
        <h2>${language === 'ar' ? 'نبذة عن الموقع' : language === 'es' ? 'Sobre el sitio web' : language === 'it' ? 'Informazioni sul sito' : 'About the Website'}</h2>
        <p>${info.description}</p>
      </section>

      <section class="pdf-block">
        <h2>${language === 'ar' ? 'الأقسام الرئيسية' : language === 'es' ? 'Secciones principales' : language === 'it' ? 'Sezioni principali' : 'Main Sections'}</h2>
        ${sectionHtml}
      </section>

      <section class="pdf-block">
        <h2>${language === 'ar' ? 'معلومات التواصل' : language === 'es' ? 'Información de contacto' : language === 'it' ? 'Contatti' : 'Contact Information'}</h2>
        <p><strong>${language === 'ar' ? 'البريد الإلكتروني' : language === 'es' ? 'Correo electrónico' : language === 'it' ? 'Email' : 'Email'}:</strong> <a href="mailto:${info.contact.email}">${info.contact.email}</a></p>
        <p><strong>${language === 'ar' ? 'الهاتف' : language === 'es' ? 'Teléfono' : language === 'it' ? 'Telefono' : 'Phone'}:</strong> ${info.contact.phone}</p>
        <p><strong>${language === 'ar' ? 'العنوان' : language === 'es' ? 'Dirección' : language === 'it' ? 'Indirizzo' : 'Address'}:</strong> ${info.contact.address}</p>
        <p><strong>${language === 'ar' ? 'الموقع الإلكتروني' : language === 'es' ? 'Sitio web' : language === 'it' ? 'Sito web' : 'Website'}:</strong> <a href="${info.contact.website}">${info.contact.website}</a></p>
        <p><strong>${language === 'ar' ? 'وسائل التواصل' : language === 'es' ? 'Redes sociales' : language === 'it' ? 'Social media' : 'Social Media'}:</strong></p>
        <ul>
          ${info.contact.socials.map((social) => `<li><a href="${social.url}">${social.label}: ${social.url}</a></li>`).join('')}
        </ul>
      </section>

      <section class="pdf-block">
        <h2>${language === 'ar' ? 'روابط مفيدة' : language === 'es' ? 'Enlaces útiles' : language === 'it' ? 'Link utili' : 'Useful Links'}</h2>
        <ul>
          ${info.sections.map((section) => `<li><a href="${section.url}">${section.title}: ${section.url}</a></li>`).join('')}
        </ul>
      </section>
    </div>
  `
}

export async function downloadWebsitePdf(language = 'en') {
  const info = buildWebsitePdfData(language)

  if (typeof window === 'undefined') {
    return ''
  }

  const wrapper = document.createElement('div')
  wrapper.className = 'pdf-export-wrapper'
  wrapper.setAttribute('style', `
    position: fixed;
    left: -9999px;
    top: -9999px;
    width: 760px;
    background: white;
    color: #17251d;
    font-family: 'Noto Sans Arabic', 'Tahoma', 'Segoe UI', sans-serif;
    direction: ${language === 'ar' ? 'rtl' : 'ltr'};
    text-align: ${language === 'ar' ? 'right' : 'left'};
    padding: 32px;
    box-sizing: border-box;
    z-index: -1;
  `)

  wrapper.innerHTML = `
    <style>
      .pdf-document { font-family: 'Noto Sans Arabic', 'Tahoma', 'Segoe UI', sans-serif; color: #17251d; }
      .pdf-header { background: #0d2d29; color: white; padding: 28px 24px 24px; border-radius: 14px; margin-bottom: 20px; }
      .pdf-brand { display: flex; align-items: center; gap: 18px; justify-content: ${language === 'ar' ? 'flex-end' : 'flex-start'}; }
      .pdf-logo { width: 72px; height: 72px; border-radius: 16px; background: #d78b3b; color: white; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 700; }
      .pdf-header h1 { margin: 0; font-size: 38px; line-height: 1.2; }
      .pdf-header p, .pdf-header a { margin: 6px 0 0; color: #eaf4ee; text-decoration: none; }
      .pdf-block { margin-top: 22px; padding-top: 12px; border-top: 1px solid #dfe6df; }
      .pdf-block h2 { margin: 0 0 10px; font-size: 24px; color: #102a22; }
      .pdf-block h3 { margin: 12px 0 8px; font-size: 18px; color: #17392f; }
      .pdf-block p, .pdf-block li, .pdf-block a { font-size: 14px; line-height: 1.7; color: #1d2b2d; }
      .pdf-section { margin-bottom: 14px; }
      ul { margin: 10px 0 0; padding-inline-start: 22px; }
      a { color: #173a8d; text-decoration: underline; }
    </style>
    ${buildPdfMarkup(info, language)}
  `

  document.body.appendChild(wrapper)

  try {
    const canvas = await html2canvas(wrapper, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
      logging: false,
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ unit: 'pt', format: 'a4', compress: true })
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 24
    const imgProps = pdf.getImageProperties(imgData)
    const imgWidth = pageWidth - margin * 2
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width

    pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight)

    const fileName = `${info.name.toLowerCase().replace(/\s+/g, '-')}-company-overview.pdf`
    pdf.save(fileName)
    return fileName
  } finally {
    wrapper.remove()
  }
}
