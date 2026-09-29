import { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import ProductCategoriesShowcase from './components/ProductCategoriesShowcase'
import Journey from './components/Journey/Journey'
import Quality from './components/Quality/Quality'
import MarketsContact from './components/MarketsContact/MarketsContact'
import Footer from './components/Footer/Footer'
import ProductCategoryPage from './pages/ProductCategoryPage'
import AboutUsPage from './pages/AboutUsPage'
import { createTranslator } from './i18n/translations'
import './utils/animations.css'
import styles from './App.module.css'

const BASE_PATH = import.meta.env.BASE_URL || '/'

const normalizePath = (rawPath = window.location.pathname) => {
  const path = rawPath || '/'
  const base = BASE_PATH.replace(/\/+$/, '') || ''
  const withoutBase = base && path.startsWith(base) ? path.slice(base.length) || '/' : path
  return withoutBase === '' ? '/' : withoutBase.replace(/\/+$/, '') || '/'
}

const buildAppPath = (path) => {
  const normalized = path.startsWith('/') ? path : `/${path}`
  const base = BASE_PATH.replace(/\/+$/, '')
  return `${base}${normalized}` || normalized
}

const routeSeoKeys = {
  '/': 'home',
  '/frozen': 'frozen',
  '/pickled': 'pickled',
  '/about-us': 'about',
  '/journey': 'journey',
  '/quality': 'quality',
  '/markets': 'markets',
  '/contact': 'contact',
}

function setMeta(name, content, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(property ? 'property' : 'name', name)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function setCanonical(path) {
  let element = document.head.querySelector('link[rel="canonical"]')

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }

  element.setAttribute('href', `${window.location.origin}${path}`)
}

function App() {
  const [language, setLanguage] = useState('en')
  const [dark, setDark] = useState(false)
  const [path, setPath] = useState(() => normalizePath(window.location.pathname))

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.classList.toggle('dark', dark)
  }, [language, dark])

  useEffect(() => {
    const t = createTranslator(language)
    const pageTitle = t(`seo.${routeSeoKeys[path] || 'home'}`)
    const title = `${pageTitle} | EgyGreenera`
    const description = t('seo.description')

    document.title = title
    setMeta('description', description)
    setMeta('og:title', title, true)
    setMeta('og:description', description, true)
    setMeta('og:locale', language, true)

    setCanonical(buildAppPath(path))
  }, [language, path])

  useEffect(() => {
    const handlePopState = () => setPath(normalizePath(window.location.pathname))
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (nextPath) => {
    const nextUrl = buildAppPath(nextPath)
    window.history.pushState({}, '', nextUrl)
    setPath(normalizePath(nextUrl))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pageContent = {
    '/frozen': <ProductCategoryPage categoryId="frozen" language={language} />,
    '/pickled': <ProductCategoryPage categoryId="pickled" language={language} />,
    '/about-us': <AboutUsPage language={language} />,
    '/journey': <Journey language={language} />,
    '/quality': <Quality language={language} />,
    '/markets': <MarketsContact language={language} section="markets" />,
    '/contact': <MarketsContact language={language} section="contact" />,
  }

  const isHome = path === '/'

  return (
    <div className={styles.app}>
      <Header language={language} onLanguageChange={setLanguage} dark={dark} onThemeChange={setDark} onNavigate={navigate} />
      <main>
        {isHome ? <>
          <Hero language={language} onNavigate={navigate} />
          <AboutUsPage language={language} />
          <ProductCategoriesShowcase language={language} onNavigate={navigate} />
          <Journey language={language} />
          <Quality language={language} />
          <MarketsContact language={language} />
        </> : pageContent[path] || <Hero language={language} onNavigate={navigate} />}
      </main>
      <Footer language={language} onNavigate={navigate} />
    </div>
  )
}

export default App
