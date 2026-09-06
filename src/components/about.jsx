import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

/* ==========================================================================
   ABOUT · #4-designer — About Me + #section-quote 波普金句
   对应参考站结构：#4-elvis（大标题+正文） → #section-quote（巨字金句）
   核心：warhol-title 巨字 · peach-prose 正文 · 统计编号 · 展览信息卡
   ========================================================================== */

const About = () => {
  const containerRef = useRef(null)
  const quoteRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const bigTitleX = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])
  const statsY = useTransform(scrollYProgress, [0, 1], ['0%', '-4%'])
  const quoteInView = useInView(quoteRef, { once: true, margin: '-15%' })

  return (
    <>
      {/* ============ #4-designer · 关于设计师 ============ */}
      <section id="4-designer" className="relative bg-void overflow-hidden expo-padding" ref={containerRef}>
        <div className="max-w-expo mx-auto px-5 md:px-8 relative">

          {/* ===== 章节刊头：编号 01 + 大标题 ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16 md:mb-24">
            {/* 左：章节编号 + 巨字标题（视差） */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-10 md:mb-14">
                <span className="relative">
                  <span className="font-display font-black text-cream text-[clamp(40px,6vw,88px)] leading-none tracking-warhol-tight">01</span>
                  {/* 旋转虚线环装饰（品红） */}
                  <svg className="absolute -bottom-2 -right-4 w-11 h-11" viewBox="0 0 44 44" fill="none">
                    <motion.circle
                      cx="22" cy="22" r="20"
                      stroke="#FF3399"
                      strokeWidth="1.5"
                      strokeDasharray="5 5"
                      fill="none"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                      style={{ transformOrigin: '22px 22px' }}
                    />
                  </svg>
                </span>
                <span className="h-px w-16 md:w-20 bg-cream relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-pop-magenta to-transparent"
                    style={{ backgroundSize: '200% 100%', animation: 'pop-flicker 4s ease-in-out infinite' }} />
                </span>
                <span className="expo-eyebrow">
                  About the Designer
                </span>
              </div>

              <motion.h2
                style={{ x: bigTitleX }}
                className="font-display font-black leading-[0.86] tracking-warhol-kerned text-cream uppercase"
              >
                <span className="block text-warhol-title">Visual</span>
                <span className="block text-warhol-title relative">
                  <span className="absolute inset-0 text-cream opacity-10 blur-sm translate-x-2.5 translate-y-1.5 select-none" aria-hidden>Designer.</span>
                  <span className="relative text-cream">Designer.</span>
                </span>
              </motion.h2>

              <div className="mt-10 md:mt-14 flex items-baseline gap-5 flex-wrap">
                <p className="font-display font-black text-warhol-label text-cream uppercase tracking-tight">朱泓宇 / Zhu Hongyu</p>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-pop-magenta" />
                <p className="expo-meta text-cream-muted">2026 届视觉传达设计 · Qingdao, CN</p>
              </div>
            </div>

            {/* 右：不对称正文介绍（视差 statsY） */}
            <div className="lg:col-span-5 lg:pl-12 lg:border-l border-cream/20">
              <motion.p
                style={{ y: statsY }}
                className="font-display font-medium tracking-tight mb-8 text-cream text-[clamp(18px,2.2vw,26px)] leading-[1.3]"
              >
                我是朱泓宇，2026 届视觉传达设计专业毕业生。
                <span className="block mt-3 text-cream-muted text-[clamp(16px,1.8vw,20px)] leading-[1.5]">
                  专注于视觉传达、UI&amp;UX 设计与 <span className="text-cream font-bold">AI 创意设计</span>，
                  以波普艺术的展览逻辑，为设计作品赋予独特的美学与仪式感。
                </span>
              </motion.p>

              <div className="peach-prose">
                <p>
                  曾于北京甲板智慧科技实习，主导多个智慧园区与市政公园数字化项目的全案视觉设计，
                  覆盖体感互动游戏、智能服务体、自助体测系统等多元业务场景。
                </p>
                <p>
                  获 <strong className="text-cream-soft">5 项国际设计大奖</strong>，包括国青杯一等奖、
                  G-CROSS 跨界艺术创意奖铜奖、BICC 中英国际创意大赛铜奖、新加坡金沙艺术设计大赛铜奖。
                </p>
              </div>
            </div>
          </div>

          {/* ===== 统计数据条（波普四色数字） ===== */}
          <motion.div
            style={{ y: statsY }}
            className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 pb-16 md:pb-24 border-t-2 border-b-2 border-cream/25 pt-10 md:pt-14 mb-16 md:mb-24"
          >
            {[
              { n: '3.7', suffix: '', u: 'GPA / 4.0', c: 'text-cream' },
              { n: 'Top', suffix: '10%', u: '专业排名', c: 'text-pop-cyan' },
              { n: '5', suffix: '+', u: '设计大奖', c: 'text-pop-magenta' },
              { n: '3', suffix: '+', u: '实战项目', c: 'text-pop-yellow' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.9, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-4 md:p-6 -mx-4 md:mx-0 hover:bg-void-10 transition-colors duration-500"
              >
                <p className={`font-display font-black leading-none tracking-warhol-tight text-[clamp(40px,5vw,84px)] ${s.c}`}>
                  {s.n}
                  {s.suffix && <span className={`ml-0.5 ${s.c}`}>{s.suffix}</span>}
                </p>
                <p className="expo-eyebrow mt-3 md:mt-4 flex items-center gap-2 text-cream-muted">
                  <span className="w-5 h-px bg-cream group-hover:w-10 group-hover:bg-pop-magenta transition-all duration-500" />
                  {s.u}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* ===== 展览信息卡 · 4 块 Bento ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {[
              {
                no: '01', k: '学历 · Education',
                t: '华东交通大学理工学院',
                s1: '视觉传达设计 · 本科',
                s2: '2022 — 2026',
                accent: 'cream',
              },
              {
                no: '02', k: '所在地 · Location',
                t: '山东 · 青岛',
                s1: '出生年月 2004.06',
                s2: 'Qingdao, China',
                accent: 'pop-cyan',
              },
              {
                no: '03', k: '实战 · Experience',
                t: '北京甲板智慧科技',
                s1: '视觉 / UI&UX 设计师',
                s2: '2026.03 — 07',
                accent: 'pop-magenta',
              },
              {
                no: '04', k: '联系 · Contact',
                t: '3112516515@qq.com',
                s1: 'TEL · 13668862258',
                s2: 'WeChat · zhuhongyu',
                accent: 'pop-yellow',
              },
            ].map((c, i) => {
              const accentBg =
                c.accent === 'cream' ? 'rgba(232,232,232,1)' :
                c.accent === 'pop-cyan' ? 'rgba(0,224,255,1)' :
                c.accent === 'pop-magenta' ? 'rgba(255,51,153,1)' :
                'rgba(233,196,106,1)'
              return (
                <motion.div
                  key={c.no}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.9, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative p-6 md:p-8 bg-void-10 border border-cream/20 hover:border-cream/40 transition-all duration-500 overflow-hidden"
                >
                  {/* 大背景编号（极低透明度） */}
                  <div
                    className="absolute top-5 right-5 font-display font-black leading-none tracking-warhol-tight select-none pointer-events-none transition-all duration-600 group-hover:-translate-y-2"
                    style={{
                      fontSize: 'clamp(72px,8vw,120px)',
                      color: 'rgba(232,232,232,0.05)',
                    }}
                  >
                    {c.no}
                  </div>

                  <p className="expo-eyebrow mb-5 text-cream-muted">{c.k}</p>
                  <p className="font-display font-black text-cream text-lg md:text-xl tracking-tight leading-snug mb-3 group-hover:text-cream-soft transition-colors duration-400 break-all relative z-10">
                    {c.t}
                  </p>
                  <p className="text-cream-muted text-sm md:text-base mb-1.5 relative z-10">{c.s1}</p>
                  <p className="expo-meta relative z-10">{c.s2}</p>

                  {/* 底部强调色条 + 小圆点 */}
                  <div className="absolute left-0 bottom-0 w-0 h-[3px] group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] z-10"
                    style={{ background: accentBg }} />
                  <svg className="absolute bottom-0 left-0 w-full h-6 pointer-events-none" viewBox="0 0 400 24" fill="none" preserveAspectRatio="none">
                    <motion.circle
                      cx="20" cy="12" r="2.5"
                      fill={accentBg}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 1.2 + 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </svg>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ #section-quote · 波普巨字金句 ============ */}
      <section
        id="section-quote"
        ref={quoteRef}
        className="relative bg-void overflow-hidden py-24 md:py-40 border-y border-cream/15"
      >
        {/* 扫描线覆盖 */}
        <div className="scanline-wrap absolute inset-0 pointer-events-none opacity-60" aria-hidden />

        <div className="max-w-expo mx-auto px-5 md:px-8 relative">
          {/* 展览编号条 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={quoteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-between mb-14 md:mb-20"
          >
            <div className="flex items-center gap-4">
              <span className="font-display font-black text-cream text-[clamp(32px,4.5vw,56px)] leading-none tracking-warhol-tight">02</span>
              <span className="h-px w-12 bg-cream/50" />
              <span className="expo-eyebrow">Curator&apos;s Note · 策展人语</span>
            </div>
            <div className="cmyk-dots hidden sm:flex">
              <span style={{ background: '#00E0FF' }} />
              <span style={{ background: '#FF3399' }} />
              <span style={{ background: '#E9C46A' }} />
              <span style={{ background: '#D14D78' }} />
            </div>
          </motion.div>

          {/* 巨字金句（安迪·沃霍尔风格） */}
          <blockquote className="relative">
            <h2 className="font-display font-black leading-[0.84] tracking-warhol-tight text-cream uppercase">
              {/* 第一行 */}
              <motion.span
                initial={{ opacity: 0, x: -60 }}
                animate={quoteInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block text-warhol-title"
              >
                <span className="text-pop-magenta">&ldquo;</span>
                Design
              </motion.span>
              {/* 第二行（空心描边字） */}
              <motion.span
                initial={{ opacity: 0, x: 60 }}
                animate={quoteInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1.1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="block text-warhol-title relative"
                style={{
                  WebkitTextStroke: '2px rgba(232,232,232,0.55)',
                  color: 'transparent',
                  paddingLeft: '0.08em',
                }}
              >
                should be
              </motion.span>
              {/* 第三行（品红实心，视觉焦点） */}
              <motion.span
                initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
                animate={quoteInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 1.15, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
                className="block text-warhol-title text-pop-magenta"
              >
                Pop, Bold,
              </motion.span>
              {/* 第四行 */}
              <motion.span
                initial={{ opacity: 0, x: -40 }}
                animate={quoteInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1.1, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
                className="block text-warhol-title"
              >
                <span className="text-pop-yellow">&amp;</span> Unforgettable.
                <span className="text-pop-cyan">&rdquo;</span>
              </motion.span>
            </h2>

            {/* 落款 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={quoteInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-14 md:mt-20 flex items-end justify-between gap-8 flex-wrap"
            >
              <div>
                <p className="expo-eyebrow mb-3 text-cream-muted">— After Andy Warhol · 致敬沃霍尔</p>
                <p className="font-display font-black text-cream text-lg md:text-xl tracking-tight uppercase">
                  Zhu Hongyu / 朱泓宇 · 2026
                </p>
              </div>
              <div className="flex items-center gap-5">
                <div className="expo-meta text-right text-cream-muted">
                  SILKSCREEN EDITION<br/>
                  02 / 26 · UNIQUE
                </div>
                {/* CMYK 印刷色板迷你方块（装饰） */}
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1">
                    <span className="w-4 h-4" style={{ background: '#00E0FF' }} />
                    <span className="w-4 h-4" style={{ background: '#FF3399' }} />
                  </div>
                  <div className="flex gap-1">
                    <span className="w-4 h-4" style={{ background: '#E9C46A' }} />
                    <span className="w-4 h-4" style={{ background: '#D14D78' }} />
                  </div>
                </div>
              </div>
            </motion.div>
          </blockquote>
        </div>
      </section>
    </>
  )
}

export default About
