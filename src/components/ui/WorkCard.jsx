import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import BorderGlow from './BorderGlow'

/* ==========================================================================
   WORKCARD · 波普展览式作品卡片
   基调：bg-void-10 + cream 文字 + CMYK 点缀色
   特色：3D Tilt · 印刷阴影编号块 · CMYK 色点 · 丝网网点 Hover · 画框四角装饰
   ========================================================================== */

// ===== 3D Parallax Tilt =====
function TiltCard({ children, className = '', strength = 8 }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 20, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 220, damping: 20, mass: 0.5 })
  const rotX = useTransform(sy, [-1, 1], [strength, -strength])
  const rotY = useTransform(sx, [-1, 1], [-strength, strength])

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set(((e.clientX - r.left) / r.width - 0.5) * 2)
    y.set(((e.clientY - r.top) / r.height - 0.5) * 2)
  }
  const onLeave = () => { x.set(0); y.set(0) }
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: 'preserve-3d',
        perspective: 1200,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// 波普 CMYK 配色池（按 index 循环给卡片分配主点缀色）
const ACCENT_POOL = [
  { main: '#FF3399', name: 'magenta' }, // 品红
  { main: '#00E0FF', name: 'cyan' },    // 青
  { main: '#E9C46A', name: 'yellow' },  // 黄
  { main: '#D14D78', name: 'red' },     // 红
]

const WorkCard = ({ work, index = 0 }) => {
  const navigate = useNavigate()
  const pad = String(index + 1).padStart(2, '0')
  const accent = ACCENT_POOL[index % ACCENT_POOL.length]

  const handleClick = () => {
    navigate(`/works/${work.id}`)
  }

  return (
    <TiltCard strength={7} className="h-full">
      <BorderGlow
        backgroundColor="#0A0A0A"
        borderRadius={16}
        glowRadius={20}
        glowIntensity={1.0}
        colors={[accent.main, '#E8E8E8', '#E85D2F']}
        fillOpacity={0.3}
        className="group/card cursor-pointer h-full"
      >
        <div
          onClick={handleClick}
          className="relative h-full overflow-hidden transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.985]"
        >
          {/* ===== 图片区 ===== */}
          <div
            className="relative overflow-hidden border-b border-cream/10 group-hover/card:border-cream/25 transition-colors duration-500"
            style={{ aspectRatio: work.aspect || '4/3' }}
          >
            <img
              src={work.cover}
              alt={work.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover/card:scale-[1.07]"
            />

            {/* 渐变遮罩 · dark from bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent opacity-60 group-hover/card:opacity-80 transition-opacity duration-500 pointer-events-none"></div>

            {/* CMYK Hover 渐变遮罩 */}
            <div
              className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 mix-blend-multiply pointer-events-none"
              style={{
                background: `linear-gradient(135deg, rgba(20,20,20,0.1) 0%, ${accent.main}22 100%)`
              }}
            ></div>

            {/* 丝网印刷网点 · Hover 显示 */}
            <div
              className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-600 pointer-events-none mix-blend-overlay"
              style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 14 14' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='rgba(255,255,255,0.18)'/%3E%3C/svg%3E\")",
                backgroundSize: '14px 14px'
              }}
            ></div>

            {/* 左上角编号块 · 波普印刷阴影 */}
            <div
              className="absolute top-4 left-4"
              style={{ transform: 'translateZ(30px)' }}
            >
              <span
                className="relative inline-flex items-center justify-center min-w-[3rem] h-[3rem] px-3.5 bg-cream text-void font-display font-black text-lg tracking-warhol-tight shadow-pop-press group-hover/card:-translate-y-1 group-hover/card:-translate-x-1 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ boxShadow: `6px 6px 0 0 ${accent.main}` }}
              >
                {pad}
              </span>
            </div>

            {/* 右上角分类标签 + 色点 */}
            <div
              className="absolute top-4 right-4 flex items-center gap-2.5"
              style={{ transform: 'translateZ(30px)' }}
            >
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ background: accent.main, boxShadow: `0 0 12px ${accent.main}88` }}
              />
              <span className="inline-block px-3 py-1.5 bg-void/85 backdrop-blur border border-cream/20 text-cream text-[10px] font-display font-black uppercase tracking-[0.22em]">
                {work.categoryLabel}
              </span>
            </div>

            {/* 左下角年份标签 */}
            <div
              className="absolute bottom-4 left-4"
              style={{ transform: 'translateZ(30px)' }}
            >
              <span className="inline-block px-3 py-1.5 bg-void/85 backdrop-blur-sm border border-cream/20 text-cream brut-label whitespace-nowrap">
                {work.year}
              </span>
            </div>

            {/* Hover 大箭头 CTA · 右下 */}
            <div
              className="absolute bottom-4 right-4 w-12 h-12 bg-void text-cream flex items-center justify-center border border-cream/25
                opacity-0 group-hover/card:opacity-100 translate-x-3 translate-y-3 group-hover/card:translate-x-0 group-hover/card:translate-y-0
                transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:bg-pop-magenta group-hover/card:border-pop-magenta group-hover/card:text-void"
              style={{ transform: 'translateZ(30px)' }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>

            {/* 画框四角装饰 */}
            <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-cream/60 pointer-events-none" style={{ transform: 'translateZ(25px)' }} />
            <span className="absolute top-3 right-3 w-4 h-4 border-t border-r border-cream/60 pointer-events-none" style={{ transform: 'translateZ(25px)' }} />
            <span className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-cream/60 pointer-events-none" style={{ transform: 'translateZ(25px)' }} />
            <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-cream/60 pointer-events-none" style={{ transform: 'translateZ(25px)' }} />
          </div>

          {/* ===== 内容区 · 波普展签 ===== */}
          <div className="p-6 md:p-7 flex flex-col h-[calc(100%-var(--img-h,auto))]">
            {/* 元信息条 */}
            <div className="flex flex-wrap items-center gap-3 text-cream-muted text-[11px] mb-4 md:mb-5">
              <span className="brut-label whitespace-nowrap text-cream">{work.year}</span>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent.main }} />
              <span className="brut-label whitespace-nowrap">{work.role}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cream-muted hidden sm:inline-block flex-shrink-0" />
              <span className="brut-label whitespace-nowrap text-cream tabular-nums hidden sm:inline-block">{work.period}</span>
            </div>

            {/* 标题 · warhol 字体 */}
            <h3 className="font-display font-black text-[clamp(18px,1.6vw,26px)] leading-[1.1] text-cream tracking-warhol-kerned group-hover/card:text-cream-soft transition-colors duration-500 mb-3 md:mb-4 whitespace-nowrap overflow-hidden text-ellipsis">
              {work.title}
            </h3>

            {/* 简介 · peach-prose */}
            <p className="peach-prose text-cream-muted text-sm md:text-[15px] flex-1 line-clamp-3">
              {work.shortDesc}
            </p>

            {/* 底部：标签 + Open 箭头 */}
            <div className="mt-6 md:mt-7 flex items-end justify-between gap-4 pt-5 md:pt-6 border-t border-cream/12">
              <div className="flex flex-nowrap gap-1.5 md:gap-2 whitespace-nowrap overflow-hidden">
                {work.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 border border-cream/12 text-cream-muted brut-label whitespace-nowrap
                      group-hover/card:border-cream/40 group-hover/card:text-cream
                      transition-all duration-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2.5 text-cream-muted group-hover/card:text-pop-magenta transition-colors duration-400 flex-shrink-0">
                <span className="hidden sm:inline-block expo-eyebrow uppercase text-[9px]">
                  Open
                </span>
                <span className="relative w-8 md:w-10 h-px bg-cream/20 overflow-hidden">
                  <span className="absolute inset-y-0 left-0 w-0 bg-pop-magenta group-hover/card:w-full transition-all duration-600 ease-[cubic-bezier(0.77,0,0.175,1)]"></span>
                </span>
                <svg
                  className="w-4 h-4 md:w-[18px] md:h-[18px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:translate-x-1.5 group-hover/card:-translate-y-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </BorderGlow>
    </TiltCard>
  )
}

export default WorkCard
