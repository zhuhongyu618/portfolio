import { useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import './BendingMarquee.css'

const BendingMarquee = ({
  items = [],
  speed = 80,
  itemGap = 32,
  pillWidth = 160,
  pillHeight = 52,
  direction = 'left',
  curveAmount = 0,
  className = '',
  pauseOnHover = true,
}) => {
  const trackRef = useRef(null)
  const containerRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)
  const animationRef = useRef(null)

  const duplicatedItems = [...items, ...items, ...items]

  const animate = useCallback(() => {
    const track = trackRef.current
    if (!track || isPaused) return

    const trackWidth = track.scrollWidth / 3
    let position = track._currentX || 0

    const step = () => {
      if (!track || isPaused) return

      position += speed / 60
      if (position >= trackWidth) {
        position -= trackWidth
      }
      if (direction === 'right') {
        position -= speed / 60
        if (position <= -trackWidth) {
          position += trackWidth
        }
      }

      track._currentX = position
      track.style.transform = `translateX(${-position}px)`

      requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [speed, isPaused, direction])

  useEffect(() => {
    animate()
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate])

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true)
  }

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false)
  }

  return (
    <div
      ref={containerRef}
      className={`bending-marquee ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        '--marquee-pill-width': `${pillWidth}px`,
        '--marquee-pill-height': `${pillHeight}px`,
        '--marquee-gap': `${itemGap}px`,
        '--marquee-curve': `${curveAmount}px`,
      }}
    >
      <div className="bending-marquee__fade bending-marquee__fade--left" />
      <div className="bending-marquee__fade bending-marquee__fade--right" />
      <div className="bending-marquee__track-wrap">
        <div ref={trackRef} className="bending-marquee__track">
          {duplicatedItems.map((item, i) => (
            <div
              key={i}
              className={`bending-marquee__pill${item.variant ? ` bending-marquee__pill--${item.variant}` : ''}`}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BendingMarquee
