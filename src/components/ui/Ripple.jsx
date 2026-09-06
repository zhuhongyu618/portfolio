import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// 可复用波纹按钮/链接组件
// 支持 as: 'button' | 'link' | 'router-link'
const Ripple = ({
  children,
  as = 'button',
  to,
  href,
  onClick,
  className = '',
  variant = 'default',
  ...props
}) => {
  const navigate = useNavigate()
  const buttonRef = useRef(null)

  const handleClick = (e) => {
    const btn = buttonRef.current
    if (btn) {
      const rect = btn.getBoundingClientRect()
      const ripple = document.createElement('span')
      const size = Math.max(rect.width, rect.height)
      ripple.style.width = ripple.style.height = `${size}px`
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`
      ripple.className = 'ripple-effect'
      btn.appendChild(ripple)
      setTimeout(() => ripple.remove(), 700)
    }
    if (onClick) onClick(e)
    if (as === 'router-link' && to) navigate(to)
  }

  const baseClass = `ripple-container active:scale-[0.97] transition-transform duration-150 ${className}`

  if (as === 'router-link') {
    return (
      <button
        ref={buttonRef}
        onClick={handleClick}
        className={baseClass}
        {...props}
      >
        {children}
      </button>
    )
  }

  if (as === 'link' && href) {
    return (
      <a
        ref={buttonRef}
        href={href}
        onClick={handleClick}
        className={baseClass}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <button ref={buttonRef} onClick={handleClick} className={baseClass} {...props}>
      {children}
    </button>
  )
}

export default Ripple
