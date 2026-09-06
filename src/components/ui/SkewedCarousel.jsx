import { useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import './SkewedCarousel.css'

/**
 * SkewedCarousel · 倾斜卡片滚动 marquee
 * 卡片随滚动连续位移并基于视口中心进行 skew + scale 变换
 * 越靠近中心 → 越大越正；越接近两端 → 越小越倾斜
 * 支持 hover 暂停 / 点击置前放大 / 边缘淡出
 */
const SkewedCarousel = ({
  cards = [],
  speed = 60,
  skewAmount = 14,
  scaleAt = 0.7,   // 边缘最小缩放
  cardWidth = 360,
  cardHeight = 480,
  gap = 32,
  direction = 'left',
  className = '',
  pauseOnHover = true,
  showFade = true,
}) => {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const cardRefs = useRef([])
  const [isPaused, setIsPaused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)
  const positionRef = useRef(0)
  const pausedRef = useRef(false)
  const activeRef = useRef(null)
  const rafRef = useRef(null)

  // 复制 3 份实现无缝循环
  const items = [...cards, ...cards, ...cards]

  // 每帧计算每张卡片相对视口中心的偏移，应用 skew + scale
  const updateCards = useCallback(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    const containerRect = container.getBoundingClientRect()
    const containerCenter = containerRect.left + containerRect.width / 2
    const active = activeRef.current

    cardRefs.current.forEach((card, i) => {
      if (!card) return
      const cardRect = card.getBoundingClientRect()
      const cardCenter = cardRect.left + cardRect.width / 2
      // 归一化偏移：-1(最左) → 0(中心) → 1(最右)
      const norm = (cardCenter - containerCenter) / (containerRect.width / 2)
      const clamped = Math.max(-1, Math.min(1, norm))
      // 平滑曲线（中心平坦、两端陡峭）
      const intensity = Math.abs(clamped)
      const realIndex = i % cards.length
      const isActive = active === realIndex

      // 激活卡片：放大置前、不透明、不倾斜
      const skewY = isActive ? 0 : -clamped * skewAmount
      const scale = isActive ? 1.12 : 1 - intensity * (1 - scaleAt)
      const opacity = isActive ? 1 : 1 - intensity * 0.35
      const z = isActive ? 200 : Math.round((1 - intensity) * 100)

      card.style.transform = `translateZ(0) skewY(${skewY}deg) scale(${scale})`
      card.style.opacity = opacity
      card.style.zIndex = z
    })
  }, [skewAmount, scaleAt, cards.length])

  // 同步暂停状态到 ref，避免重启 RAF 循环
  useEffect(() => {
    pausedRef.current = isPaused
  }, [isPaused])

  // 同步激活索引到 ref
  useEffect(() => {
    activeRef.current = activeIndex
  }, [activeIndex])

  // 单一持久 RAF 循环：滚动 + 每帧 skew/scale
  useEffect(() => {
    const step = () => {
      const track = trackRef.current
      if (track) {
        const trackWidth = track.scrollWidth / 3
        if (!pausedRef.current) {
          const delta = speed / 60
          if (direction === 'left') {
            positionRef.current += delta
            if (positionRef.current >= trackWidth) positionRef.current -= trackWidth
          } else {
            positionRef.current -= delta
            if (positionRef.current <= -trackWidth) positionRef.current += trackWidth
          }
          track.style.transform = `translateX(${-positionRef.current}px)`
        }
        updateCards()
      }
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [speed, direction, updateCards])

  // resize 重新计算
  useEffect(() => {
    const onResize = () => updateCards()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [updateCards])

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true)
  }
  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false)
      setActiveIndex(null)
    }
  }

  // 点击卡片 → 置前并放大，再次点击复位
  const handleCardClick = (i) => {
    setActiveIndex((prev) => (prev === i ? null : i))
  }

  return (
    <div
      ref={containerRef}
      className={`skewed-carousel ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        '--sc-card-w': `${cardWidth}px`,
        '--sc-card-h': `${cardHeight}px`,
        '--sc-gap': `${gap}px`,
      }}
    >
      {showFade && (
        <>
          <div className="skewed-carousel__fade skewed-carousel__fade--left" />
          <div className="skewed-carousel__fade skewed-carousel__fade--right" />
        </>
      )}

      <div className="skewed-carousel__viewport">
        <div ref={trackRef} className="skewed-carousel__track">
          {items.map((card, i) => {
            const realIndex = i % cards.length
            const isActive = activeIndex === realIndex
            return (
              <div
                key={i}
                ref={(el) => (cardRefs.current[i] = el)}
                className={`skewed-carousel__card${
                  card.variant ? ` skewed-carousel__card--${card.variant}` : ''
                }${isActive ? ' skewed-carousel__card--active' : ''}`}
                onClick={() => handleCardClick(realIndex)}
              >
                <div className="skewed-carousel__noise" />
                <div className="skewed-carousel__scanlines" />
                <div className="skewed-carousel__glow" />
                <div className="skewed-carousel__content">
                  <div className="skewed-carousel__label">
                    <span className="skewed-carousel__dot" />
                    <span className="skewed-carousel__label-text">{card.label}</span>
                  </div>
                  <h3 className="skewed-carousel__title">{card.title}</h3>
                  <div className="skewed-carousel__body">{card.body}</div>
                  <div className="skewed-carousel__index">
                    {String(realIndex + 1).padStart(2, '0')}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SkewedCarousel
