import { createTranslator } from '../i18n/translations'
import { AnimatedSection } from '../utils/AnimatedSection'
import mixTypesImage from '../assets/Mixtypes.png'
import storyVisualImage from '../assets/exportProducts.png'
import styles from './AboutUsPage.module.css'

/**
 * About Us Page
 * Presents company expertise and commitment to frozen & pickled products
 */
export default function AboutUsPage({ language }) {
  const t = createTranslator(language)
  const ar = language === 'ar'

  return (
    <div className={styles.aboutContainer}>
      <AnimatedSection animation="fade-up" className={styles.hero}>
        <div className={styles.heroImageWrap}>
          <img
            src={mixTypesImage}
            alt={t('aboutUs.eyebrow')}
            className={styles.heroImage}
          />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{t('aboutUs.eyebrow')}</p>
          <h1>{t('aboutUs.title')}</h1>
          <p className={styles.lead}>{t('aboutUs.lead')}</p>
          <div className={styles.heroStats}>
            <div><strong>1+</strong><span>{t('aboutUs.stats.years')}</span></div>
            <div><strong>20+</strong><span>{t('aboutUs.stats.markets')}</span></div>
            <div><strong>100%</strong><span>{t('aboutUs.stats.quality')}</span></div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection animation="fade-up" className={styles.storySection}>
        <div className={styles.storyText}>
          <p className={styles.label}>{t('aboutUs.storyLabel')}</p>
          <h2>{t('aboutUs.storyTitle')}</h2>
          <p>{t('aboutUs.storyP1')}</p>
          <p>{t('aboutUs.storyP2')}</p>
        </div>
        <div className={styles.storyVisual}>
          <img
            src={storyVisualImage}
            alt={t('aboutUs.storyTitle')}
          />
        </div>
      </AnimatedSection>

      <AnimatedSection animation="fade-up" className={styles.featureSection}>
        <div className={styles.featureCard}>
          <h3>{t('aboutUs.features.frozenTitle')}</h3>
          <p>{t('aboutUs.features.frozenBody')}</p>
        </div>
        <div className={styles.featureCard}>
          <h3>{t('aboutUs.features.pickledTitle')}</h3>
          <p>{t('aboutUs.features.pickledBody')}</p>
        </div>
        <div className={styles.featureCard}>
          <h3>{t('aboutUs.features.supplyTitle')}</h3>
          <p>{t('aboutUs.features.supplyBody')}</p>
        </div>
      </AnimatedSection>
    </div>
  )
}
