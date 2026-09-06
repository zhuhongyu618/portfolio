import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/* ==========================================================================
   FOOTER · BRUTALIST TYPE STUDIO · 粗野字体页脚
   Palette: Ink #0A0A0A (95%) · Paper #F2EEE5 (95%) · Blood/Marigold/Ochre <5%
   巨字版权签名 · 撞色印章 · 粗野跑马灯 · Back to Top 压印按钮
   ========================================================================== */

const Footer = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  const marqueeFooter = [
    '© 2026 ZHU HONGYU', '◆', 'ALL RIGHTS RESERVED', '◆',
    'QINGDAO · CN', '◆', 'BRUTALIST TYPE STUDIO', '◆',
    'INK ON PAPER', '◆',
  ]

  const scrollTop = () => {
    const lenis = window.__lenis
    if (lenis && typeof lenis.scrollTo === 'function') lenis.scrollTo(0, { duration: 1.6 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      id="footer-sec"
      ref={ref}
      className="relative bg-ink overflow-hidden border-t-[3px] border-paper/30"
    >
      {/* 粗野字体背景装饰 */}
      <div className="brut-grid-lines opacity-40" />

      {/* 撕纸顶部边缘 */}
      <div className="brut-torn-top absolute inset-x-0 top-0 h-3 z-10" />

      {/* 泼墨溅点装饰 */}
      <div className="brut-ink-splash brut-ink-splash--blood" style={{ top: '12%', right: '7%', width: '160px', height: '160px', opacity: '0.55' }} />
      <div className="brut-ink-splash brut-ink-splash--ink" style={{ top: '55%', left: '5%', width: '180px', height: '180px', opacity: '0.4' }} />
      <div className="brut-ink-splash brut-ink-splash--marigold" style={{ bottom: '14%', right: '8%', width: '140px', height: '140px', opacity: '0.45' }} />

      {/* 贴纸拼贴层 · 粗野字体风格 */}
      <img src="./images/stickers/0803fd8150919b64bc8df85d15327f5a.png" alt="" aria-hidden className="pop-sticker-img pop-sticker-img--md" style={{ top: '12%', right: '4%', '--rot': '6deg' }} />
      <img src="./images/stickers/2f80f7970f75426f069589fda24fd549.png" alt="" aria-hidden className="pop-sticker-img pop-sticker-img--sm" style={{ top: '40%', left: '3%', '--rot': '-12deg', animationDelay: '0.9s' }} />
      <img src="./images/stickers/f134fc1300dd366950f6935b74f34655.png" alt="" aria-hidden className="pop-sticker-img pop-sticker-img--lg" style={{ bottom: '12%', right: '6%', '--rot': '10deg', animationDelay: '1.7s' }} />

      {/* ============ 巨字版权签名 · ZHONGYU 单行 ============ */}
      <div className="max-w-content mx-auto px-5 md:px-6 pt-20 md:pt-24 pb-8 md:pb-12 relative min-h-[240px]">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black leading-[0.82] tracking-brut-kerned text-paper uppercase select-none"
        >
          <span className="block text-[clamp(64px,13vw,240px)] font-black leading-[0.82] tracking-brut-kerned relative whitespace-nowrap">
            <span
              className="absolute inset-0 text-paper opacity-[0.06] blur-sm translate-x-3 translate-y-2 select-none"
              aria-hidden
            >
              ZHONGYU™
            </span>
            <span className="relative">
              <span className="text-blood">Z</span>HONGYU<span className="text-blood">™</span>
            </span>
          </span>
        </motion.h2>

        {/* Meta + Back to top */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end"
        >
          <div className="md:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-3">
                <span
                  className="w-10 h-10 flex items-center justify-center border-[2px] border-paper/40"
                  style={{ background: '#0A0A0A' }}
                >
                  <span className="font-display font-black text-paper text-lg leading-none">Z</span>
                </span>
                <span className="brut-label">
                  BRUTALIST TYPE STUDIO · SELECTED DESIGN WORKS · ISSUE 01
                </span>
              </div>
              {/* 撞色色点 · 暗红/橙色/米色 */}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2" style={{ background: '#C8281C' }} />
                <span className="w-2 h-2" style={{ background: '#E85D2F' }} />
                <span className="w-2 h-2" style={{ background: '#D4B896' }} />
              </div>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3 brut-label text-fog">
              <span>© 2026 Zhu Hongyu · All Rights Reserved</span>
              <span className="hidden sm:inline w-px h-3 bg-paper/25 self-center" />
              <span>Crafted with care · Qingdao / CN</span>
              <span className="hidden sm:inline w-px h-3 bg-paper/25 self-center" />
              <span>Edition 1 / 1 · Unique</span>
            </div>

            {/* 快捷链接 */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 pt-2">
              {[
                ['首页 · Home', '/'],
                ['作品 · Works', '/works'],
                ['关于 · About', '/about'],
                ['联系 · Contact', '/#sec-tickets'],
              ].map(([l, to]) => (
                <a
                  key={to}
                  href={to}
                  className="group relative font-display font-black text-[11px] tracking-[0.14em] uppercase text-paper hover:text-blood transition-colors duration-400"
                >
                  {l}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 group-hover:w-full bg-blood transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] origin-left" />
                </a>
              ))}
            </div>
          </div>

          {/* Back to Top · 粗野压印按钮 */}
          <div className="md:col-span-5 md:pl-8 flex md:justify-end">
            <button
              onClick={scrollTop}
              className="group relative inline-flex items-center gap-3 px-7 md:px-8 py-4 md:py-5 bg-paper text-ink border-[2px] border-paper hover:-translate-y-1 hover:-translate-x-1 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-brut-press hover:shadow-brut-press-blood"
            >
              <svg
                className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                  d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span className="font-display font-black text-[11px] tracking-[0.22em] uppercase relative z-10">
                Back to Top · 返回展厅
              </span>
              <span
                className="absolute inset-0 -z-10 translate-x-2 translate-y-2 bg-blood pointer-events-none"
                aria-hidden
              />
            </button>
          </div>
        </motion.div>

        {/* ============ 联系通道 · 粗野字体贴纸按钮 ============ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 md:mt-16 flex flex-wrap items-center gap-4 md:gap-5"
        >
          <span className="brut-label text-fog mr-2">联系通道 · CHANNELS</span>
          {[
            {
              label: 'Email',
              href: 'mailto:3112516515@qq.com',
              color: '#C8281C',
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
                    d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
            },
            {
              label: 'Phone',
              href: 'tel:+8613668862258',
              color: '#D4B896',
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
                    d="M3 5a2 2 0 012-2h2.5a1 1 0 01.95.68l1.2 3.5a1 1 0 01-.27 1.05L7.2 9.8a13 13 0 006 6l1.57-2.18a1 1 0 011.05-.27l3.5 1.2a1 1 0 01.68.95V18a2 2 0 01-2 2A16 16 0 013 5z" />
                </svg>
              ),
            },
            {
              label: 'Behance',
              href: '#',
              color: '#E85D2F',
              icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.5 6c1.7 0 2.8.8 2.8 2.4 0 1-.5 1.7-1.3 2 1.3.3 2 1.1 2 2.6 0 2-1.6 3-3.6 3H3V6h6.5zm-.4 3.7c.7 0 1.1-.3 1.1-.9s-.4-.9-1.1-.9H5.5v1.8h3.6zm.2 4.6c.8 0 1.2-.4 1.2-1s-.4-1-1.2-1H5.5v2H9.3zM21 12.5c0-.2 0-.4-.1-.6H16v1.3h2.6c-.1.6-.5 1.1-1.1 1.4.6.3 1 .8 1 1.6 0 1.3-1.1 2.1-2.8 2.1-1.6 0-2.7-.7-3.1-2h1.7c.2.4.7.6 1.4.6.7 0 1-.3 1-.7 0-.5-.4-.7-1.2-.7h-.8v-1.3c1.5.2 2.3-.3 2.3-1.3 0-.8-.5-1.3-1.3-1.3-.7 0-1.1.4-1.3 1H13c.3-1.7 1.6-2.7 3.5-2.7 1.9 0 3.2.9 3.5 2.5-.6-.4-1.3-.6-2-.6z" />
                </svg>
              ),
            },
            {
              label: '小红书',
              href: '#',
              color: '#C9952F',
              icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7a4 4 0 00-4 4v10a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4zm-5 5.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm4.5.5h-1a.5.5 0 010-1h1a.5.5 0 010 1zM12 9.5a1 1 0 100 2 1 1 0 000-2z" />
                </svg>
              ),
            },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="group inline-flex items-center gap-2.5 px-4 md:px-5 py-3 bg-transparent border-[2px] border-paper/30 hover:border-paper text-fog hover:text-paper transition-all duration-400"
              style={{ '--btn-color': c.color }}
              aria-label={c.label}
              title={c.label}
            >
              <span
                className="w-7 h-7 flex items-center justify-center text-paper"
                style={{ background: c.color, border: '2px solid #0A0A0A' }}
              >
                {c.icon}
              </span>
              <span className="font-display font-black text-[10px] md:text-xs tracking-[0.22em] uppercase">
                {c.label}
              </span>
            </a>
          ))}
        </motion.div>
      </div>

      {/* ============ 收尾跑马灯（版权文字带） ============ */}
      <div className="brut-marquee-wrap border-t-[2px] border-paper/20 bg-ink-2/60 brut-torn-top">
        <div className="brut-marquee">
          {[...marqueeFooter, ...marqueeFooter].map((w, i) => (
            <span
              key={`f-${i}`}
              className="flex items-center gap-10 font-display font-black text-[clamp(16px,2.4vw,40px)] leading-none tracking-brut-kerned uppercase text-paper/85 whitespace-nowrap"
            >
              {w}
              <span
                className="inline-block w-2 h-2"
                style={{ background: i % 4 === 0 ? '#C8281C' : i % 4 === 1 ? '#E85D2F' : i % 4 === 2 ? '#D4B896' : '#C9952F' }}
              />
            </span>
          ))}
        </div>
      </div>

      {/* ============ 底部 Meta spine（最后一行） ============ */}
      <div className="max-w-content mx-auto px-5 md:px-6 py-5 md:py-6 border-t-[2px] border-paper/15">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="brut-label text-fog">
            © 2026 ZHU HONGYU · 朱泓宇 · BRUTALIST PORTFOLIO
          </span>
          <span className="brut-label text-fog">
            INK ON PAPER · 4C · EDITION 01/26
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
