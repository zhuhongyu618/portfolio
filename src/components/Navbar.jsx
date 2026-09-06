import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { exportPortfolioPDF } from '../utils/exportPDF'

// ==================== Magnetic Button Hook ====================
function useMagnetic(strength = 0.3) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let rafId = 0
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      const relX = e.clientX - (rect.left + rect.width / 2)
      const relY = e.clientY - (rect.top + rect.height / 2)
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${relX * strength}px, ${relY * strength}px, 0)`
      })
    }
    const reset = () => {
      cancelAnimationFrame(rafId)
      el.style.transform = 'translate3d(0,0,0)'
    }
    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', reset)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', reset)
      cancelAnimationFrame(rafId)
    }
  }, [strength])
  return ref
}

/* ==========================================================================
   NAVBAR · BRUTALIST TYPE STUDIO · 粗野字体导航栏
   基调：bg-ink + text-paper · 滚动态 Liquid Glass · 暗红/橙/米色撞色
   特色：编号(01/02/03) 导航 + Brut 巨字 Logo + 印刷阴影 CTA · Let's Talk
   ========================================================================== */

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [exportMsg, setExportMsg] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const navRef = useRef(null)
  const ctaRef = useMagnetic(0.22)

  // ===== 注入自定义光标光晕（Cursor Halo · difference 混合模式） =====
  useEffect(() => {
    if (document.getElementById('brut-cursor-halo')) return
    const container = document.createElement('div')
    container.id = 'brut-cursor-halo'
    document.body.appendChild(container)
    const halo = document.createElement('div')
    halo.className = 'cursor-halo'
    halo.setAttribute('aria-hidden', 'true')
    container.appendChild(halo)

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let tx = x
    let ty = y
    let rafId = 0
    const move = (e) => {
      tx = e.clientX
      ty = e.clientY
      if (!halo.classList.contains('is-active')) halo.classList.add('is-active')
    }
    const leave = () => halo.classList.remove('is-active')
    const loop = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      halo.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      rafId = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseleave', leave)
    loop()

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', leave)
      cancelAnimationFrame(rafId)
      if (container.parentNode) container.parentNode.removeChild(container)
    }
  }, [])

  // ===== 滚动态切换 =====
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const navLinks = [
    { label: '首页', sub: 'STUDIO', to: '/' },
    { label: '作品', sub: 'ARCHIVE', to: '/works' },
    { label: '关于', sub: 'ARTIST', to: '/about' },
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const handleNavClick = (e, to) => {
    e.preventDefault()
    setTimeout(() => navigate(to), 120)
  }

  const goContact = (e) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/#sec-tickets')
    } else {
      document.getElementById('sec-tickets')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleExportPDF = async () => {
    if (exporting) return
    setExporting(true)
    setExportMsg('准备导出…')
    try {
      await exportPortfolioPDF(navigate, (cur, total, title) => {
        if (cur < 0) {
          setExportMsg(title)
        } else if (cur >= total) {
          setExportMsg('✓ 导出完成')
        } else {
          setExportMsg(`正在导出 ${cur + 1}/${total} · ${title}`)
        }
      })
    } catch (e) {
      setExportMsg('导出失败')
    } finally {
      setTimeout(() => {
        setExporting(false)
        setExportMsg('')
      }, 2000)
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
          isScrolled ? 'h-16' : ''
        }`}
        style={{ height: isScrolled ? '64px' : 'auto' }}
      >
        {/* 背景层：Liquid Glass on scroll · 粗野字体纯黑毛玻璃 */}
        <div
          className={`absolute inset-0 transition-all duration-700 ${
            isScrolled
              ? 'bg-ink/80 backdrop-blur-2xl border-b-[2px] border-paper/15 shadow-[0_4px_40px_-16px_rgba(10,10,10,0.6)]'
              : 'bg-transparent'
          }`}
        />

        {/* 顶部撕纸边缘 */}
        <div className="brut-torn-bottom absolute inset-x-0 bottom-0 h-2" style={{ display: isScrolled ? 'none' : 'block' }} />

        <div className="relative max-w-content mx-auto px-5 md:px-6">
          <div className="flex items-center justify-between">
            {/* ========== Logo · Brut · 米白巨字 ========== */}
            <Link
              to="/"
              onClick={(e) => handleNavClick(e, '/')}
              className="group flex items-center gap-2.5 relative overflow-hidden"
            >
              <div className="relative">
                <span className="font-display font-black text-paper text-2xl md:text-3xl tracking-brut-tight group-hover:text-paper-2 transition-colors duration-500 uppercase block leading-none">
                  ZHONGYU
                </span>
                {/* logo 底部装饰线 · 暗红 */}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 group-hover:w-full bg-blood transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] origin-left"></span>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 self-end mb-1">
                <span className="flex items-center gap-1">
                  <span style={{ background: '#C8281C', width: '6px', height: '6px' }} />
                  <span style={{ background: '#E85D2F', width: '6px', height: '6px' }} />
                  <span style={{ background: '#D4B896', width: '6px', height: '6px' }} />
                </span>
                <span className="font-display font-black text-fog text-[11px] tracking-[0.14em] uppercase">
                  /'26
                </span>
              </span>
            </Link>

            {/* ========== Desktop Nav · 编号导航 ========== */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link, idx) => (
                <NavMagneticLink
                  key={link.to}
                  link={link}
                  idx={idx}
                  active={isActive(link.to)}
                  onClick={(e) => handleNavClick(e, link.to)}
                />
              ))}
            </div>

            {/* ========== 导出 PDF 按钮 ========== */}
            <button
              onClick={handleExportPDF}
              disabled={exporting}
              className="hidden lg:inline-flex relative items-center gap-2 px-4 h-10 bg-marigold/15 text-ochre border-[2px] border-ochre/50 hover:bg-marigold hover:text-ink font-display font-black text-[11px] tracking-[0.18em] uppercase transition-all duration-300 active:scale-[0.96] disabled:opacity-60 disabled:cursor-not-allowed"
              title="将全部页面导出为 PDF"
            >
              {exporting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="max-w-[160px] truncate">{exportMsg || '导出中…'}</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Export PDF</span>
                </>
              )}
            </button>

            {/* ========== CTA · Let's Talk · 粗野字体印刷阴影 ========== */}
            <a
              ref={ctaRef}
              href="/#sec-tickets"
              onClick={goContact}
              className="hidden sm:inline-flex relative items-center gap-2 px-6 h-10 bg-transparent text-paper border-[2px] border-paper hover:bg-paper hover:text-ink font-display font-black text-[11px] tracking-[0.22em] uppercase transition-colors duration-300 active:scale-[0.96] will-change-transform group shadow-brut-press hover:shadow-brut-press-blood hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transition: 'transform 0.18s ease-out, box-shadow 0.5s, background 0.3s, color 0.3s' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blood opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blood"></span>
              </span>
              <span className="relative">Let&apos;s Talk</span>
              <svg
                className="relative w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            {/* ========== Mobile Menu Button · 粗野汉堡 ========== */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-11 h-11 relative flex items-center justify-center bg-ink border-[2px] border-paper/25"
              aria-label="Menu"
            >
              <span className={`absolute block w-5 h-[2px] bg-paper transition-all duration-400 ease-[cubic-bezier(0.77,0,0.175,1)] ${mobileOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
              <span className={`absolute block w-5 h-[2px] bg-paper transition-all duration-400 ease-[cubic-bezier(0.77,0,0.175,1)] ${mobileOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`}></span>
              <span className={`absolute block w-5 h-[2px] bg-paper transition-all duration-400 ease-[cubic-bezier(0.77,0,0.175,1)] ${mobileOpen ? '-rotate-45' : 'translate-y-1.5'}`}></span>
              {/* 边角装饰 · 粗野字体撞色 */}
              <span className="absolute top-2 left-2 w-2 h-2 border-t-[2px] border-l-[2px] border-blood/60 pointer-events-none"></span>
              <span className="absolute top-2 right-2 w-2 h-2 border-t-[2px] border-r-[2px] border-marigold/60 pointer-events-none"></span>
              <span className="absolute bottom-2 left-2 w-2 h-2 border-b-[2px] border-l-[2px] border-ochre/60 pointer-events-none"></span>
              <span className="absolute bottom-2 right-2 w-2 h-2 border-b-[2px] border-r-[2px] border-blood/60 pointer-events-none"></span>
            </button>
          </div>
        </div>

        {/* ========== Mobile Menu Panel · 粗野字体风格 ========== */}
        <div className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${mobileOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="max-w-content mx-auto px-5 py-6 mt-2 mx-5 md:mx-6 bg-ink-2/95 backdrop-blur-2xl border-[2px] border-paper/20">
            <div className="flex flex-col gap-1">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`group flex items-baseline gap-5 py-5 border-b-[2px] border-paper/10 ${
                    isActive(link.to) ? 'text-paper' : 'text-fog'
                  }`}
                >
                  <span className="font-mono font-black text-blood text-xs tracking-[0.3em] tabular-nums">
                    0{idx + 1}
                  </span>
                  <span className="text-4xl font-display font-black tracking-brut-kerned uppercase group-hover:translate-x-2 group-hover:text-paper transition-all duration-500">
                    {link.label}
                  </span>
                  <span className="brut-label text-fog uppercase ml-auto self-center">
                    {link.sub}
                  </span>
                </Link>
              ))}
              <button
                onClick={() => { setMobileOpen(false); handleExportPDF(); }}
                disabled={exporting}
                className="mt-3 inline-flex items-center justify-center gap-3 px-5 py-4 bg-marigold/15 text-ochre border-[2px] border-ochre/40 font-display font-black text-sm tracking-[0.2em] uppercase disabled:opacity-60"
              >
                {exporting ? (
                  <><svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>{exportMsg || '导出中…'}</>
                ) : (
                  <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>Export PDF</>
                )}
              </button>
              <a
                href="/#sec-tickets"
                onClick={(e) => {
                  e.preventDefault()
                  setMobileOpen(false)
                  goContact(e)
                }}
                className="mt-5 inline-flex items-center justify-center gap-3 px-5 py-5 bg-paper text-ink font-display font-black text-sm tracking-[0.2em] uppercase relative group shadow-brut-press-blood"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blood opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blood"></span>
                </span>
                Let&apos;s Talk
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

// ================ Magnetic Nav Link · 粗野字体编号导航 ================
function NavMagneticLink({ link, idx, active, onClick }) {
  const ref = useMagnetic(0.18)
  return (
    <a
      ref={ref}
      href={link.to}
      onClick={onClick}
      className={`relative px-4 md:px-5 py-3 overflow-hidden group transition-colors duration-300 will-change-transform`}
      style={{ transition: 'transform 0.18s ease-out, color 0.3s' }}
    >
      <span className="relative z-10 flex items-center gap-2 leading-none">
        <span className={`font-mono font-black text-[10px] tracking-[0.3em] tabular-nums ${active ? 'text-blood' : 'text-fog'}`}>
          0{idx + 1}
        </span>
        <span className={`font-display font-black text-sm tracking-[0.1em] uppercase ${active ? 'text-paper' : 'text-fog group-hover:text-paper'}`}>
          {link.label}
        </span>
        <span className="brut-label text-fog hidden lg:inline ml-2 leading-none self-center">
          {link.sub}
        </span>
      </span>

      {/* 活动底部线 · 暗红 → 渐变 */}
      <span
        className={`absolute bottom-2 left-4 h-[2px] transition-all duration-600 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          active
            ? 'w-[calc(100%-2rem)] opacity-100'
            : 'w-0 opacity-0 group-hover:w-[calc(100%-2rem)] group-hover:opacity-100'
        }`}
        style={{
          background: active
            ? 'linear-gradient(90deg, #C8281C, #E85D2F)'
            : 'linear-gradient(90deg, #C8281C, #D4B896)'
        }}
      ></span>
    </a>
  )
}

export default Navbar
