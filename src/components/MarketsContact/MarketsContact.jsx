import { useState } from 'react'
import { createTranslator } from '../../i18n/translations'
import styles from './MarketsContact.module.css'
import marketShipping from '../../assets/journey/stage-04.jpg'

const markets = [
  { amount: 46, code: 'EU' },
  { amount: 27, code: 'MEA' },
  { amount: 14, code: 'NA' },
  { amount: 9, code: 'APAC' },
  { amount: 4, code: 'ROW' },
]

export default function MarketsContact({ language, section = 'both' }) {
  const t = createTranslator(language)
  const [sent, setSent] = useState(false)

  return (
    <>
      {/* SECTION 1: MARKETS / WHERE WE SHIP */}
      {section !== 'contact' && (
        <section className={styles.markets} id="markets">
          <div className={styles.inner}>
            <header className={styles.header}>
              <p className={styles.eyebrow}>
                <span className={styles.line}>—</span> {t('markets.eyebrow')}
              </p>
              <h2>{t('markets.title')}</h2>
              <p className={styles.subhead}>
                {t('markets.lead')}
              </p>
            </header>

            <div className={styles.marketGrid}>
              <div className={styles.imageFrame}>
                <img
                  src={marketShipping}
                  alt="Cargo ship at container port terminal"
                />
                <div className={styles.imageBadge}>
                  <strong>30+</strong>
                  <span>{t('markets.destinations')}</span>
                </div>
              </div>

              <div className={styles.statsCard}>
                <div className={styles.statsHeader}>
                  <h3>{t('markets.shareTitle')}</h3>
                  <span className={styles.badge}>{t('markets.annualShare')}</span>
                </div>

                <div className={styles.regionList}>
                  {markets.map((m, index) => (
                    <div className={styles.regionItem} key={m.code}>
                      <div className={styles.regionMeta}>
                        <span className={styles.regionName}>{t(`markets.regions.${index}`)}</span>
                        <span className={styles.regionAmount}>{m.amount}%</span>
                      </div>
                      <div className={styles.track}>
                        <div
                          className={styles.fill}
                          style={{ width: `${m.amount}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: CONTACT / INQUIRY */}
      {section !== 'markets' && (
        <section className={styles.contact} id="contact">
          <div className={styles.inner}>
            <div className={styles.contactGrid}>
              <div className={styles.contactInfo}>
                <p className={styles.eyebrow}>
                  <span className={styles.line}>—</span> {t('contact.eyebrow')}
                </p>
                <h2>{t('contact.title')}</h2>
                <p className={styles.contactCopy}>
                  {t('contact.lead')}
                </p>

                <div className={styles.infoCards}>
                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>📍</div>
                    <div>
                      <dt>{t('contact.headquarters')}</dt>
                      <dd>{t('contact.address')}</dd>
                    </div>
                  </div>

                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>✉️</div>
                    <div>
                      <dt>Email</dt>
                      <dd>exportsales@egygreenera.com</dd>
                    </div>
                  </div>

                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>📞</div>
                    <div>
                      <dt>{t('contact.phone')}</dt>
                      <dd dir="ltr">+20 3 4222 233</dd>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.formContainer}>
                <form
                  className={styles.form}
                  onSubmit={(event) => {
                    event.preventDefault()
                    setSent(true)
                    event.currentTarget.reset()
                  }}
                >
                  <div className={styles.formRow}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="fullname">{t('contact.fullName')}</label>
                      <input id="fullname" required placeholder={t('contact.fullNamePlaceholder')} />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="company">{t('contact.company')}</label>
                      <input id="company" placeholder={t('contact.companyPlaceholder')} />
                    </div>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="email">{t('contact.email')}</label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="name@company.com"
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="message">{t('contact.details')}</label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      placeholder={t('contact.detailsPlaceholder')}
                    />
                  </div>

                  <button type="submit" className={styles.submitBtn}>
                    <span>{t('contact.submit')}</span>
                    <span className={styles.btnArrow}>→</span>
                  </button>

                  {sent && (
                    <div className={styles.sentBanner}>
                      ✓ {t('contact.sent')}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}