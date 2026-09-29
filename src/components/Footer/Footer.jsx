import styles from './Footer.module.css'
import { createTranslator } from '../../i18n/translations'

const toAppUrl = (path) => {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '')
  const normalized = path.startsWith('/') ? path : `/${path}`
  return base ? `${base}${normalized}` : normalized
}

export default function Footer({ language, onNavigate }) {
  const t = createTranslator(language)

  const route = (event, path) => {
    event.preventDefault()
    onNavigate(path)
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <a className={styles.brand} href={toAppUrl('/')} onClick={(event) => route(event, '/')}>
            <span>EG</span>EgyGreenera
          </a>
          <p>{t('footer.description')}</p>
        </div>

        <div>
          <h3>{t('footer.company')}</h3>
          <a href={toAppUrl('/about-us')} onClick={(event) => route(event, '/about-us')}>{t('nav.about')}</a>
          <a href={toAppUrl('/journey')} onClick={(event) => route(event, '/journey')}>{t('nav.journey')}</a>
          <a href={toAppUrl('/quality')} onClick={(event) => route(event, '/quality')}>{t('nav.quality')}</a>
        </div>

        <div>
          <h3>{t('common.products')}</h3>
          <a href={toAppUrl('/frozen')} onClick={(event) => route(event, '/frozen')}>{t('nav.frozen')}</a>
          <a href={toAppUrl('/pickled')} onClick={(event) => route(event, '/pickled')}>{t('nav.pickled')}</a>
          <a href={toAppUrl('/markets')} onClick={(event) => route(event, '/markets')}>{t('nav.markets')}</a>
        </div>

        <div>
          <h3>{t('footer.contact')}</h3>
          <a href="mailto:exportsales@egygreenera.com">exportsales@egygreenera.com</a>
          <span dir="ltr">+20 3 4222 233</span>
        </div>
      </div>

      <div className={styles.bottom}>© 2026 EgyGreenera. {t('footer.rights')}</div>
    </footer>
  )
}
