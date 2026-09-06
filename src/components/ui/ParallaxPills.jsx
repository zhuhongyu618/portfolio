import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import './ParallaxPills.css'

const ParallaxPills = ({
  items = [],
  pillWidth = 180,
  pillHeight = 56,
  gap = 16,
  className = '',
}) => {
  const containerRef = useRef(null)
  const pillRefs = useRef([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const pills = pillRefs.current.filter(Boolean)
    if (!pills.length) return

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const mouseX = (e.clientX - rect.left) / rect.width - 0.5
      const mouseY = (e.clientY - rect.top) / rect.height - 0.5

      pills.forEach((pill, i) => {
        const depth = ((i % 3) + 1) * 8
        gsap.to(pill, {
          x: mouseX * depth,
          y: mouseY * depth,
          rotateX: mouseY * depth * 0.4,
          rotateY: -mouseX * depth * 0.4,
          duration: 0.6,
          ease: 'power3.out',
          transformPerspective: 800,
          transformOrigin: 'center center',
        })
      })
    }

    const handleMouseLeave = () => {
      pills.forEach((pill) => {
        gsap.to(pill, {
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        })
      })
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      gsap.killTweensOf(pills)
    }
  }, [items.length])

  const setRef = (index) => (el) => {
    pillRefs.current[index] = el
  }

  return (
    <div
      ref={containerRef}
      className={`parallax-pills ${className}`}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: `${gap}px`,
        perspective: '800px',
      }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          ref={setRef(i)}
          className={`parallax-pill${item.variant ? ` parallax-pill--${item.variant}` : ''}`}
          style={{
            width: `${pillWidth}px`,
            height: `${pillHeight}px`,
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  )
}

export default ParallaxPills
