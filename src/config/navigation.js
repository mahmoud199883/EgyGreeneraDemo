/**
 * Dynamic Navigation Configuration
 * Centralized navigation structure for easy maintenance and scalability
 */

export const navigationConfig = [
  {
    id: 'home',
    label: 'Home',
    labelKey: 'nav.home',
    path: '/',
    isActive: (path) => path === '/',
  },
  {
    id: 'frozen',
    label: 'Frozen',
    labelKey: 'nav.frozen',
    path: '/frozen',
    isActive: (path) => path === '/frozen',
  },
  {
    id: 'pickled',
    label: 'Pickled',
    labelKey: 'nav.pickled',
    path: '/pickled',
    isActive: (path) => path === '/pickled',
  },
  {
    id: 'about',
    label: 'About Us',
    labelKey: 'nav.about',
    path: '/about-us',
    isActive: (path) => path === '/about-us',
  },
  {
    id: 'journey',
    label: 'Our Journey',
    labelKey: 'nav.journey',
    path: '/journey',
    isActive: (path) => path === '/journey',
  },
  {
    id: 'quality',
    label: 'Quality',
    labelKey: 'nav.quality',
    path: '/quality',
    isActive: (path) => path === '/quality',
  },
  {
    id: 'markets',
    label: 'Markets',
    labelKey: 'nav.markets',
    path: '/markets',
    isActive: (path) => path === '/markets',
  },
  {
    id: 'contact',
    label: 'Contact',
    labelKey: 'nav.contact',
    path: '/contact',
    isActive: (path) => path === '/contact',
  },
]

// Get navigation items excluding Home
export const getPrimaryNavItems = () => navigationConfig.filter(item => item.id !== 'home')
