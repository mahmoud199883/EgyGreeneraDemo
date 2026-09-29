import { useState } from 'react'
import { createTranslator, translations } from '../i18n/translations'
import { getCategory, getCategoryProducts } from '../config/productCategories'
import { AnimatedSection } from '../utils/AnimatedSection'
import styles from './ProductCategoryPage.module.css'

/**
 * Reusable Product Category Page
 * Displays frozen or pickled products using local assets and a single-image product modal.
 */
export default function ProductCategoryPage({ categoryId, language }) {
  const [active, setActive] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  const t = createTranslator(language)
  const category = getCategory(categoryId)
  const products = getCategoryProducts(categoryId)

  if (!category || !products.length) {
    return <div>{t('category.notFound')}</div>
  }

  const activeProduct = products[active]

  const openPopup = (index) => {
    setActive(index)
    setModalOpen(true)
  }

  const closePopup = () => setModalOpen(false)

  const getTitleByLanguage = (obj, lang = language) => {
    const key = `title${lang.charAt(0).toUpperCase() + lang.slice(1)}`
    return obj[key] || obj.titleEn || obj.nameEn || ''
  }

  const getProductNameByLanguage = (obj, lang = language) => {
    const key = `name${lang.charAt(0).toUpperCase() + lang.slice(1)}`
    return obj[key] || obj.nameEn || obj.titleEn || ''
  }

  const getDescriptionByLanguage = (obj, lang = language) => {
    const key = `description${lang.charAt(0).toUpperCase() + lang.slice(1)}`
    return obj[key] || obj.descriptionEn
  }

  return (
    <section className={styles.category}>
      <AnimatedSection animation="fade-up" className={styles.hero}>
        <div className={styles.heroImage}>
          <img
            src={category.heroImageUrl}
            alt={getTitleByLanguage(category)}
            loading="lazy"
          />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{categoryId.toUpperCase()}</p>
          <h1>{getTitleByLanguage(category)}</h1>
          <p className={styles.lead}>{getDescriptionByLanguage(category)}</p>
          <div className={styles.statRow}>
            <span>{products.length}+ {t('category.statLabels.0')}</span>
            <span>{t('category.statLabels.1')}</span>
            <span>{t('category.statLabels.2')}</span>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection animation="fade-up" delay={100} className={styles.productsGrid}>
        <h2 className={styles.productsTitle}>
          {categoryId === 'frozen' ? t('category.title.frozen') : t('category.title.pickled')}
        </h2>
        <div className={styles.grid}>
          {products.map((product, idx) => (
            <AnimatedSection
              key={product.id}
              animation="scale-in"
              delay={idx * 50}
              className={styles.productCard}
              onClick={() => openPopup(idx)}
            >
              <div className={styles.productImage}>
                <img
                  src={product.image}
                  alt={getProductNameByLanguage(product)}
                  loading="lazy"
                />
              </div>
              <h3>{getProductNameByLanguage(product)}</h3>
              <p className={styles.description}>{getDescriptionByLanguage(product)}</p>
              <button className={styles.viewBtn}>{t('category.viewDetails')}</button>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>

      {modalOpen && activeProduct && (
        <div className={styles.modal} onClick={closePopup}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closePopup} aria-label={t('category.close')}>✕</button>

            <div className={styles.modalBody}>
              <div className={styles.modalGallery}>
                <div className={styles.mainImage}>
                  <img
                    src={activeProduct.image}
                    alt={getProductNameByLanguage(activeProduct)}
                  />
                </div>
              </div>

              <div className={styles.modalInfo}>
                <h2>{getProductNameByLanguage(activeProduct)}</h2>
                <p className={styles.description}>
                  {getDescriptionByLanguage(activeProduct)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
