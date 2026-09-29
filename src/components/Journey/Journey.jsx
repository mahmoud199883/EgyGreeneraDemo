import { useState } from 'react'
import { createTranslator } from '../../i18n/translations'
import styles from './Journey.module.css'
import stage01 from '../../assets/journey/stage-01.jpg'
import stage02 from '../../assets/journey/stage-02.jpg'
import stage03 from '../../assets/journey/stage-03.jpg'
import stage04 from '../../assets/journey/stage-04.jpg'
import stage05 from '../../assets/journey/stage-05.jpg'

const steps = [
  {
    image: stage01,
    badge: 'STAGE 01',
  },
  {
    image: stage02,
    badge: 'STAGE 02',
  },
  {
    image: stage03,
    badge: 'STAGE 03',
  },
  {
    image: stage04,
    badge: 'STAGE 04',
  },
  {
    image: stage05,
    badge: 'STAGE 05',
  },
]

export default function Journey({ language }) {
  const [activeStep, setActiveStep] = useState(0)
  const t = createTranslator(language)
  const current = steps[activeStep]
  const currentBadge = t(`journey.badges.${activeStep}`)

  return (
    <section className={styles.section} id="journey">
      {/* Background Image Carousel Layer */}
      <div className={styles.bgContainer}>
        {steps.map((step, idx) => (
          <div
            key={step.badge}
            className={`${styles.bgImage} ${idx === activeStep ? styles.activeBg : ''}`}
            style={{ backgroundImage: `url(${step.image})` }}
          />
        ))}
        <div className={styles.bgOverlay} />
      </div>

      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            <span className={styles.line}>—</span> {t('journey.eyebrow')}
          </p>
          <h2>{t('journey.title')}</h2>
          <span className={styles.subhead}>
            {t('journey.lead')}
          </span>
        </header>

        {/* Main Interactive Stage Display */}
        <div className={styles.interactiveStage}>
          {/* Step Selector Tabs */}
          <div className={styles.timeline}>
            {steps.map((step, index) => (
              <button
                key={step.badge}
                className={`${styles.timelineTab} ${index === activeStep ? styles.activeTab : ''}`}
                onClick={() => setActiveStep(index)}
              >
                <span className={styles.tabIndex}>0{index + 1}</span>
                <span className={styles.tabTitle}>{t(`journey.steps.${index}.title`)}</span>
                {index === activeStep && <div className={styles.activeBar} />}
              </button>
            ))}
          </div>

          {/* Active Step Content Card */}
          <div className={styles.displayCard}>
            <div className={styles.cardHeader}>
              <span className={styles.stageBadge}>{currentBadge}</span>
              <span className={styles.stepCounter}>
                0{activeStep + 1} / 0{steps.length}
              </span>
            </div>

            <div className={styles.cardContent}>
              <h3>{t(`journey.steps.${activeStep}.title`)}</h3>
              <p>{t(`journey.steps.${activeStep}.body`)}</p>
            </div>

            {/* Navigation Controls */}
            <div className={styles.cardFooter}>
              <button
                className={styles.navBtn}
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => prev - 1)}
              >
                {t('journey.previous')}
              </button>
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressBar}
                  style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                />
              </div>
              <button
                className={styles.navBtn}
                disabled={activeStep === steps.length - 1}
                onClick={() => setActiveStep((prev) => prev + 1)}
              >
                {t('journey.next')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}