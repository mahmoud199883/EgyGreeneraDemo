import { useState } from 'react'
import { createTranslator } from '../../i18n/translations'
import { downloadWebsitePdf } from '../../services/websitePdf'
import styles from './PdfDownloadButton.module.css'

export default function PdfDownloadButton({ language, className = '' }) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')
  const t = createTranslator(language)

  const handleDownload = async () => {
    setIsGenerating(true)
    setError('')

    try {
      await downloadWebsitePdf(language)
    } catch (error) {
      console.error('Failed to generate PDF', error)
      setError(t('pdf.error'))
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={`${styles.button} ${className}`.trim()}
        onClick={handleDownload}
        disabled={isGenerating}
      >
        {isGenerating ? t('pdf.generating') : t('pdf.download')}
      </button>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}
