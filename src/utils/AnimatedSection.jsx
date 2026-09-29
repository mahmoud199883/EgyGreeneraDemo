/**
 * Reusable Animation/Transition Component
 * Provides smooth animations and transitions across the application
 */

import { useEffect, useRef } from 'react'
import './animations.css'

export function AnimatedSection({ 
  children, 
  animation = 'fade-up', 
  delay = 0,
  className = '',
  ...props 
}) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      element.style.opacity = '1'
      element.style.transform = 'none'
      return
    }

    // Add animation class
    element.classList.add(`animation-${animation}`)
    if (delay > 0) {
      element.style.animationDelay = `${delay}ms`
    }
  }, [animation, delay])

  return (
    <div 
      ref={ref} 
      className={`animated-element ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Page Transition Wrapper
 * Adds smooth transitions when navigating between pages
 */
export function PageTransition({ children, duration = 300 }) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      element.style.opacity = '1'
      return
    }

    // Fade in animation on mount
    element.style.animation = `fadeIn ${duration}ms ease-in-out`
  }, [duration])

  return (
    <div ref={ref} className="page-transition-wrapper">
      {children}
    </div>
  )
}

/**
 * Hover Animation Wrapper
 * Adds hover effects to elements
 */
export function HoverAnimatedElement({ 
  children, 
  effect = 'scale', 
  className = '',
  ...props 
}) {
  return (
    <div 
      className={`hover-animated hover-${effect} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default AnimatedSection
