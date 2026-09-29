import { useState, useEffect } from 'react'
import { createTranslator } from '../../i18n/translations'
import PdfDownloadButton from '../PdfDownloadButton/PdfDownloadButton'
import styles from './Hero.module.css'
import bg1 from '../../assets/bg1.png'
import bg2 from '../../assets/bg2.avif'
import bg3 from '../../assets/bg3.jpg'
import bg4 from '../../assets/bg4.jpg'
import bg5 from '../../assets/bg5.jpg'

const bgImages = [bg1, bg2, bg3, bg4, bg5]

export default function Hero({ language, onNavigate }) {
  const t = createTranslator(language)
  const [currentBg, setCurrentBg] = useState(0)

  // Cycle through background images every 6 seconds (3s display + 3s crossfade transition)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const ports = t('hero.ports')

  return (
    <>
      <section className={styles.hero} id="top">
        {/* Background Image Crossfade Layers */}
        <div className={styles.textureWrapper}>
          {bgImages.map((imgUrl, index) => (
            <div
              key={imgUrl}
              className={`${styles.texture} ${index === currentBg ? styles.activeBg : ''}`}
              style={{ backgroundImage: `url(${imgUrl})` }}
            />
          ))}
          <div className={styles.overlay} />
        </div>

        <div className={styles.inner}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>
              {t('hero.eyebrow')}
            </p>
            <h1>
              {t('hero.titleStart')} <br />
              <em>{t('hero.titleEmphasis')}</em>
            </h1>
            <p className={styles.lead}>
              {t('hero.lead')}
            </p>
            <div className={styles.actions}>
              <a
                href="/frozen"
                onClick={(event) => {
                  event.preventDefault()
                  onNavigate('/frozen')
                }}
                className={styles.primary}
              >
                {t('hero.products')}
              </a>
              <a
                href="/contact"
                onClick={(event) => {
                  event.preventDefault()
                  onNavigate('/contact')
                }}
                className={styles.secondary}
              >
                {t('hero.contact')}
              </a>
              <PdfDownloadButton language={language} className={styles.secondary} />
            </div>
            <div className={styles.stats}>
              <div>
                <b>1+</b>
                <span>{t('hero.years')}</span>
              </div>
              <div>
                <b>20+</b>
                <span>{t('hero.countries')}</span>
              </div>
              <div>
                <b>32K</b>
                <span>{t('hero.tonnes')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Ticker Strip */}
      <div className={styles.strip}>
        <span className={styles.stripBadge}>
          {t('hero.shipping')}
        </span>
        <div className={styles.tickerTrack}>
          <div className={styles.tickerContent}>
            <span>{ports} ...</span>
          </div>
        </div>
      </div>
    </>
  )
}