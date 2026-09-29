
import { useEffect, useRef, useState } from 'react'
import { createTranslator, languageOptions } from '../../i18n/translations'
import { getPrimaryNavItems } from '../../config/navigation'
import styles from './Header.module.css'
import logo from '../../assets/logo.png'

// Logo image matching the brand mark
function LogoMark() {
  return (
    <img
      src={logo}
      alt="EgyGreenera logo"
      className={styles.markSvg}
    />
  )
}

export default function Header({ language, onLanguageChange, dark, onThemeChange, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const languageMenuRef = useRef(null)
  const t = createTranslator(language)

  useEffect(() => {
    const closeLanguageMenu = (event) => {
      if (!languageMenuRef.current?.contains(event.target)) {
        setLanguageMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', closeLanguageMenu)
    return () => document.removeEventListener('pointerdown', closeLanguageMenu)
  }, [])

  const navigate = (event, path) => {
    event.preventDefault()
    setMenuOpen(false)
    onNavigate(path)
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <a className={styles.brand} href="/" onClick={(event) => navigate(event, '/')}>
            <LogoMark />
            <span className={styles.brandText}>EgyGreenera</span>
          </a>

          <nav className={styles.desktopNav}>
            {getPrimaryNavItems().map((item) => (
              <a key={item.id} href={item.path} onClick={(event) => navigate(event, item.path)}>
                {t(item.labelKey)}
              </a>
            ))}
          </nav>

          <div className={styles.controls}>
            <button
              className={styles.iconButton}
              aria-label={t('header.toggleTheme')}
              onClick={() => onThemeChange(!dark)}
            >
              {dark ? '☀' : '◐'}
            </button>
            <div className={styles.languageControl} ref={languageMenuRef}>
              <button
                type="button"
                className={styles.language}
                onClick={() => setLanguageMenuOpen((open) => !open)}
                aria-label={t('header.language')}
                aria-expanded={languageMenuOpen}
                aria-haspopup="listbox"
              >
                {languageOptions.find((option) => option.code === language)?.label}
              </button>
              {languageMenuOpen && (
                <div className={styles.languageMenu} role="listbox" aria-label={t('header.language')}>
                  {languageOptions.map(({ code, label }) => (
                    <button
                      type="button"
                      role="option"
                      aria-selected={code === language}
                      className={`${styles.languageOption} ${code === language ? styles.selectedLanguage : ''}`}
                      key={code}
                      onClick={() => {
                        onLanguageChange(code)
                        setLanguageMenuOpen(false)
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              className={`${styles.iconButton} ${styles.menuButton}`}
              aria-label={t('header.menu')}
              onClick={() => setMenuOpen(true)}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Sheet */}
      <div className={`${styles.sheet} ${menuOpen ? styles.open : ''}`}>
        <div className={styles.sheetTop}>
          <a className={styles.brand} href="/" onClick={(event) => navigate(event, '/')}>
            <LogoMark />
            <span className={styles.brandText}>EgyGreenera</span>
          </a>
          <button
            className={styles.iconButton}
            aria-label={t('header.closeMenu')}
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>
        </div>
        <nav>
          {getPrimaryNavItems().map((item) => (
            <a key={item.id} href={item.path} onClick={(event) => navigate(event, item.path)}>
              {t(item.labelKey)}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}