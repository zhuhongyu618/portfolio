import { useParams, Link, useNavigate } from 'react-router-dom'
import { getWorkById, getRelatedWorks } from '../data/works'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import WorkCard from '../components/ui/WorkCard'
import BorderGlow from '../components/ui/BorderGlow'

/* ==========================================================================
   WORK · DETAIL  作品详情页（三个作品通用结构）
   统一模块：
   1. #work-hero            → 作品头牌（标题、展签、元数据）
   2. #work-concept         → 设计理念 & 项目详情（concept / description / details）
   3. #work-pages           → 主要页面展示（pageImages，统一高度，按顺序排列）
   4. #work-originals       → 主要界面原稿（originalImages，网格卡片 + 中文 tooltip，点击新标签查看）
   5. #work-related         → 其他作品推荐
   ========================================================================== */

const WorkDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const work = getWorkById(id)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  if (!work) {
    return (
      <div className="pt-40 min-h-screen flex flex-col items-center justify-center bg-void relative overflow-hidden px-6">
        <p className="font-display font-black text-[clamp(80px,18vw,220px)] text-cream leading-none mb-4 tracking-warhol-tight select-none">
          404
        </p>
        <p className="brut-label text-cream/50 mb-8 text-[11px]">
          WORK NOT FOUND · 作品不存在
        </p>
        <Link
          to="/works"
          className="pop-btn inline-flex items-center gap-3 px-7 py-3.5 bg-cream text-void brut-label whitespace-nowrap shadow-pop-press hover:shadow-pop-press-mag hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回作品档案
        </Link>
      </div>
    )
  }

  const related = getRelatedWorks(id, 3)
  const accentColors = {
    'original-ip': { primary: '#C8281C', secondary: '#E85D2F' },
    'art-studio': { primary: '#E85D2F', secondary: '#D4B896' },
    'mivox': { primary: '#D4B896', secondary: '#C8281C' },
  }
  const accent = accentColors[work.id] || { primary: '#C8281C', secondary: '#E85D2F' }

  const handleBack = (e) => {
    e.preventDefault()
    navigate('/works')
  }

  return (
    <div className="pt-32 md:pt-36 bg-void min-h-screen relative">
      {/* CMYK 装饰色点 */}
      <div className="fixed top-40 right-8 w-3 h-3 rounded-full opacity-70 z-0 hidden lg:block pointer-events-none" style={{ background: accent.primary }} />
      <div className="fixed top-[38vh] left-6 w-2.5 h-2.5 rounded-full opacity-70 z-0 hidden lg:block pointer-events-none" style={{ background: accent.secondary }} />

      {/* ============ 展签导航 ============ */}
      <section className="max-w-content mx-auto px-5 md:px-6 relative z-10">
        <div className="py-5 border-b border-cream/15">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 brut-label text-cream/50 text-[11px] whitespace-nowrap overflow-hidden">
              <Link to="/" className="hover:text-pop-cyan transition-colors duration-300">01 · HOME</Link>
              <span className="text-pop-magenta">/</span>
              <Link to="/works" className="hover:text-pop-cyan transition-colors duration-300">02 · ARCHIVE</Link>
              <span style={{ color: accent.primary }}>/</span>
              <span className="text-cream whitespace-nowrap overflow-hidden">03 · {work.title.slice(0, 16)}{work.title.length > 16 ? '…' : ''}</span>
            </div>
            <a
              href="/works"
              onClick={handleBack}
              className="hidden md:inline-flex items-center gap-2.5 px-5 py-2.5 border border-cream/30 text-cream hover:bg-cream hover:text-void transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] brut-label group"
            >
              <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              BACK · 返回作品档案
            </a>
          </div>
        </div>
      </section>

      {/* ============ #work-hero · 头牌区 ============ */}
      <section id="work-hero" className="max-w-content mx-auto px-5 md:px-6 relative z-10">
        <div className="py-14 md:py-16 border-b border-cream/15">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}>
            {/* 展签条 */}
            <div className="flex flex-wrap items-center gap-3 mb-8 md:mb-10">
              <span
                className="expo-dept inline-flex items-center px-3.5 py-1.5 text-void text-[10px] font-display font-black uppercase tracking-[0.2em] shadow-pop-press-xs"
                style={{ background: accent.primary }}
              >
                {work.categoryLabel}
              </span>
              <span className="inline-flex items-center px-3 py-1.5 border border-cream/25 text-cream/70 brut-label text-[12px] whitespace-nowrap">
                {work.year}
              </span>
              <span
                className="inline-flex items-center px-3 py-1.5 border brut-label text-[12px] whitespace-nowrap"
                style={{ borderColor: `${accent.secondary}66`, color: accent.secondary }}
              >
                N° {work.serial}
              </span>
            </div>

            <h1 className="font-display font-black text-[clamp(36px,5.5vw,88px)] leading-[0.95] tracking-warhol-kerned text-cream relative z-10 whitespace-nowrap pt-[2px] md:pt-[3px] pb-[1px] md:pb-[2px]">
              {work.title}
            </h1>
            <p className="mt-3 md:mt-4 font-display font-black text-[clamp(16px,2vw,32px)] leading-[0.95] tracking-warhol-kerned uppercase" style={{ color: `${accent.primary}99` }}>
              {work.titleEn}
            </p>
            <p className="mt-8 md:mt-10 text-cream/70 text-base md:text-xl leading-[1.55] max-w-4xl">
              {work.shortDesc}
            </p>

            {/* Metadata */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mt-12 md:mt-16 relative">
              {[
                { num: '01', label: 'ROLE · 担任角色', value: work.role, glow: [accent.primary, '#E8E8E8', '#FF3399'] },
                { num: '02', label: 'PERIOD · 项目周期', value: work.period, mono: true, glow: [accent.secondary, '#E8E8E8', '#00E0FF'] },
                { num: '03', label: 'CATEGORY · 作品分类', value: work.categoryLabel, glow: ['#E9C46A', '#E8E8E8', accent.primary] },
                { num: '04', label: 'TAGS · 关键词', tags: work.tags, glow: ['#FF3399', '#E8E8E8', accent.primary] },
              ].map((m) => (
                <BorderGlow
                  key={m.num}
                  backgroundColor="#0A0A0A"
                  borderRadius={16}
                  glowRadius={14}
                  glowIntensity={1.0}
                  colors={m.glow}
                  fillOpacity={0.35}
                  className="block"
                >
                  <div className="p-3.5 md:p-4">
                    <p className="expo-dept-label text-cream/40 text-[10px] tracking-[0.3em] uppercase mb-2.5 font-display font-black">
                      {m.num} · {m.label}
                    </p>
                    {m.tags ? (
                      <div className="flex flex-wrap gap-1.5">
                        {m.tags.map((t) => (
                          <span key={t} className="px-2 py-0.5 border border-cream/25 text-cream/70 brut-label text-[12px] whitespace-nowrap">
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-cream text-sm md:text-base font-display font-black leading-snug">
                        {m.value}
                      </p>
                    )}
                  </div>
                </BorderGlow>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ #work-concept · 设计理念 ============ */}
      <section id="work-concept" className="max-w-content mx-auto px-5 md:px-6 relative z-10 py-14 md:py-16 border-b border-cream/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-8">
              <span className="font-display font-black text-cream text-[clamp(36px,5vw,80px)] leading-none tracking-warhol-tight">
                01
              </span>
              <span className="h-px w-16 bg-cream" />
              <span className="expo-eyebrow">DESIGN CONCEPT · 设计理念</span>
            </div>
            <h2 className="font-display font-black text-[clamp(32px,5vw,72px)] leading-[0.9] tracking-warhol-kerned text-cream uppercase">
              Concept
              <span className="inline-block ml-2 md:ml-3 w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full align-[0.2em]" style={{ background: accent.secondary }} />
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pl-8 lg:border-l border-cream/20">
            <BorderGlow
              backgroundColor="#0A0A0A"
              borderRadius={16}
              glowRadius={22}
              glowIntensity={1.0}
              colors={[accent.primary, '#E8E8E8', accent.secondary]}
              fillOpacity={0.3}
              className="h-full"
            >
              <div className="p-5 md:p-7">
                <p
                  className="text-lg md:text-2xl leading-[1.55] mb-6 font-bold"
                  style={{ color: accent.primary }}
                >
                  「 {work.concept} 」
                </p>
                <p className="leading-peach-read text-cream-muted text-base md:text-lg mb-6 md:mb-8">
                  {work.description}
                </p>
                <div className="pt-5 md:pt-6 border-t border-cream/15">
                  <p className="expo-eyebrow text-cream-muted mb-4 md:mb-5">DESIGN DETAILS · 设计详情</p>
                  <ul className="space-y-3.5 md:space-y-4">
                    {work.details.map((d, i) => (
                      <li key={i} className="flex gap-4 md:gap-5 leading-peach-read text-cream-muted text-sm md:text-base">
                        <span
                          className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-display font-black text-void text-sm"
                          style={{ background: accent.primary }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="pt-1.5 md:pt-2">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </BorderGlow>
          </div>
        </div>
      </section>

      {/* ============ #work-pages · 主要页面展示（所有页面长度统一一致） ============ */}
      <section id="work-pages" className="relative bg-void overflow-hidden py-14 md:py-16 border-b border-cream/15">
        <div className="max-w-content mx-auto px-5 md:px-6 relative z-10">
          <div className="flex items-center gap-4 mb-10 md:mb-14">
            <span className="font-display font-black text-cream text-[clamp(36px,5vw,80px)] leading-none tracking-warhol-tight">
              02
            </span>
            <span className="h-px w-16 bg-cream" />
            <div>
              <span className="expo-eyebrow">PAGES SHOWCASE · 主要页面展示</span>
            </div>
          </div>

          <h2 className="font-display font-black text-[clamp(32px,5vw,72px)] leading-[0.9] tracking-warhol-kerned text-cream uppercase mb-10 md:mb-14">
            Major <span style={{ color: accent.primary }}>Pages</span>.
          </h2>

          {/* 所有图片：全宽展示 + 统一高度区间 + object-contain 保持比例 */}
          <div className="flex flex-col gap-8 md:gap-12">
            {work.pageImages.map((src, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.85, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                {/* 全宽容器：图片直接贴合边框，无间隙 */}
                <div
                  className="relative w-full bg-void-10 border-2 border-cream/20 group-hover:border-cream/40 transition-all duration-600 overflow-hidden"
                  style={{ minHeight: '320px' }}
                >
                  <img
                    src={src}
                    alt={`${work.title} · Frame-${i}`}
                    loading="lazy"
                    className="block w-full h-auto select-none transition-transform duration-[1400ms] ease-out group-hover:scale-[1.008]"
                  />
                  {/* 扫描线装饰 */}
                  <div className="absolute inset-0 scanline-wrap opacity-35 pointer-events-none" />
                  {/* 帧号标签 */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 bg-void/85 backdrop-blur border border-cream/20">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: accent.primary }}
                    />
                    <span className="brut-label text-cream text-[12px] whitespace-nowrap">
                      FRAME · {String(i).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 brut-label text-cream-muted text-[12px] whitespace-nowrap px-3 py-1.5 bg-void/70 backdrop-blur">
                    PAGE {String(i + 1).padStart(2, '0')} / {String(work.pageImages.length).padStart(2, '0')}
                  </div>
                </div>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ #work-originals · 主要界面原稿（中文交互提示 + 点击跳转查看） ============ */}
      <section
        id="work-originals"
        className="relative overflow-hidden py-14 md:py-16 border-b border-cream/15"
        style={{ background: `${accent.primary}08` }}
      >
        <div className="max-w-content mx-auto px-5 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-10 md:mb-14 items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-8">
                <span className="font-display font-black text-cream text-[clamp(36px,5vw,80px)] leading-none tracking-warhol-tight">
                  03
                </span>
                <span className="h-px w-16 bg-cream" style={{ background: accent.secondary }} />
                <div>
                  <span className="expo-eyebrow" style={{ color: accent.secondary }}>
                    ORIGINAL DRAFTS · 主要界面原稿
                  </span>
                  <p className="expo-meta text-cream-muted mt-1">
                    共 {work.originalImages.length} 张 · 鼠标悬停卡片可查看中文提示 · 点击图片跳转查看原稿
                  </p>
                </div>
              </div>
              <h2 className="font-display font-black text-[clamp(32px,5vw,72px)] leading-[0.9] tracking-warhol-kerned text-cream uppercase">
                Original <span style={{ color: accent.secondary }}>Drafts</span>.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pl-8 lg:border-l border-cream/20">
              <BorderGlow
                backgroundColor="#0A0A0A"
                borderRadius={16}
                glowRadius={20}
                glowIntensity={1.0}
                colors={[accent.secondary, '#E8E8E8', accent.primary]}
                fillOpacity={0.3}
                className="h-full"
              >
                <div className="p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center font-display font-black text-void text-sm" style={{ background: accent.secondary }}>
                      i
                    </span>
                    <div>
                      <p className="font-display font-black text-cream text-sm mb-1.5">操作提示 · Interactions</p>
                      <ul className="text-xs md:text-sm text-cream-muted space-y-1.5 leading-relaxed font-display font-black">
                        <li>• 将鼠标<strong className="text-cream">悬停</strong>在卡片上可查看中文交互提示</li>
                        <li>• <strong className="text-cream">点击</strong>任意原稿卡片，将在新标签页跳转查看高清原图</li>
                        <li>• 返回时点击浏览器「返回」按钮或上方「返回作品档案」</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </BorderGlow>
            </div>
          </div>

          {/* 原稿网格 */}
          <div className={`grid gap-5 md:gap-7 ${
            work.originalImages.length === 1 ? 'grid-cols-1 md:grid-cols-2' :
            work.originalImages.length <= 4 ? 'grid-cols-1 sm:grid-cols-2' :
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}>
            {work.originalImages.map((orig, i) => (
              <BorderGlow
                key={i}
                backgroundColor="#0A0A0A"
                borderRadius={16}
                glowRadius={18}
                glowIntensity={1.0}
                colors={[accent.secondary, '#E8E8E8', accent.primary]}
                fillOpacity={0.3}
                className="block"
              >
                <motion.a
                  href={orig.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={orig.tip}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-8%' }}
                  transition={{ duration: 0.85, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative block aspect-[4/3] overflow-hidden cursor-zoom-in transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:-translate-x-1"
                >
                  <div className="absolute inset-0 z-0">
                    <img
                      src={orig.src}
                      alt={`${work.title} · ${orig.label}`}
                      loading="lazy"
                      draggable={false}
                      className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                    />
                  </div>

                  {/* 渐变遮罩 + 中文交互提示（悬停出现） */}
                  <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/10 to-transparent opacity-60 group-hover:opacity-95 transition-opacity duration-400 pointer-events-none" />

                  {/* 左上角编号 */}
                  <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2">
                    <span
                      className="w-6 h-6 flex items-center justify-center font-display font-black text-[10px] text-void"
                      style={{ background: accent.secondary }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="px-2.5 py-1 bg-void/85 backdrop-blur border border-cream/20 brut-label text-[12px] whitespace-nowrap text-cream">
                      {orig.label}
                    </span>
                  </div>

                  {/* 右上角：外部跳转符号 */}
                  <div className="absolute top-3.5 right-3.5 z-10 flex items-center justify-center w-8 h-8 bg-void/85 backdrop-blur border border-cream/25 group-hover:bg-cream group-hover:border-cream group-hover:text-void text-cream transition-all duration-400">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14L21 3m0 0h-8m8 0v8M10 10H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-5" />
                    </svg>
                  </div>

                  {/* 底部：中文交互提示 */}
                  <div className="absolute left-0 right-0 bottom-0 p-4 md:p-5 z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out opacity-85 group-hover:opacity-100">
                    <p className="text-xs md:text-sm text-cream font-display font-black leading-snug mb-1.5 flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {orig.tip}
                    </p>
                    <p className="brut-label text-[11px] md:text-xs text-cream/80 flex items-center gap-2 whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent.secondary }} />
                      点击在新标签页查看高清原稿 · CLICK TO OPEN IN NEW TAB
                    </p>
                  </div>
                </motion.a>
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>

      {/* ============ #work-related · 其他作品推荐 ============ */}
      <section id="work-related" className="max-w-content mx-auto px-5 md:px-6 relative z-10 py-14 md:py-16">
        <div className="flex items-center gap-4 mb-10 md:mb-14">
          <span className="font-display font-black text-cream text-[clamp(36px,5vw,80px)] leading-none tracking-warhol-tight">
            04
          </span>
          <span className="h-px w-16 bg-cream" />
          <div>
            <span className="expo-eyebrow">NEXT WORKS · 其他作品</span>
            <p className="expo-meta text-cream-muted mt-1">共 {related.length} 件精选作品</p>
          </div>
        </div>
        <h2 className="font-display font-black text-[clamp(32px,5vw,72px)] leading-[0.9] tracking-warhol-kerned text-cream uppercase mb-10 md:mb-14">
          Explore <span className="text-pop-magenta">More</span>.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {related.map((w, i) => (
            <WorkCard key={w.id} work={w} index={i + 1} />
          ))}
        </div>
        <div className="mt-14 md:mt-16 flex justify-center">
          <Link
            to="/works"
            className="pop-btn inline-flex items-center gap-4 px-7 md:px-8 py-4 md:py-5 bg-cream text-void relative overflow-hidden shadow-pop-press hover:shadow-pop-press-mag hover:-translate-y-1 hover:-translate-x-1 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            <span className="brut-label text-xs md:text-sm whitespace-nowrap relative z-10">
              返回全部作品档案
            </span>
            <svg
              className="relative w-5 h-5 md:w-6 md:h-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span
              className="absolute inset-0 -z-10 translate-x-2 translate-y-2 bg-pop-magenta pointer-events-none"
              aria-hidden
            />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default WorkDetail
