import { useEffect, useState } from 'react'

/**
 * SideNav · 侧边悬浮波普导航
 * 波普风格彩色圆点 + 章节序号，点击锚点跳转，IntersectionObserver 跟踪当前章节
 * 仅桌面端显示（md+），移动端隐藏避免遮挡
 */
const SECTIONS = [
  { id: 'hero-zhongyu', no: '00', label: '首屏', color: '#00E0FF' },
  { id: 'hero-profile', no: '01', label: '简介', color: '#FF3399' },
  { id: 'project-exp', no: '02', label: '项目', color: '#E9C46A' },
  { id: 'work-exp', no: '03', label: '工作', color: '#FF2D95' },
  { id: 'works-brief', no: '04', label: '作品', color: '#FFE600' },
  { id: 'footer-sec', no: '05', label: '联系', color: '#D14D78' },
]

const SideNav = () => {
  const [active, setActive] = useState('hero-zhongyu')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 取视口内最靠上的可见段为当前章节
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      {
        // 锚点跳转：段进入视口中段即激活
        rootMargin: '-40% 0px -50% 0px',
        threshold: 0,
      }
    )

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleJump = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      className="fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3"
      aria-label="章节导航"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id
        return (
          <button
            key={s.id}
            onClick={() => handleJump(s.id)}
            className="group relative flex items-center justify-end gap-2 h-8"
            aria-label={`跳转到 ${s.label}`}
            aria-current={isActive ? 'true' : undefined}
          >
            {/* 悬停标签 */}
            <span
              className={`absolute right-7 whitespace-nowrap font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
                isActive
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
              }`}
              style={{ color: isActive ? s.color : '#E8E8E8' }}
            >
              {s.label}
            </span>

            {/* 序号（仅激活/悬停显示） */}
            <span
              className={`font-mono text-[9px] font-bold tabular-nums transition-opacity duration-300 ${
                isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
              style={{ color: s.color }}
            >
              {s.no}
            </span>

            {/* 圆点 */}
            <span
              className="relative flex items-center justify-center transition-all duration-300"
              style={{
                width: isActive ? 14 : 10,
                height: isActive ? 14 : 10,
              }}
            >
              <span
                className="absolute inset-0 rounded-full transition-all duration-300"
                style={{
                  background: isActive ? s.color : 'transparent',
                  border: `1.5px solid ${isActive ? s.color : 'rgba(232,232,232,0.5)'}`,
                  boxShadow: isActive ? `0 0 10px ${s.color}` : 'none',
                }}
              />
              {/* 波普印刷偏移阴影（激活时） */}
              {isActive && (
                <span
                  className="absolute inset-0 rounded-full"
                  style={{
                    transform: 'translate(2px, 2px)',
                    background: 'rgba(0,0,0,0.4)',
                    zIndex: -1,
                  }}
                />
              )}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

export default SideNav
