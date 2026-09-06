import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/* ==========================================================================
   HERO · #hero-section — Warhol Pop Exhibition 波普展览式巨字开场
   对应参考站：warhol-arts.webflow.io 的首屏 WARHOL / ARTS 双行巨字
   核心元素：warhol-display 巨字 · expo-dept 展览编号 · scanline-wrap 扫描线
   ========================================================================== */

const fadeUp = {
  hidden: { opacity: 0, y: 42, filter: 'blur(10px)' },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1,
      delay: 0.08 * i,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

/* ===== 文字渐入（按字符拆分 · 巨字动画） ===== */
function SplitDisplay({ text, className = '', stagger = 0.035, delayBase = 0 }) {
  const chars = Array.from(text || '')
  return (
    <span className={className}>
      {chars.map((ch, i) => (
        <motion.span
          key={`${i}-${ch}`}
          className="inline-block"
          initial={{ opacity: 0, y: '120%', rotateX: -70, filter: 'blur(14px)' }}
          animate={{
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: 'blur(0px)',
          }}
          transition={{
            duration: 1.05,
            delay: delayBase + i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </span>
  )
}

const Hero = () => {
  const heroRef = useRef(null)
  const inView = useInView(heroRef, { once: true, margin: '-10%' })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120)
    return () => clearTimeout(t)
  }, [])

  const marqueeA = [
    'VISUAL DESIGNER', '◆', 'UI & UX', '◆', 'AI CREATIVE', '◆',
    '3D & MOTION', '◆', 'PORTFOLIO 2026', '◆', 'ZHU HONGYU™', '◆',
  ]

  return (
    <section
      ref={heroRef}
      id="hero-section"
      className="relative min-h-[100dvh] w-full flex flex-col overflow-hidden isolate"
    >
      {/* ============ 扫描线 + 垂直扫描光带（展厅屏幕质感） ============ */}
      <div className="scanline-wrap absolute inset-0 -z-10 pointer-events-none" aria-hidden>
        <div
          className="absolute left-0 right-0 h-[28%] opacity-70"
          style={{
            background:
              'linear-gradient(180deg, rgba(232,232,232,0) 0%, rgba(232,232,232,0.08) 50%, rgba(232,232,232,0) 100%)',
            animation: 'scan-vertical 9s linear infinite',
          }}
        />
      </div>

      {/* ============ 顶部展览 Meta 条 ============ */}
      <div className="relative z-10 w-full border-b border-cream/15 backdrop-blur-sm">
        <div className="max-w-expo w-full mx-auto px-5 md:px-8 py-4 flex items-center justify-between gap-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={mounted ? 'show' : 'hidden'}
            custom={0}
            className="flex items-center gap-3"
          >
            {/* 在线状态（奶油橘闪烁） */}
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-cream animate-ping opacity-70" />
              <span className="relative w-2 h-2 rounded-full bg-cream" />
            </span>
            <span className="expo-eyebrow">
              POP EXHIBITION · ISSUE 01 · 2026
            </span>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={mounted ? 'show' : 'hidden'}
            custom={1}
            className="hidden md:flex items-center gap-4"
          >
            {/* CMYK 印刷色点装饰（权重 <5%） */}
            <div className="cmyk-dots">
              <span style={{ background: '#00E0FF' }} />
              <span style={{ background: '#FF3399' }} />
              <span style={{ background: '#E9C46A' }} />
              <span style={{ background: '#D14D78' }} />
            </div>
            <span className="expo-meta">CMYK · 4C PRINT</span>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={mounted ? 'show' : 'hidden'}
            custom={2}
            className="expo-meta hidden sm:block"
          >
            朱泓宇 / ZHU HONGYU
          </motion.div>
        </div>
      </div>

      {/* ============ 中央主内容：巨字展签 ============ */}
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <div className="max-w-expo w-full mx-auto px-5 md:px-8 py-10 md:py-8">

          {/* 展签左角小标：Dept. of 2026（展览编号） */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={mounted ? 'show' : 'hidden'}
            custom={3}
            className="flex items-center justify-between mb-10 md:mb-16"
          >
            <div className="expo-dept">
              <span className="expo-eyebrow" style={{ fontSize: '11px' }}>DEPT. OF</span>
              <span className="expo-dept__year">2026</span>
            </div>

            <div className="flex items-end gap-4 hidden sm:flex">
              <span className="expo-meta text-right">
                NO. 001 / 020<br/>
                EDITION · 1 / 1
              </span>
            </div>
          </motion.div>

          {/* ============ ZHONGYU-DISPLAY 巨字：单行 WARHOL 风格 ============ */}
          <div className="relative">
            {/* 暗红色径向光晕背景（参考站 WARHOL 中央 glow） */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 55% 45% at 50% 42%, rgba(180,50,30,0.35) 0%, rgba(120,25,15,0.18) 40%, rgba(20,20,20,0) 70%)',
                filter: 'blur(20px)',
                transform: 'translateY(-4%)',
              }}
            />

            <h1
              className="relative font-display font-black text-cream uppercase select-none leading-[0.82] tracking-warhol-tight will-change-transform"
              style={{ letterSpacing: '-0.055em' }}
            >
              <SplitDisplay
                text="ZHONGYU"
                className="block text-warhol-hero"
                stagger={0.055}
                delayBase={0.12}
              />
            </h1>

            {/* 巨字右上角压印标签（POP 波普品红斜块） */}
            <motion.div
              initial={{ opacity: 0, rotate: 10, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 6, scale: 1 }}
              transition={{ duration: 0.9, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-2 md:top-8 right-0 md:right-6 z-20"
              style={{ transform: 'rotate(6deg)' }}
            >
              <div
                className="relative px-5 md:px-7 py-3 md:py-4 overflow-hidden"
                style={{
                  background: '#FF3399',
                  boxShadow: '6px 6px 0 0 #E8E8E8',
                }}
              >
                <p
                  className="font-display font-black text-void text-xs md:text-sm leading-none"
                  style={{ letterSpacing: '0.22em' }}
                >
                  ★ POP<br/>ART SHOW
                </p>
              </div>
            </motion.div>
          </div>

          {/* ============ 副标题行：设计师身份 + 分类标签 ============ */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={mounted ? 'show' : 'hidden'}
            custom={7}
            className="mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-end"
          >
            {/* 左：身份展签（奶油橘大标题） */}
            <div className="md:col-span-7">
              <div className="flex items-center gap-3 md:gap-6 mb-6">
                <span className="inline-block w-10 md:w-20 h-px bg-cream relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-cream via-cream to-transparent"
                    style={{ backgroundSize: '200% 100%', animation: 'pop-flicker 4.2s ease-in-out infinite' }} />
                </span>
                <p className="font-display font-black text-warhol-label text-cream tracking-widest uppercase">
                  Visual Designer / UI &amp; UX / <span className="text-pop-magenta">AI Creative</span>
                </p>
              </div>

              <p className="peach-prose">
                我是朱泓宇，以<strong>波普艺术的展览精神</strong>呈现个人设计作品。
                从视觉传达、交互体验到 AI 辅助创意，以丝网印刷般的严谨与重复，
                探索数字设计中美学与效率的平衡。
              </p>
            </div>

            {/* 右：可用状态卡（3D 倾斜 · 奶油橘印压框） */}
            <div className="md:col-span-5 md:pl-4">
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -1.5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.95, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative p-6 md:p-8 bg-void-10 border border-cream/30"
                style={{ boxShadow: '8px 8px 0 0 rgba(232,232,232,1)' }}
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 border border-cream/40 flex items-center justify-center">
                    <svg className="w-6 h-6 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-display font-black text-cream text-sm md:text-base tracking-[0.18em] uppercase mb-2">
                      Now On View · 正在展出
                    </p>
                    <p className="text-cream-muted text-sm md:text-base leading-peach-read">
                      开放 <span className="text-cream font-bold">Freelance</span> 与 <span className="text-cream font-bold">全职</span> 合作邀请。
                      <br className="hidden sm:block" />
                      <span className="text-cream-soft">Pop art · Never boring.</span>
                    </p>
                    {/* 迷你 stats */}
                    <div className="mt-5 pt-5 border-t border-cream/20 grid grid-cols-3 gap-4">
                      <div>
                        <p className="font-display font-black text-ticket-num text-cream leading-none">05+</p>
                        <p className="expo-meta mt-2">AWARDS</p>
                      </div>
                      <div>
                        <p className="font-display font-black text-ticket-num text-pop-cyan leading-none">12</p>
                        <p className="expo-meta mt-2">WORKS</p>
                      </div>
                      <div>
                        <p className="font-display font-black text-ticket-num text-pop-yellow leading-none">∞</p>
                        <p className="expo-meta mt-2">CURIOSITY</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ============ 能力小胶囊（波普风格） ============ */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={mounted ? 'show' : 'hidden'}
            custom={9}
            className="mt-12 md:mt-16 flex flex-wrap gap-2.5 md:gap-3"
          >
            {[
              ['Art Direction', 'pop-cyan'],
              ['Visual Systems', 'cream'],
              ['UI / UX', 'pop-magenta'],
              ['Mobile & Web', 'cream'],
              ['AI Creative', 'pop-yellow'],
              ['3D Motion', 'cream'],
              ['Brand Identity', 'pop-red'],
              ['Design Systems', 'cream'],
            ].map(([s, c], i) => {
              const colorMap = {
                'cream': 'border-cream/35 text-cream hover:bg-cream hover:text-void',
                'pop-cyan': 'border-pop-cyan/60 text-pop-cyan hover:bg-pop-cyan hover:text-void',
                'pop-magenta': 'border-pop-magenta/60 text-pop-magenta hover:bg-pop-magenta hover:text-void',
                'pop-yellow': 'border-pop-yellow/70 text-pop-yellow hover:bg-pop-yellow hover:text-void',
                'pop-red': 'border-pop-red/60 text-pop-red hover:bg-pop-red hover:text-void',
              }
              return (
                <span
                  key={s}
                  className={`inline-flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 border font-display font-bold text-[11px] md:text-xs tracking-[0.2em] uppercase transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 cursor-default ${colorMap[c]}`}
                  style={{ transitionDelay: `${i * 25}ms` }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background:
                        c === 'cream' ? '#E8E8E8' :
                        c === 'pop-cyan' ? '#00E0FF' :
                        c === 'pop-magenta' ? '#FF3399' :
                        c === 'pop-yellow' ? '#E9C46A' : '#D14D78'
                    }}
                  />
                  {s}
                </span>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* ============ 波普跑马灯带（KINETIC MARQUEE） ============ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="relative z-10 border-y border-cream/20 bg-void-10/60 overflow-hidden"
      >
        <div className="pop-marquee-wrap">
          <div className="pop-marquee animate-pop-marquee py-5 md:py-6">
            {[...marqueeA, ...marqueeA].map((w, i) => (
              <span
                key={`m-${i}`}
                className="font-display font-black text-[clamp(24px,3.6vw,64px)] leading-none tracking-warhol-tight uppercase text-cream whitespace-nowrap flex items-center gap-10"
              >
                {w}
                <span
                  className="inline-block w-2 h-2 md:w-3 md:h-3 rounded-full"
                  style={{ background: i % 4 === 0 ? '#00E0FF' : i % 4 === 1 ? '#FF3399' : i % 4 === 2 ? '#E9C46A' : '#E8E8E8' }}
                />
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ============ 底部展览导航条 ============ */}
      <div className="relative z-10 w-full border-t border-cream/15">
        <div className="max-w-expo w-full mx-auto px-5 md:px-8 py-7 md:py-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={mounted ? 'show' : 'hidden'}
            custom={10}
            className="flex items-end gap-8 md:gap-16"
          >
            <div>
              <p className="expo-eyebrow mb-2.5">BASED IN · 展览地点</p>
              <p className="font-display font-black text-cream text-xl md:text-2xl tracking-tight uppercase flex items-center gap-2">
                Qingdao<span>,</span> CN
              </p>
            </div>
            <div className="hidden sm:block w-px h-14 bg-cream/20 self-end" />
            <div>
              <p className="expo-eyebrow mb-2.5">STATUS · 展期</p>
              <p className="font-display font-black text-cream text-xl md:text-2xl tracking-tight uppercase flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cream opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cream" />
                </span>
                Open &amp; Available
              </p>
            </div>
            <div className="hidden md:block w-px h-14 bg-cream/20 self-end" />
            <div className="hidden lg:block">
              <p className="expo-eyebrow mb-2.5">SCROLL · 请继续参观</p>
              <div className="flex items-center gap-3">
                <span className="relative w-6 h-10 border border-cream rounded-full flex items-start justify-center overflow-hidden">
                  <span className="w-1 h-2.5 rounded-full bg-cream mt-1.5" style={{ animation: 'ticket-tear 1.6s ease-in-out infinite' }} />
                </span>
                <span className="expo-meta">ENTER EXHIBITION</span>
              </div>
            </div>
          </motion.div>

          <motion.a
            variants={fadeUp}
            initial="hidden"
            animate={mounted ? 'show' : 'hidden'}
            custom={11}
            href="#4-designer"
            className="pop-btn pop-btn--solid self-end"
          >
            <span>Enter Show</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.a>
        </div>
      </div>

      {/* ============ 右侧垂直脊文字（编辑式装饰） ============ */}
      <div
        className="hidden xl:flex absolute right-5 md:right-8 top-1/2 -translate-y-1/2 z-10 select-none pointer-events-none"
        style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}
      >
        <span className="expo-eyebrow flex items-center gap-4" style={{ letterSpacing: '0.38em' }}>
          POP EXHIBITION
          <span className="w-1 h-1 rounded-full bg-pop-magenta" />
          VISUAL CULTURE
          <span className="w-1 h-1 rounded-full bg-pop-cyan" />
          DIGITAL CRAFT
          <span className="w-1 h-1 rounded-full bg-pop-yellow" />
          ZHU HONGYU 2026
        </span>
      </div>
    </section>
  )
}

export default Hero
