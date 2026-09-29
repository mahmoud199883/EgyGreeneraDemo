import { createTranslator } from '../../i18n/translations'
import styles from './Quality.module.css'
import qualityAudit from '../../assets/journey/stage-03.jpg'

const certs = ['ISO 22000', 'HACCP', 'BRCGS', 'GLOBALG.A.P.', 'IFS Food', 'Halal']

const stats = ['20+', '32K', '4']

export default function Quality({ language }) {
  const t = createTranslator(language)

  return (
    <section className={styles.section} id="quality">
      <div className={styles.inner}>
        {/* Section Header */}
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            <span className={styles.line}>—</span> {t('quality.eyebrow')}
          </p>
          <h2>{t('quality.title')}</h2>
          <p className={styles.subhead}>
            {t('quality.lead')}
          </p>
        </header>

        {/* Feature Section: Lab Testing & Certifications */}
        <div className={styles.feature}>
          <div className={styles.imageFrame}>
 <img
  src={qualityAudit}
  alt="Official compliance audit and quality certification documentation"
/>
            <div className={styles.imageOverlayBadge}>
              <span className={styles.checkIcon}>✓</span>
              <div>
                <strong>100%</strong>
                <small>{t('quality.labTested')}</small>
              </div>
            </div>
          </div>

          <div className={styles.featureContent}>
            <h3>{t('quality.featureTitle')}</h3>
            <p>
              {t('quality.featureBody')}
            </p>

            <div className={styles.certBlock}>
              <span className={styles.certTitle}>
                {t('quality.accreditations')}
              </span>
              <div className={styles.certifications}>
                {certs.map((item) => (
                  <div className={styles.certBadge} key={item}>
                    <span className={styles.certDot} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Benefits Cards */}
        <div className={styles.benefitsGrid}>
          {[0, 1, 2, 3].map((index) => (
            <article className={styles.benefitCard} key={index}>
              <div className={styles.benefitTop}>
                <span className={styles.stepNum}>0{index + 1}</span>
                <span className={styles.cardBar} />
              </div>
              <h3>{t(`quality.benefits.${index}.title`)}</h3>
              <p>{t(`quality.benefits.${index}.body`)}</p>
            </article>
          ))}
        </div>

        {/* High-Impact Key Metrics / Stats
        <div className={styles.statsContainer}>
          {stats.map((value, idx) => (
            <div className={styles.statBox} key={idx}>
              <b>{value}</b>
              <span>{t(`quality.stats.${idx}`)}</span>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  )
}