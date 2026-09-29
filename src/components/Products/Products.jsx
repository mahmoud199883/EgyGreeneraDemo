import { useState } from 'react'
import { createTranslator } from '../../i18n/translations'
import styles from './Products.module.css'

const products = [
  {
    nameEn: 'Strawberry',
    nameAr: 'فراولة',
    latin: 'Fragaria × ananassa',
    months: [1, 2, 3, 4, 12],
    image: '../../assets/images/strawberry.jpg',
    descriptionEn: 'Grown in rich Nile Valley soils under strict temperature controls, ensuring high sugar content and firm texture.',
    descriptionAr: 'تُزرع في تربة وادي النيل الغنية تحت قيراط حراري صارم لضمان نسبة سكر عالية وقوام متماسك.',
    gallery: [
      {
        titleEn: 'Farming & Land Prep',
        titleAr: 'الزراعة وتجهيز التربة',
        url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
      },
      {
        titleEn: 'Fresh Strawberry Harvest',
        titleAr: 'حصاد الفراولة الطازجة',
        url: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80',
      },
      {
        titleEn: 'IQF Freezing & Sorting',
        titleAr: 'الفرز والتجميد السريع',
        url: 'https://images.unsplash.com/photo-1543528176-61b239494933?auto=format&fit=crop&w=800&q=80',
      },
      {
        titleEn: 'Reefer Container Shipping',
        titleAr: 'الشحن في المبردات',
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    nameEn: 'Okra',
    nameAr: 'بامية',
    latin: 'Abelmoschus esculentus',
    months: [6, 7, 8, 9, 10],
    image: 'https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'Hand-picked daily at peak tenderness to preserve vibrant green color and uniform size.',
    descriptionAr: 'تُقطف يدويًا يوميًا في ذروة نضارتها للحفاظ على اللون الأخضر الداكن والحجم المتناسق.',
    gallery: [
      {
        titleEn: 'Okra Cultivation',
        titleAr: 'زراعة البامية',
        url: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?auto=format&fit=crop&w=800&q=80',
      },
      {
        titleEn: 'Hand Picking Pods',
        titleAr: 'قطف القرون يدويًا',
        url: 'https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?auto=format&fit=crop&w=800&q=80',
      },
      {
        titleEn: 'Sizing & Quality Check',
        titleAr: 'فحص الجودة والمقاسات',
        url: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=800&q=80',
      },
      {
        titleEn: 'Export Cargo Shipping',
        titleAr: 'الشحن والتصدير للخارج',
        url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    nameEn: 'Cauliflower',
    nameAr: 'قرنبيط',
    latin: 'Brassica oleracea',
    months: [1, 2, 3, 12],
    image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'Harvested during winter months for compact heads, bright white color, and maximum nutritional value.',
    descriptionAr: 'يُحصد في أشهر الشتاء للحصول على رؤوس متماسكة ولون أبيض ناصع وأعلى قيمة غذائية.',
    gallery: [
      {
        titleEn: 'Winter Crop Farming',
        titleAr: 'زراعة المحصول الشتوي',
        url: 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=800&q=80',
      },
      {
        titleEn: 'Curd Harvesting',
        titleAr: 'حصاد زهور القرنبيط',
        url: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=800&q=80',
      },
      {
        titleEn: 'Floret Trimming & IQF',
        titleAr: 'تقطيع وتجميد الأزهار',
        url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      },
      {
        titleEn: 'Cold Logistics Dispatch',
        titleAr: 'شحن اللوجستيات المبردة',
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    nameEn: 'Molokhia',
    nameAr: 'ملوخية',
    latin: 'Corchorus olitorius',
    months: [6, 7, 8, 9],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'Finely minced and flash-frozen immediately after picking to lock in traditional flavor and deep color.',
    descriptionAr: 'تُفرك و تُجمد سريعًا بعد القطف مباشرة للحفاظ على الطعم الأصلي واللون الأخضر الناصع.',
    gallery: [
      {
        titleEn: 'Green Leaf Fields',
        titleAr: 'حقول الملوخية الخضراء',
        url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
      },
      {
        titleEn: 'Fresh Leaf Picking',
        titleAr: 'جني الأوراق الطازجة',
        url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      },
      {
        titleEn: 'Washing & Mincing',
        titleAr: 'الغسيل والخرط الآلي',
        url: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80',
      },
      {
        titleEn: 'Cold Storage Container Loading',
        titleAr: 'تحميل containers التبريد',
        url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    nameEn: 'Green Peas',
    nameAr: 'بسلة خضراء',
    latin: 'Pisum sativum',
    months: [1, 11, 12],
    image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'Podded at prime sweetness and processed within hours to guarantee natural tenderness.',
    descriptionAr: 'تُقشر عند أوج حلاوتها وتُعالج خلال ساعات لضمان الطراوة والنكهة الطبيعية.',
    gallery: [
      {
        titleEn: 'Pea Vine Farming',
        titleAr: 'زراعة نبات البسلة',
        url: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?auto=format&fit=crop&w=800&q=80',
      },
      {
        titleEn: 'Pea Pod Harvesting',
        titleAr: 'حصاد قرون البسلة',
        url: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=800&q=80',
      },
      {
        titleEn: 'Shelling & Blanching',
        titleAr: 'التقشير والسلق السريع',
        url: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80',
      },
      {
        titleEn: 'Global Container Shipping',
        titleAr: 'الشحن البحري الدولي',
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    nameEn: 'Spinach',
    nameAr: 'سبانخ',
    latin: 'Spinacia oleracea',
    months: [11, 12],
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'Triple-washed young leaves packed immediately under strict food safety standards.',
    descriptionAr: 'أوراق يانعة مغسولة ثلاث مرات ومغلفة فورًا وفق أعلى معايير السلامة الغذائية.',
    gallery: [
      {
        titleEn: 'Spinach Crop Growing',
        titleAr: 'نمو محصول السبانخ',
        url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
      },
      {
        titleEn: 'Fresh Leaf Cutting',
        titleAr: 'قص الأوراق الطازجة',
        url: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80',
      },
      {
        titleEn: 'Triple Wash & Freezing',
        titleAr: 'الغسيل الثلاثي والتجميد',
        url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
      },
      {
        titleEn: 'Refrigerated Transport',
        titleAr: 'النقل في السيارات المبردة',
        url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    nameEn: 'Mixed Vegetables',
    nameAr: 'خضروات مشكلة',
    latin: 'Assorted blend',
    months: [1, 11, 12],
    image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'Balanced mix of peas, carrots, and sweetcorn blended at precise moisture ratios.',
    descriptionAr: 'خليط متوازن من البسلة والجزر والذرة السكرية بتمزج بنسب رطوبة دقيقة.',
    gallery: [
      {
        titleEn: 'Assorted Crops Sourcing',
        titleAr: 'تجميع المحاصيل المختلفة',
        url: 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=800&q=80',
      },
      {
        titleEn: 'Precision Dicing',
        titleAr: 'التقطيع الدقيق للمكعبات',
        url: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80',
      },
      {
        titleEn: 'Automated Blending & Pack',
        titleAr: 'الخلط الآلي والتعبئة',
        url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      },
      {
        titleEn: 'Port Logistics Dispatch',
        titleAr: 'الشحن عبر الموانئ',
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    nameEn: 'Artichoke',
    nameAr: 'خرشوف',
    latin: 'Cynara cardunculus',
    months: [3, 4, 5, 6, 9, 10],
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    descriptionEn: 'Carefully trimmed hearts and bottoms, processed under organic acid baths to preserve natural tone.',
    descriptionAr: 'قلوب وقيعان منقاة بعناية، تُعالج بحموضة طبيعية للحفاظ على اللون والمذاق الممتاز.',
    gallery: [
      {
        titleEn: 'Artichoke Field Cultivation',
        titleAr: 'زراعة الخرشوف في الحقول',
        url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
      },
      {
        titleEn: 'Artichoke Heart Harvest',
        titleAr: 'جني قلوب الخرشوف',
        url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
      },
      {
        titleEn: 'Manual Bottom Trimming',
        titleAr: 'تقليم القيعان يدويًا',
        url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
      },
      {
        titleEn: 'Seaport Cold Shipping',
        titleAr: 'الشحن المبرد عبر الميناء',
        url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
]

const monthsList = [
  { label: 'J', monthNum: 1 },
  { label: 'F', monthNum: 2 },
  { label: 'M', monthNum: 3 },
  { label: 'A', monthNum: 4 },
  { label: 'M', monthNum: 5 },
  { label: 'J', monthNum: 6 },
  { label: 'J', monthNum: 7 },
  { label: 'A', monthNum: 8 },
  { label: 'S', monthNum: 9 },
  { label: 'O', monthNum: 10 },
  { label: 'N', monthNum: 11 },
  { label: 'D', monthNum: 12 },
]

export default function Products({ language }) {
  const [active, setActive] = useState(3)
  const [modalOpen, setModalOpen] = useState(false)
  const [slideIdx, setSlideIdx] = useState(0)

  const ar = language === 'ar'
  const t = createTranslator(language)
  const activeProduct = products[active]

  const openPopup = (index) => {
    setActive(index)
    setSlideIdx(0)
    setModalOpen(true)
  }

  const closePopup = () => setModalOpen(false)

  const renderWheel = (product, size = 300) => {
    const center = size / 2
    const outerR = size * 0.433
    const innerR = size * 0.266
    const labelR = size * 0.483

    return (
      <div className={styles.wheelGraphic} style={{ width: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} className={styles.wheelSvg}>
          {monthsList.map((m, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180)
            const nextAngle = ((i + 1) * 30 - 90) * (Math.PI / 180)
            const isActive = product?.months.includes(m.monthNum)

            const x1 = center + outerR * Math.cos(angle)
            const y1 = center + outerR * Math.sin(angle)
            const x2 = center + outerR * Math.cos(nextAngle)
            const y2 = center + outerR * Math.sin(nextAngle)
            const x3 = center + innerR * Math.cos(nextAngle)
            const y3 = center + innerR * Math.sin(nextAngle)
            const x4 = center + innerR * Math.cos(angle)
            const y4 = center + innerR * Math.sin(angle)

            const pathData = `M ${x1} ${y1} A ${outerR} ${outerR} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 0 0 ${x4} ${y4} Z`

            const labelAngle = ((i + 0.5) * 30 - 90) * (Math.PI / 180)
            const lx = center + labelR * Math.cos(labelAngle)
            const ly = center + labelR * Math.sin(labelAngle)

            return (
              <g key={m.monthNum}>
                <path
                  d={pathData}
                  className={isActive ? styles.sliceActive : styles.sliceInactive}
                />
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={isActive ? styles.labelActive : styles.labelInactive}
                >
                  {m.label}
                </text>
              </g>
            )
          })}
        </svg>
        <div className={styles.wheelCenter} style={{ width: size * 0.5, height: size * 0.5 }}>
          <strong>{product ? (ar ? product.nameAr : product.nameEn) : 'EgyGreenera'}</strong>
          <span className={styles.centerDot} />
        </div>
      </div>
    )
  }

  return (
    <section className={styles.section} id="products">
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.head}>
          <p className={styles.eyebrow}>
            <span className={styles.line}>—</span> {t('products.eyebrow')}
          </p>
          <h2>{t('products.title')}</h2>
          <span className={styles.subtext}>
            {t('products.lead')}
          </span>
        </div>

        {/* Product Grid - OnClick updates active item (hover only changes visual card state) */}
        <div className={styles.grid}>
          {products.map((item, index) => (
            <div
              key={item.nameEn}
              className={`${styles.card} ${active === index ? styles.activeCard : ''}`}
              onClick={() => openPopup(index)}
            >
              <div
                className={styles.cardImage}
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className={styles.cardBody}>
                <b>{ar ? item.nameAr : item.nameEn}</b>
                <i>{item.latin}</i>
                <div className={styles.bars}>
                  {Array.from({ length: 12 }).map((_, mIdx) => (
                    <span
                      key={mIdx}
                      className={item.months.includes(mIdx + 1) ? styles.barOn : styles.barOff}
                    />
                  ))}
                </div>
                <span className={styles.barLabel}>{t('products.harvestSeason')}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Harvest Wheel Section - Responds strictly to clicked product */}
        <div className={styles.wheelContainer}>
          {renderWheel(activeProduct, 300)}
          <div className={styles.wheelContent}>
            <p className={styles.eyebrow}>
              <span className={styles.line}>—</span> {t('products.feature')}
            </p>
            <h3>{t('products.wheelTitle')}</h3>
            <p className={styles.wheelDescription}>
              {t('products.wheelDescription')}
            </p>
            <p className={styles.wheelStatus}>
              {activeProduct
                ? `${ar ? activeProduct.nameAr : activeProduct.nameEn} — ${t('products.activeMonths', { count: activeProduct.months.length })}`
                : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {modalOpen && activeProduct && (
        <div className={styles.overlay} onClick={closePopup}>
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            dir={ar ? 'rtl' : 'ltr'}
          >
            <button className={styles.closeBtn} onClick={closePopup} aria-label={t('products.close')}>
              ✕
            </button>

            <div className={styles.modalGrid}>
              {/* Left Column: Image Slider */}
              <div className={styles.sliderCol}>
                <div className={styles.sliderStage}>
                  <img
                    src={activeProduct.gallery[slideIdx].url}
                    alt={ar ? activeProduct.gallery[slideIdx].titleAr : activeProduct.gallery[slideIdx].titleEn}
                    className={styles.sliderImg}
                  />
                  <div className={styles.slideTag}>
                    {ar
                      ? activeProduct.gallery[slideIdx].titleAr
                      : activeProduct.gallery[slideIdx].titleEn}
                  </div>
                  <button
                    className={`${styles.navBtn} ${styles.prevBtn}`}
                    onClick={() =>
                      setSlideIdx((prev) =>
                        prev === 0 ? activeProduct.gallery.length - 1 : prev - 1
                      )
                    }
                  >
                    ‹
                  </button>
                  <button
                    className={`${styles.navBtn} ${styles.nextBtn}`}
                    onClick={() =>
                      setSlideIdx((prev) =>
                        prev === activeProduct.gallery.length - 1 ? 0 : prev + 1
                      )
                    }
                  >
                    ›
                  </button>
                </div>

                {/* Thumbnails */}
                <div className={styles.thumbs}>
                  {activeProduct.gallery.map((g, i) => (
                    <button
                      key={i}
                      className={`${styles.thumbBtn} ${slideIdx === i ? styles.activeThumb : ''}`}
                      onClick={() => setSlideIdx(i)}
                    >
                      <img src={g.url} alt="thumb" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Harvest Wheel & Description */}
              <div className={styles.detailsCol}>
                <h2>{ar ? activeProduct.nameAr : activeProduct.nameEn}</h2>
                <i className={styles.modalLatin}>{activeProduct.latin}</i>

                <p className={styles.modalDesc}>
                  {ar ? activeProduct.descriptionAr : activeProduct.descriptionEn}
                </p>

                <div className={styles.modalWheelWrapper}>
                  {renderWheel(activeProduct, 220)}
                </div>

                <div className={styles.modalFooter}>
                  <b>{t('products.activeHarvestMonths')}</b>
                  <span>
                    {activeProduct.months.length}{' '}
                    {t('products.monthsPerYear')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}