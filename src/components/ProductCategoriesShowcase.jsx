import { createTranslator } from '../i18n/translations'
import { productCategories } from '../config/productCategories'
import { AnimatedSection } from '../utils/AnimatedSection'
import styles from './ProductCategoriesShowcase.module.css'

/**
 * Product Categories Showcase Component
 * Displays Frozen and Pickled product categories on homepage
 */
export default function ProductCategoriesShowcase({ language, onNavigate }) {
  const t = createTranslator(language)
  const frozen = productCategories.frozen
  const pickled = productCategories.pickled

  const handleNavigate = (path) => {
    onNavigate(path)
  }

  return (
    <section className={styles.showcase}>
      <div className={styles.inner}>
        <AnimatedSection animation="fade-up" className={styles.header}>
          <h2>{t('showcase.heading')}</h2>
          <p>{t('showcase.subheading')}</p>
        </AnimatedSection>

        <div className={styles.grid}>
          {/* Frozen Card */}
          <AnimatedSection
            animation="slide-left"
            delay={0}
            className={styles.card}
          >
            <div 
              className={styles.cardImage}
              style={{ backgroundImage: `url(${frozen.heroImageUrl})` }}
              role="img"
              aria-label={frozen.titleEn}
            />
            <div className={styles.cardContent}>
              <h3>{frozen.titleEn}</h3>
              <p>{frozen.descriptionEn}</p>
              <button
                className={styles.button}
                onClick={() => handleNavigate('/frozen')}
              >
                {frozen.ctaEn}
              </button>
            </div>
          </AnimatedSection>

          {/* Pickled Card */}
          <AnimatedSection
            animation="slide-right"
            delay={50}
            className={styles.card}
          >
            <div 
              className={styles.cardImage}
              style={{ backgroundImage: `url(${pickled.heroImageUrl})` }}
              role="img"
              aria-label={pickled.titleEn}
            />
            <div className={styles.cardContent}>
              <h3>{pickled.titleEn}</h3>
              <p>{pickled.descriptionEn}</p>
              <button
                className={styles.button}
                onClick={() => handleNavigate('/pickled')}
              >
                {pickled.ctaEn}
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
