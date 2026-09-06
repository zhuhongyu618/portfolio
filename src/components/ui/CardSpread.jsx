import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import './CardSpread.css'

const CardSpread = ({
  cards = [],
  spreadAmount = 80,
  rotateAmount = 12,
  direction = 'horizontal',
  className = '',
}) => {
  const containerRef = useRef(null)
  const cardRefs = useRef([])
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const openCards = () => {
      setIsOpen(true)
      const cards = cardRefs.current.filter(Boolean)
      const total = cards.length
      const center = (total - 1) / 2

      cards.forEach((card, i) => {
        const offset = i - center
        const x = direction === 'horizontal' ? offset * spreadAmount : 0
        const y = direction === 'vertical' ? offset * spreadAmount : 0
        const rotate = -offset * rotateAmount

        gsap.to(card, {
          x,
          y,
          rotate,
          zIndex: i + 1,
          duration: 0.7,
          ease: 'elastic.out(1, 0.5)',
        })
      })
    }

    const closeCards = () => {
      setIsOpen(false)
      const cards = cardRefs.current.filter(Boolean)

      cards.forEach((card, i) => {
        gsap.to(card, {
          x: 0,
          y: 0,
          rotate: 0,
          zIndex: i + 1,
          duration: 0.5,
          ease: 'power3.inOut',
        })
      })
    }

    container.addEventListener('mouseenter', openCards)
    container.addEventListener('mouseleave', closeCards)
    container.addEventListener('focusin', openCards)
    container.addEventListener('focusout', closeCards)

    return () => {
      container.removeEventListener('mouseenter', openCards)
      container.removeEventListener('mouseleave', closeCards)
      container.removeEventListener('focusin', openCards)
      container.removeEventListener('focusout', closeCards)
      cardRefs.current.forEach((card) => {
        if (card) gsap.killTweensOf(card)
      })
    }
  }, [spreadAmount, rotateAmount, direction, cards.length])

  const handleCardClick = (index) => {
    const cards = cardRefs.current.filter(Boolean)
    const total = cards.length
    const center = (total - 1) / 2

    // Bring clicked card to front
    setActiveIndex(index)

    cards.forEach((card, i) => {
      const offset = i - center
      const x = direction === 'horizontal' ? offset * spreadAmount : 0
      const y = direction === 'vertical' ? offset * spreadAmount : 0
      const rotate = -offset * rotateAmount
      const isActive = i === index

      gsap.to(card, {
        x: isActive ? 0 : x,
        y: isActive ? -40 : y,
        rotate: isActive ? 0 : rotate,
        scale: isActive ? 1.15 : 1,
        zIndex: isActive ? 100 : i + 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      })
    })
  }

  const setRef = (index) => (el) => {
    if (el) cardRefs.current[index] = el
  }

  return (
    <div
      ref={containerRef}
      className={`card-spread ${isOpen ? 'card-spread--open' : ''} ${className}`}
      style={{ perspective: '1200px' }}
    >
      <div className="card-spread__deck">
        {cards.map((card, i) => (
          <div
            key={i}
            ref={setRef(i)}
            className={`card-spread__card card-spread__card--${card.variant || 'default'} ${i === activeIndex ? 'card-spread__card--active' : ''}`}
            style={{ zIndex: i + 1 }}
            onClick={() => handleCardClick(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleCardClick(i)
              }
            }}
          >
            <div className="card-spread__noise" aria-hidden="true" />
            <div className="card-spread__scanlines" aria-hidden="true" />
            <div className="card-spread__glow" aria-hidden="true" />
            <div className="card-spread__content">
              <div className="card-spread__label">
                <span className="card-spread__dot" />
                <span className="card-spread__label-text">{card.label}</span>
              </div>
              <h3 className="card-spread__title">{card.title}</h3>
              <div className="card-spread__body">
                {card.body}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card-spread__hint">
        <span>悬停展开 · 点击置前</span>
      </div>
    </div>
  )
}

export default CardSpread
