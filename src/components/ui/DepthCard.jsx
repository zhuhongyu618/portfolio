import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import './DepthCard.css'

const DepthCard = ({
  children,
  variant = 'default',
  depth = 1,
  rotateAmount = 8,
  className = '',
  glass = false,
}) => {
  const cardRef = useRef(null)
  const layerRefs = useRef({})

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const setLayerRef = (name) => (el) => {
      if (el) layerRefs.current[name] = el
    }

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect()
      const mouseX = (e.clientX - rect.left) / rect.width - 0.5
      const mouseY = (e.clientY - rect.top) / rect.height - 0.5

      gsap.to(card, {
        rotateY: mouseX * rotateAmount,
        rotateX: -mouseY * rotateAmount,
        duration: 0.6,
        ease: 'power3.out',
        transformPerspective: 1000,
        transformOrigin: 'center center',
      })

      const layers = layerRefs.current
      if (layers.bg) {
        gsap.to(layers.bg, {
          x: mouseX * -20 * depth,
          y: mouseY * -20 * depth,
          duration: 0.7,
          ease: 'power3.out',
        })
      }
      if (layers.mid) {
        gsap.to(layers.mid, {
          x: mouseX * 10 * depth,
          y: mouseY * 10 * depth,
          duration: 0.6,
          ease: 'power3.out',
        })
      }
      if (layers.fg) {
        gsap.to(layers.fg, {
          x: mouseX * 25 * depth,
          y: mouseY * 25 * depth,
          duration: 0.5,
          ease: 'power3.out',
        })
      }
      if (layers.glow) {
        gsap.to(layers.glow, {
          x: mouseX * 30 * depth,
          y: mouseY * 30 * depth,
          duration: 0.8,
          ease: 'power3.out',
          opacity: 0.6,
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.4)',
      })

      const layers = layerRefs.current
      Object.values(layers).forEach((layer) => {
        if (layer) {
          gsap.to(layer, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)',
            opacity: layer === layers.glow ? 0 : undefined,
          })
        }
      })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
      gsap.killTweensOf(card)
      Object.values(layerRefs.current).forEach((layer) => {
        if (layer) gsap.killTweensOf(layer)
      })
    }
  }, [depth, rotateAmount])

  const setLayerRef = (name) => (el) => {
    if (el) layerRefs.current[name] = el
  }

  return (
    <div
      ref={cardRef}
      className={`depth-card depth-card--${variant}${glass ? ' depth-card--glass' : ''} ${className}`}
      style={{ perspective: '1000px' }}
    >
      <div className="depth-card__noise" aria-hidden="true" />
      <div className="depth-card__scanlines" aria-hidden="true" />
      <div ref={setLayerRef('glow')} className="depth-card__glow" aria-hidden="true" />
      <div ref={setLayerRef('bg')} className="depth-card__layer depth-card__layer--bg" aria-hidden="true" />
      <div ref={setLayerRef('mid')} className="depth-card__layer depth-card__layer--mid" />
      <div ref={setLayerRef('fg')} className="depth-card__layer depth-card__layer--fg">
        {children}
      </div>
    </div>
  )
}

export default DepthCard
