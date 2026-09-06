import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { works, categories } from '../data/works'
import { motion, useInView } from 'framer-motion'

/* ==========================================================================
   WORKS · BRUTALIST TYPE STUDIO · 作品档案馆
   Palette: Ink #0A0A0A (95%) · Paper #F2EEE5 (95%) · Blood/Marigold/Ochre <5%
   结构：
   #works-brut-header → 刊头（巨字 ARCHIVE + 暗红印章 + 撕纸边缘 + 泼墨）
   #works-brut-filter → 分类筛选（粗野字体按钮 + 涂鸦下划线）
   #works-brut-grid   → 不对称网格作品卡（泼墨序号 + 涂鸦标签 + 撕纸封面）
   ========================================================================== */

// 各作品的粗野字体撞色（暗红 / 米色 / 橙色 三色循环，控制在 5% 以内）
const brutAccents = {
  'original-ip':  { primary: '#C8281C', secondary: '#D4B896', tape: 'blood'    },  // blood + ochre
  'art-studio':   { primary: '#D4B896', secondary: '#E85D2F', tape: 'ochre'    },  // ochre + marigold
  'mivox':        { primary: '#E85D2F', secondary: '#C8281C', tape: 'marigold' },  // marigold + blood
}

const Works = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const navigate = useNavigate()
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-10%' })

  const filteredWorks =
    activeFilter === 'all' ? works : works.filter((w) => w.category === activeFilter)

  return (
    <div className="relative pt-32 md:pt-36 bg-ink min-h-screen overflow-hidden">
      {/* === 全局粗野字体背景装饰 === */}
      <div className="brut-grid-lines opacity-60" />
      <div className="brut-ink-splash brut-ink-splash--blood" style={{ top: '8%', left: '3%', width: '180px', height: '180px', opacity: '0.55' }} />
      <div className="brut-ink-splash brut-ink-splash--ink" style={{ top: '38vh', right: '4%', width: '220px', height: '220px', opacity: '0.4' }} />
      <div className="brut-ink-splash brut-ink-splash--marigold" style={{ bottom: '8%', left: '6%', width: '140px', height: '140px', opacity: '0.45' }} />

      {/* 贴纸拼贴层 · 粗野字体风格 */}
      <img src="./images/stickers/4f3d4cd6372eea4f03970ef408d1498f.png" alt="" aria-hidden className="pop-sticker-img pop-sticker-img--md" style={{ top: '10%', right: '4%', '--rot': '6deg' }} />
      <img src="./images/stickers/8a3f78881230cbd96bb1ebb4913dbf96.png" alt="" aria-hidden className="pop-sticker-img pop-sticker-img--md" style={{ bottom: '6%', right: '9%', '--rot': '-10deg', animationDelay: '0.8s' }} />
      <img src="./images/stickers/bad5780b2f5b6084cd206fb2a6fbf570.png" alt="" aria-hidden className="pop-sticker-img pop-sticker-img--lg" style={{ top: '38%', right: '3%', '--rot': '-13deg', animationDelay: '1.3s' }} />
      <img src="./images/stickers/c251cc42c69970b9e0198a76284d9ffa.png" alt="" aria-hidden className="pop-sticker-img pop-sticker-img--md" style={{ bottom: '36%', left: '8%', '--rot': '10deg', animationDelay: '0.5s' }} />
      <img src="./images/stickers/c57a26d5b3780bd4f9139d4c6782ea79.png" alt="" aria-hidden className="pop-sticker-img pop-sticker-img--md" style={{ bottom: '22%', right: '12%', '--rot': '8deg', animationDelay: '1.7s' }} />

      {/* ============ #works-brut-header · 刊头 ============ */}
      <section id="works-brut-header" className="max-w-content mx-auto px-5 md:px-6 relative z-10">
        <div ref={headerRef} className="py-14 md:py-16 border-b-[3px] border-paper/30 brut-torn-bottom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 顶部刊头行 · 印章 + 标签 + 涂鸦 */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-12 md:mb-16">
              <span className="brut-stamp brut-stamp--blood">ARCHIVE · 2026</span>
              <span className="brut-label">THE ARCHIVE · 作品档案馆</span>
              <span className="brut-scrawl brut-scrawl--marigold text-[clamp(28px,3vw,44px)] ml-auto uppercase" aria-hidden>
                SELECTED.
              </span>
            </div>

            {/* 巨字标题 · 双行错位 ARCHIVE / OF WORKS. */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black leading-[0.82] tracking-brut-kerned uppercase select-none"
            >
              <span className="block text-paper text-[clamp(56px,12vw,200px)]">
                ARCHIVE
              </span>
              <span className="block relative text-[clamp(56px,12vw,200px)] -mt-[1.5vw]">
                <span
                  className="absolute inset-0 text-paper opacity-[0.06] blur-sm translate-x-3 translate-y-2 select-none"
                  aria-hidden
                >
                  OF WORKS.
                </span>
                <span className="relative">
                  <span className="text-blood">OF</span>
                  <span className="text-paper"> WORKS.</span>
                  <span className="inline-block w-3 h-3 md:w-5 md:h-5 bg-blood align-[0.4em] ml-3 md:ml-5 animate-brut-jitter" style={{ '--rot': '0deg' }} />
                </span>
              </span>
            </motion.h1>

            {/* 描述条 · 巨字序号 + 说明 + 统计 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mt-14 md:mt-18">
              {/* 左：说明 */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-4 mb-6">
                  <span className="brut-serial brut-serial--ink">01</span>
                  <span className="h-[2px] w-16 md:w-20 bg-paper" />
                  <span className="brut-label text-[14px]">INTRO · 章节导读</span>
                </div>
                <p className="leading-peach-read text-fog text-base md:text-lg max-w-3xl">
                  本栏目收录三件精选作品：从 <strong className="text-paper">原创 IP 视觉系统</strong>、
                  <strong className="text-paper"> 粒象艺术工作室品牌交互</strong> 到
                  <strong className="text-paper"> Mivox 觅沃 AI 产品官网</strong>，
                  每个作品完整呈现从设计页面到主要界面原稿的全部细节。点击任意作品卡片进入详情展区。
                </p>
              </div>

              {/* 右：粗野统计 · 米色块 + 暗红印章 */}
              <div className="lg:col-span-5 lg:pl-8 lg:border-l-[2px] border-paper/30 lg:mt-8">
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  {[
                    { num: String(works.length).padStart(2, '0'), label: '件精选作品', accent: '#C8281C' },
                    { num: String(works.reduce((s, w) => s + w.pageImages.length, 0)).padStart(2, '0'), label: '张设计页面', accent: '#D4B896' },
                    { num: String(works.reduce((s, w) => s + w.originalImages.length, 0)).padStart(2, '0'), label: '张主要原稿', accent: '#E85D2F' },
                  ].map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={headerInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.7, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="brut-press-card relative p-4 md:p-5"
                      style={{ background: '#141414' }}
                    >
                      {/* 暗红印章编号 */}
                      <span
                        className="absolute -top-2 -right-2 px-2 py-1 font-mono font-bold text-[9px] tracking-[0.2em] uppercase text-paper"
                        style={{ background: s.accent, border: '2px solid #0A0A0A', transform: 'rotate(-6deg)' }}
                      >
                        N°{String(i + 1).padStart(2, '0')}
                      </span>
                      <p
                        className="font-display font-black leading-none tracking-brut-tight text-[clamp(36px,5vw,72px)]"
                        style={{ color: s.accent }}
                      >
                        {s.num}
                      </p>
                      <p className="brut-label mt-3 text-fog text-[10px] leading-tight">
                        {s.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ #works-brut-filter · 分类筛选 ============ */}
      <section id="works-brut-filter" className="max-w-content mx-auto px-5 md:px-6 relative z-10">
        <div className="py-10 md:py-12 border-b-[3px] border-paper/30 brut-torn-bottom">
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <span className="brut-label text-fog mr-2">FILTER · 分类筛选</span>
            {categories.map((c, i) => {
              const active = activeFilter === c.id
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveFilter(c.id)}
                  className={`group relative inline-flex items-center gap-2.5 px-5 md:px-6 py-3 md:py-3.5 border-[2px] font-display font-black text-[11px] tracking-[0.22em] uppercase transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    active
                      ? 'bg-paper text-ink border-paper shadow-brut-press-blood hover:-translate-y-0.5 hover:-translate-x-0.5'
                      : 'bg-transparent text-fog border-paper/25 hover:border-paper/60 hover:text-paper'
                  }`}
                  style={active ? { transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 0.5}deg)` } : {}}
                >
                  {active && (
                    <span
                      className="w-2 h-2"
                      style={{ background: '#C8281C' }}
                    />
                  )}
                  {c.label}
                  {/* 涂鸦下划线 · 激活时显示 */}
                  {active && (
                    <svg
                      className="absolute -bottom-1.5 left-3 right-3 h-2 pointer-events-none"
                      viewBox="0 0 100 8"
                      preserveAspectRatio="none"
                      fill="none"
                    >
                      <motion.path
                        d="M2,5 Q20,1 40,4 T78,5 T98,3"
                        stroke="#C8281C"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ #works-brut-grid · 不对称网格作品卡 ============ */}
      <section id="works-brut-grid" className="max-w-content mx-auto px-5 md:px-6 relative z-10 py-14 md:py-20">
        <div className="flex flex-col gap-12 md:gap-16 lg:gap-20">
          {filteredWorks.map((work, i) => {
            const accent = brutAccents[work.id] || brutAccents['art-studio']
            const even = i % 2 === 1
            return (
              <motion.article
                key={work.id}
                initial={{ opacity: 0, y: 56 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => navigate(`/works/${work.id}`)}
                className="group cursor-pointer relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch"
              >
                {/* ============ 封面区 · 不对称布局（奇偶行交替） ============ */}
                <div className={`lg:col-span-7 ${even ? 'lg:order-2 lg:pl-8' : 'lg:order-1 lg:pr-8'} flex`}>
                  <div
                    className="relative aspect-[4/3] lg:aspect-auto lg:h-full w-full overflow-hidden bg-ink-2 border-[2px] border-paper group-hover:border-paper transition-all duration-500"
                    style={{ boxShadow: `12px 12px 0 0 ${accent.primary}` }}
                  >
                    {/* 主封面 = Frame-0 · 粗野字体灰度滤镜 */}
                    <img
                      src={work.cover}
                      alt={`${work.title} · 封面 Frame-0`}
                      loading="eager"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04] filter grayscale-[0.55] contrast-115 brightness-95"
                    />
                    {/* 粗野网点叠加 */}
                    <div className="brut-halftone opacity-70" />
                    {/* 撕纸顶部边缘 */}
                    <div className="brut-torn-top absolute inset-x-0 top-0 h-3" />
                    {/* 撕纸底部边缘 */}
                    <div className="brut-torn-bottom absolute inset-x-0 bottom-0 h-3" />

                    {/* 大序号 · 双色错位（泼墨感） */}
                    <div
                      className="absolute top-3 left-4 md:top-4 md:left-5 z-10 font-display font-black leading-none tracking-brut-tight select-none pointer-events-none"
                      style={{ fontSize: 'clamp(56px, 8vw, 120px)' }}
                    >
                      {/* 米色阴影层 */}
                      <span
                        className="absolute inset-0 select-none"
                        style={{ color: accent.secondary, transform: 'translate(3px, 3px)', opacity: 0.85 }}
                        aria-hidden
                      >
                        {work.serial}
                      </span>
                      {/* 米白主层 */}
                      <span className="relative text-paper">{work.serial}</span>
                    </div>

                    {/* 右上：分类印章 · 暗红/橙色 */}
                    <div className="absolute top-3 right-3 md:top-4 md:right-5 z-10">
                      <span
                        className="brut-stamp"
                        style={{ background: accent.primary, color: '#F2EEE5' }}
                      >
                        {work.categoryLabel}
                      </span>
                    </div>

                    {/* 左下：原稿与页面数量 · 粗野字体标签 */}
                    <div className="absolute bottom-3 left-3 md:bottom-4 md:left-5 z-10 flex items-center gap-2">
                      <span
                        className="inline-flex items-center px-2.5 md:px-3 py-1.5 bg-ink/90 backdrop-blur border-[2px] border-paper/30 font-display font-black text-[11px] tracking-[0.14em] text-paper uppercase"
                      >
                        {work.pageImages.length} PAGES
                      </span>
                      <span
                        className="inline-flex items-center px-2.5 md:px-3 py-1.5 backdrop-blur text-paper uppercase border-[2px] border-paper/30"
                        style={{ background: `${accent.secondary}EE`, color: '#0A0A0A' }}
                      >
                        <span className="font-display font-black text-[10px] tracking-[0.18em]">
                          {work.originalImages.length} DRAFTS
                        </span>
                      </span>
                    </div>

                    {/* 右下 CTA · 撕纸箭头 */}
                    <div
                      className="absolute bottom-3 right-3 md:bottom-4 md:right-5 z-10 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border-[2px] border-paper text-paper
                        opacity-0 group-hover:opacity-100 translate-x-3 translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0
                        transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        background: accent.primary,
                        borderColor: accent.primary,
                        color: '#0A0A0A',
                      }}
                    >
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>

                    {/* 胶带装饰 · 暗红/橙色 */}
                    <span
                      className={`brut-tape brut-tape--${accent.tape}`}
                      style={{ top: '-8px', left: '24px', transform: 'rotate(-4deg)' }}
                    />

                    {/* 四角装饰 · 粗野字体直角 */}
                    <span className="absolute top-3 left-3 w-4 h-4 border-t-[2px] border-l-[2px] border-paper/70 pointer-events-none z-10" />
                    <span className="absolute top-3 right-3 w-4 h-4 border-t-[2px] border-r-[2px] border-paper/70 pointer-events-none z-10" />
                    <span className="absolute bottom-3 left-3 w-4 h-4 border-b-[2px] border-l-[2px] border-paper/70 pointer-events-none z-10" />
                    <span className="absolute bottom-3 right-3 w-4 h-4 border-b-[2px] border-r-[2px] border-paper/70 pointer-events-none z-10" />
                  </div>
                </div>

                {/* ============ 文字区 · 不对称布局（奇偶行交替） ============ */}
                <div className={`lg:col-span-5 ${even ? 'lg:order-1 lg:pr-4' : 'lg:order-2 lg:pl-4'}`}>
                  {/* 章节编号 · 涂鸦线 */}
                  <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6">
                    <span className="brut-label text-fog">EXHIBIT · N° {String(i + 1).padStart(3, '0')}</span>
                    <svg
                      className="h-2 flex-1 max-w-[120px]"
                      viewBox="0 0 120 8"
                      preserveAspectRatio="none"
                      fill="none"
                    >
                      <motion.path
                        d="M2,5 Q20,1 40,4 T78,5 T118,3"
                        stroke={accent.primary}
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </svg>
                  </div>

                  {/* 中文巨字标题 */}
                  <h3
                    className="font-display font-black text-[clamp(24px,3vw,40px)] leading-[1.05] tracking-brut-kerned text-paper mb-3 md:mb-4 transition-colors duration-400 group-hover:text-paper-2 uppercase whitespace-nowrap"
                  >
                    {work.title}
                  </h3>
                  {/* 英文副标题 · 撞色 */}
                  <p
                    className="font-display font-black text-lg md:text-xl leading-[1] tracking-brut-kerned uppercase mb-6 md:mb-8"
                    style={{ color: accent.primary }}
                  >
                    {work.titleEn}
                  </p>

                  {/* 简介 */}
                  <p className="leading-peach-read text-fog text-sm md:text-base mb-6 md:mb-8 max-w-xl">
                    {work.shortDesc}
                  </p>

                  {/* 信息卡片 · 粗野字体撞色 */}
                  <div className="grid grid-cols-2 gap-4 md:gap-5 mb-6 md:mb-8">
                    <div
                      className="relative p-4 md:p-5 border-[2px] border-paper/30 bg-ink-2"
                      style={{ boxShadow: `6px 6px 0 0 ${accent.primary}` }}
                    >
                      <p className="brut-label text-fog mb-1.5 text-[9px]">ROLE · 角色</p>
                      <p className="font-display font-bold text-paper text-xs md:text-sm leading-snug">{work.role}</p>
                    </div>
                    <div
                      className="relative p-4 md:p-5 border-[2px] border-paper/30 bg-ink-2"
                      style={{ boxShadow: `6px 6px 0 0 ${accent.secondary}` }}
                    >
                      <p className="brut-label text-fog mb-1.5 text-[9px]">YEAR · 年份</p>
                      <p className="font-display font-black text-paper text-xs md:text-sm">{work.year}</p>
                    </div>
                  </div>

                  {/* 涂鸦标签 · 撞色 */}
                  <div className="flex flex-wrap gap-1.5 mb-7 md:mb-10">
                    {work.tags.map((t, ti) => (
                      <span
                        key={t}
                        className="px-2.5 md:px-3 py-1.5 border-[2px] border-paper/25 text-fog text-[10px] md:text-xs uppercase tracking-[0.18em] font-display font-bold
                          group-hover:border-paper/50 group-hover:text-paper transition-all duration-400"
                        style={{ transform: `rotate(${(ti % 2 === 0 ? -1 : 1) * 0.8}deg)` }}
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  {/* 底部 CTA 行 */}
                  <div className="flex items-center justify-between gap-4 pt-6 md:pt-7 border-t-[2px] border-paper/20">
                    <div className="flex flex-wrap items-center gap-3 text-fog text-xs md:text-sm font-display font-black uppercase tracking-[0.14em]">
                      <span className="text-paper whitespace-nowrap">{work.pageImages.length} 页设计页面</span>
                      <span className="w-1.5 h-1.5" style={{ background: accent.secondary }} />
                      <span className="text-paper whitespace-nowrap">{work.originalImages.length} 张原稿可查</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-fog group-hover:text-paper transition-colors duration-400 flex-shrink-0">
                      <span className="hidden sm:inline-block brut-label text-[11px] leading-none self-center">ENTER</span>
                      <span className="relative w-8 md:w-12 h-[2px] bg-paper/30 overflow-hidden">
                        <span
                          className="absolute inset-y-0 left-0 w-0 transition-all duration-600 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:w-full"
                          style={{ background: accent.primary }}
                        />
                      </span>
                      <svg
                        className="w-4 h-4 md:w-[18px] md:h-[18px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 group-hover:-translate-y-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* 空状态 · 粗野字体 EMPTY */}
        {filteredWorks.length === 0 && (
          <div className="py-24 md:py-32 flex flex-col items-center justify-center text-center px-6">
            <p className="font-display font-black text-[clamp(64px,14vw,180px)] text-paper opacity-[0.06] leading-none mb-6">
              EMPTY
            </p>
            <p className="brut-label text-fog mb-6">NO WORKS · 此分类下暂无作品</p>
            <button
              onClick={() => setActiveFilter('all')}
              className="px-6 py-3 border-[2px] border-paper/30 text-paper hover:bg-paper hover:text-ink transition-all duration-400 font-display font-black text-[11px] tracking-[0.22em] uppercase shadow-brut-press-blood hover:-translate-y-0.5 hover:-translate-x-0.5"
            >
              查看全部作品 · RESET FILTER
            </button>
          </div>
        )}
      </section>

      {/* 底部撕纸分隔 */}
      <div className="brut-torn-top relative h-3 bg-paper" />
    </div>
  )
}

export default Works
