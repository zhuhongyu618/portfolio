import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

/* ==========================================================================
   CONTACT · #sec-tickets — 波普票券式联系区
   对应参考站 #sec-tickets：BAG IT / LATER 双票券按钮 · pop-ticket 样式
   巨字标题 · Ticket 联系卡 · 波普表单 · CMYK 装饰
   ========================================================================== */

const fadeUp = {
  hidden: { opacity: 0, y: 36, filter: 'blur(8px)' },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.95, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] },
  }),
}

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const containerRef = useRef(null)
  const inView = useInView(containerRef, { once: true, margin: '-12%' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setForm({ name: '', email: '', message: '' })
    }, 3800)
  }

  return (
    <section
      id="sec-tickets"
      ref={containerRef}
      className="relative bg-void overflow-hidden expo-padding"
    >
      {/* 扫描线覆盖层 */}
      <div className="scanline-wrap absolute inset-0 pointer-events-none opacity-55" aria-hidden />

      <div className="max-w-expo mx-auto px-5 md:px-8 relative z-10">

        {/* ============ 章节刊头：编号 + 巨字标题 ============ */}
        <motion.div
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mb-16 md:mb-24"
        >
          <motion.div variants={fadeUp} custom={0} className="flex items-center gap-4 mb-10 md:mb-14">
            <span className="relative">
              <span className="font-display font-black text-cream text-[clamp(40px,6vw,88px)] leading-none tracking-warhol-tight">06</span>
              {/* 旋转虚线环（波普青） */}
              <svg className="absolute -bottom-2 -right-4 w-11 h-11" viewBox="0 0 44 44" fill="none">
                <motion.circle
                  cx="22" cy="22" r="20"
                  stroke="#00E0FF" strokeWidth="1.5"
                  strokeDasharray="5 5" fill="none"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: '22px 22px' }}
                />
              </svg>
            </span>
            <span className="h-px w-16 bg-cream relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-pop-magenta to-transparent"
                style={{ backgroundSize: '200% 100%', animation: 'pop-flicker 4.2s ease-in-out infinite' }} />
            </span>
            <span className="expo-eyebrow">
              Admission · 联系合作 · 获取门票
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="font-display font-black leading-[0.84] tracking-warhol-tight text-cream uppercase"
              >
                <span className="block text-warhol-title">Let&apos;s</span>
                <span className="block text-warhol-title text-pop-magenta relative">
                  <span className="absolute inset-0 text-pop-magenta opacity-10 blur-sm translate-x-2 translate-y-1.5 select-none" aria-hidden>Collab.</span>
                  <span className="relative">Collab.</span>
                </span>
              </motion.h2>
            </div>
            <div className="lg:col-span-5 lg:pl-12 lg:border-l border-cream/20">
              <motion.div variants={fadeUp} custom={2} className="flex items-center gap-4 mb-6">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cream opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cream" />
                </span>
                <span className="expo-eyebrow">
                  NOW ON VIEW · AVAILABLE FOR FREELANCE & FULL-TIME
                </span>
              </motion.div>
              <motion.p variants={fadeUp} custom={3} className="peach-prose">
                想一起做点好玩的？或者来展厅聊聊天？
                填一张波普门票卡，我们就有办法找到彼此。
                <br className="hidden sm:block" />
                <strong className="text-cream-soft">Pop show · Never boring.</strong>
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* ============ 双栏：左 Ticket Info · 右 Form ============ */}
        <motion.div
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-start"
        >
          {/* ===== 左：三张 Ticket 卡 ===== */}
          <div className="lg:col-span-5 space-y-6 md:space-y-7">

            {/* Ticket 01 · Say Hello（奶油橘压印） */}
            <motion.div variants={fadeUp} custom={4} className="relative">
              <div
                className="pop-ticket p-7 md:p-9 group hover:-translate-y-1 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ boxShadow: '10px 10px 0 0 rgba(232,232,232,0.9)' }}
              >
                {/* 票根编号角 */}
                <div className="absolute top-4 right-5 flex flex-col items-end gap-1">
                  <span className="expo-meta text-cream-muted">TICKET · 01</span>
                  <span className="font-display font-black text-cream text-ticket-num leading-none">01</span>
                </div>

                <p className="expo-eyebrow text-pop-magenta mb-6">/ SAY HELLO · 打个招呼</p>

                <div className="space-y-4 relative z-10">
                  <a href="mailto:3112516515@qq.com" className="block group/link">
                    <span className="flex items-center gap-3 group-hover/link:gap-5 transition-all duration-500">
                      <span className="font-display font-black text-cream text-xl md:text-3xl leading-snug break-all transition-colors duration-400 group-hover/link:text-pop-cyan">
                        3112516515@qq.com
                      </span>
                      <svg
                        className="w-5 h-5 text-cream-muted group-hover/link:text-pop-cyan group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-all duration-500 flex-shrink-0"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                          d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </a>
                  <a href="tel:13668862258" className="block group/link">
                    <span className="flex items-center gap-3 group-hover/link:gap-5 transition-all duration-500">
                      <span className="font-display font-black text-cream text-xl md:text-3xl leading-snug transition-colors duration-400 group-hover/link:text-pop-yellow">
                        +86 136 6886 2258
                      </span>
                      <svg
                        className="w-5 h-5 text-cream-muted group-hover/link:text-pop-yellow group-hover/link:translate-x-1 transition-all duration-500 flex-shrink-0"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                          d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </a>
                </div>

                {/* Ticket 底部 Meta Bar */}
                <div className="mt-7 pt-5 border-t border-dashed border-cream/25 flex flex-wrap items-center justify-between gap-3">
                  <span className="expo-meta text-cream-muted">GENERAL ADMISSION</span>
                  <div className="cmyk-dots">
                    <span style={{ background: '#00E0FF' }} />
                    <span style={{ background: '#FF3399' }} />
                    <span style={{ background: '#E9C46A' }} />
                    <span style={{ background: '#D14D78' }} />
                  </div>
                  <span className="expo-meta text-cream-muted">ADMIT 1</span>
                </div>
              </div>
            </motion.div>

            {/* Ticket 02 · Based In（品红压印） */}
            <motion.div variants={fadeUp} custom={5} className="relative">
              <div
                className="pop-ticket p-7 md:p-9 group hover:-translate-y-1 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ boxShadow: '10px 10px 0 0 rgba(255,51,153,0.9)' }}
              >
                <div className="absolute top-4 right-5 flex flex-col items-end gap-1">
                  <span className="expo-meta text-cream-muted">TICKET · 02</span>
                  <span className="font-display font-black text-pop-magenta text-ticket-num leading-none">02</span>
                </div>

                <p className="expo-eyebrow text-pop-cyan mb-6">/ BASED IN · 展览地点</p>
                <div className="relative z-10">
                  <p className="font-display font-black text-cream text-3xl md:text-5xl tracking-warhol-tight uppercase leading-[0.95]">
                    Qingdao<span className="text-pop-magenta">,</span>
                    <br />
                    Shandong · CN
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 px-3.5 py-2 border border-cream/35 bg-void-10">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cream opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cream" />
                      </span>
                      <span className="expo-eyebrow text-cream">ACCEPTING WORK · 接受合作</span>
                    </span>
                    <span className="expo-meta text-cream-muted">
                      Hybrid · Remote · On-site
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Ticket 03 · Social（波普青压印） */}
            <motion.div variants={fadeUp} custom={6} className="relative">
              <div
                className="pop-ticket p-7 md:p-9 group hover:-translate-y-1 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ boxShadow: '10px 10px 0 0 rgba(0,224,255,0.85)' }}
              >
                <p className="expo-eyebrow text-pop-yellow mb-6">/ FOLLOW · 展厅导览</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 relative z-10">
                  {[
                    { label: 'Behance',  sub: 'BE', c: '#E8E8E8' },
                    { label: '站酷',     sub: 'ZC', c: '#00E0FF' },
                    { label: 'WeChat',   sub: 'WX', c: '#FF3399' },
                    { label: '小红书',    sub: 'RED',c: '#E9C46A' },
                  ].map((s, i) => (
                    <a
                      key={s.label}
                      href="#"
                      className="group relative aspect-square flex flex-col items-center justify-center gap-2 border border-cream/25 hover:border-cream/70 hover:bg-void-20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden"
                    >
                      <span
                        className="font-display font-black text-2xl md:text-3xl transition-colors duration-400"
                        style={{ color: s.c }}
                      >
                        {s.sub}
                      </span>
                      <span className="expo-eyebrow text-cream-muted group-hover:text-cream transition-colors duration-400">
                        {s.label}
                      </span>
                      <span
                        className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full group-hover:scale-125 transition-transform duration-400"
                        style={{ background: s.c }}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ===== 右：Form 表单（波普风格） ===== */}
          <div className="lg:col-span-6 lg:col-start-7 lg:pl-4 lg:border-l-2 border-cream/20">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="py-12 md:py-20 text-center relative"
              >
                {/* 票根式确认卡 */}
                <motion.div
                  className="pop-ticket max-w-md mx-auto p-10 md:p-14"
                  style={{ boxShadow: '10px 10px 0 0 rgba(233,196,106,0.9)' }}
                >
                  <div className="expo-meta text-cream-muted mb-5">★ TICKET · 00 · CONFIRMED</div>
                  <motion.div
                    className="w-20 h-20 mx-auto mb-8 border-2 border-cream flex items-center justify-center relative"
                    initial={{ rotate: -20 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <svg className="w-10 h-10 text-pop-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <motion.path
                        strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.8}
                        d="M5 13l4 4L19 7"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </svg>
                  </motion.div>
                  <h3 className="font-display font-black leading-[0.95] tracking-warhol-kerned uppercase mb-5">
                    <span className="block text-warhol-sub text-cream">Message</span>
                    <span className="block text-warhol-sub text-pop-magenta">Sent.</span>
                  </h3>
                  <p className="text-cream-muted text-sm md:text-base leading-peach-read">
                    感谢您的留言，我会在 24 小时内与您取得联系。
                    <br />
                    <span className="text-cream-soft">See you at the Pop Show.</span>
                  </p>
                </motion.div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
                <motion.div variants={fadeUp} custom={7}>
                  <PopField
                    label="YOUR NAME · 姓名"
                    type="text"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    placeholder="请输入您的姓名"
                    required
                    accent="#E8E8E8"
                  />
                </motion.div>
                <motion.div variants={fadeUp} custom={8}>
                  <PopField
                    label="EMAIL · 邮箱"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    placeholder="your@email.com"
                    required
                    accent="#00E0FF"
                  />
                </motion.div>
                <motion.div variants={fadeUp} custom={9}>
                  <PopField
                    label="PROJECT BRIEF · 项目简介"
                    type="textarea"
                    value={form.message}
                    onChange={(v) => setForm({ ...form, message: v })}
                    placeholder="请简单描述合作需求、时间与预算…"
                    required
                    rows={5}
                    accent="#FF3399"
                  />
                </motion.div>
                <motion.div variants={fadeUp} custom={10}>
                  <TicketSubmit />
                </motion.div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ================ Pop Form Field · 波普表单字段 ================ */
function PopField({ label, type, value, onChange, placeholder, required, rows, accent = '#E8E8E8' }) {
  const [focused, setFocused] = useState(false)
  const hasValue = value && value.length > 0

  return (
    <div className="relative group">
      <label className={`block mb-4 transition-all duration-400 ${focused ? '' : ''}`}>
        <span className="expo-eyebrow" style={{ color: focused ? accent : 'rgba(201,166,146,1)' }}>
          {label}
        </span>
        {required && (
          <span className="ml-2 text-pop-magenta font-display font-black text-base">*</span>
        )}
      </label>
      <div
        className={`relative pb-2.5 transition-all duration-500 border-b-2 ${
          focused
            ? ''
            : hasValue
              ? 'border-cream/85'
              : 'border-cream/35 group-hover:border-cream/70'
        }`}
        style={{ borderColor: focused ? accent : undefined }}
      >
        {type === 'textarea' ? (
          <textarea
            required={required}
            rows={rows || 4}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            className="w-full bg-transparent py-3 md:py-4 text-cream placeholder:text-cream-muted/50 focus:outline-none text-lg md:text-2xl font-display font-bold tracking-tight resize-none"
          />
        ) : (
          <input
            type={type}
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            className="w-full bg-transparent py-3 md:py-4 text-cream placeholder:text-cream-muted/50 focus:outline-none text-lg md:text-2xl font-display font-bold tracking-tight"
          />
        )}
        {/* Focus shimmer */}
        {focused && (
          <span className="absolute bottom-[-2px] left-0 h-[2px] w-full overflow-hidden pointer-events-none">
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-pop-magenta to-transparent animate-pop-flicker"
              style={{ backgroundSize: '200% 100%' }}
            />
          </span>
        )}
      </div>
    </div>
  )
}

/* ================ Ticket Submit Button · 票根提交 ================ */
function TicketSubmit() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let rafId = 0
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const relX = e.clientX - (r.left + r.width / 2)
      const relY = e.clientY - (r.top + r.height / 2)
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${relX * 0.22}px, ${relY * 0.22}px, 0)`
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(rafId)
      el.style.transform = 'translate3d(0,0,0)'
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <button
      ref={ref}
      type="submit"
      className="pop-btn pop-btn--solid group w-full md:w-auto relative active:scale-[0.97]"
    >
      <span className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pop-yellow opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-void" />
      </span>
      <span>★ BAG IT · 提交留言</span>
      <svg
        className="w-5 h-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:-translate-y-0.5"
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.3}
          d="M5 12h14m0 0l-7-7m7 7l-7 7" />
      </svg>
    </button>
  )
}

export default Contact
