import { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import SideNav from './components/SideNav';
import ScrollToTop from './components/ui/ScrollToTop';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import Works from './pages/Works';
// import WorkDetail from './pages/WorkDetail'; ← 静态 import 在首页就触发，损坏模块会让整页白屏
const WorkDetail = lazy(() => import('./pages/WorkDetail'));
import About from './pages/About';
import Lenis from '@studio-freight/lenis';
import { AnimatePresence, motion } from 'framer-motion';

/* =========================================================
   CursorHalo — 高级自定义光标光晕组件
   参考 Behance / Awwwards 个人作品集的细腻交互
   ========================================================= */
function CursorHalo() {
  const haloRef = useRef(null);
  const dotRef = useRef(null);
  const activeRef = useRef(false);
  const rafRef = useRef(0);
  const posRef = useRef({ x: -100, y: -100, tx: -100, ty: -100 });
  const dotPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const prefersFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!prefersFine) return;

    const halo = haloRef.current;
    const dot = dotRef.current;
    if (!halo || !dot) return;

    const onMove = (e) => {
      posRef.current.tx = e.clientX;
      posRef.current.ty = e.clientY;
      dotPosRef.x = e.clientX;
      dotPosRef.y = e.clientY;
      if (!activeRef.current) {
        activeRef.current = true;
        halo.classList.add('is-active');
        dot.classList.add('is-active');
      }
    };

    const onLeave = () => {
      activeRef.current = false;
      halo.classList.remove('is-active');
      dot.classList.remove('is-active');
    };

    let hoverLevel = 0;
    const onOver = (e) => {
      const el = e.target.closest('a, button, [data-cursor="hover"], article, input, textarea, select');
      if (el) {
        hoverLevel = Math.min(2, hoverLevel + 1);
        halo.style.setProperty('--halo-scale', el.closest('article') || el.matches('[data-cursor="big-hover"]') ? '1.9' : '1.4');
        dot.style.setProperty('--dot-scale', '0');
        halo.style.setProperty('--halo-blend', 'multiply');
      }
    };
    const onOut = (e) => {
      const el = e.target.closest('a, button, [data-cursor="hover"], article, input, textarea, select');
      if (el) {
        hoverLevel = Math.max(0, hoverLevel - 1);
        if (hoverLevel === 0) {
          halo.style.setProperty('--halo-scale', '1');
          dot.style.setProperty('--dot-scale', '1');
          halo.style.setProperty('--halo-blend', 'multiply');
        }
      }
    };

    const tick = () => {
      posRef.current.x += (posRef.current.tx - posRef.current.x) * 0.11;
      posRef.current.y += (posRef.current.ty - posRef.current.y) * 0.11;
      halo.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;
      const px = dotPosRef.x;
      const py = dotPosRef.y;
      dot.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover', onOver, true);
    document.addEventListener('mouseout', onOut, true);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', onOver, true);
      document.removeEventListener('mouseout', onOut, true);
    };
  }, []);

  return (
    <>
      <div
        ref={haloRef}
        className="cursor-halo"
        style={{
          left: 0, top: 0,
          transform: 'translate3d(-999px,-999px,0)',
          willChange: 'transform',
          '--halo-scale': '1',
          '--halo-blend': 'multiply',
          mixBlendMode: 'var(--halo-blend)',
          transition: 'width 0.45s cubic-bezier(0.16,1,0.3,1), height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease',
          width: 'calc(360px * var(--halo-scale, 1))',
          height: 'calc(360px * var(--halo-scale, 1))',
        }}
      />
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] opacity-0 transition-opacity duration-300"
        style={{
          left: 0, top: 0,
          '--dot-scale': '1',
          transform: 'translate3d(-999px,-999px,0)',
          willChange: 'transform',
        }}
      >
        <div
          className="rounded-full bg-ink-0"
          style={{
            width: 'calc(8px * var(--dot-scale, 1))',
            height: 'calc(8px * var(--dot-scale, 1))',
            transition: 'width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), background 0.3s',
          }}
        />
      </div>
    </>
  );
}

/* =========================================================
   ScrollProgress · 墨黑顶部滚动进度条（100%时Signal Blue点缀）
   ========================================================= */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const measure = () => {
      const lenis = window.__lenis;
      if (lenis && typeof lenis.scroll === 'number' && lenis.limit > 0) {
        setProgress(Math.min(1, Math.max(0, lenis.scroll / lenis.limit)));
      } else {
        const h = document.documentElement;
        const total = h.scrollHeight - h.clientHeight;
        setProgress(total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0);
      }
      rafId = 0;
    };
    const schedule = () => { if (!rafId) rafId = requestAnimationFrame(measure); };

    const lenis = window.__lenis;
    if (lenis && typeof lenis.on === 'function') lenis.on('scroll', schedule);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    measure();
    return () => {
      if (lenis && typeof lenis.off === 'function') lenis.off('scroll', schedule);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const isEnd = progress >= 0.995;
  return (
    <div className="scroll-progress" aria-hidden="true">
      <div
        className={"scroll-progress__bar" + (isEnd ? " is-end" : "")}
        style={{ width: (progress * 100).toFixed(3) + '%' }}
      />
    </div>
  );
}

/* =========================================================
   PageTransition — 路由切换页面进入动效
   ========================================================= */
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const location = useLocation();
  const lenisRef = useRef(null);

  /* ===== Lenis Smooth Scroll 初始化 ===== */
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;
      const hash = target.getAttribute('href');
      if (!hash || hash.length < 2) return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -20, duration: 1.4 });
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  useEffect(() => {
    const scrollToTop = () => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    };
    const t = setTimeout(scrollToTop, 30);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <Preloader>
    <div className="min-h-[100dvh] bg-void text-cream font-sans antialiased selection:bg-cream selection:text-void relative overflow-x-hidden">
      <CursorHalo />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />

      <main id="main-content" role="main" className="relative">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/works" element={<Works />} />
              <Route
                path="/works/:id"
                element={
                  <Suspense fallback={
                    <div className="pt-40 min-h-screen flex flex-col items-center justify-center">
                      <div className="w-10 h-10 border-2 border-cream border-t-transparent animate-spin rounded-full mb-4" />
                      <p className="text-cream-muted text-xs font-display font-bold uppercase tracking-[0.22em]">Loading project…</p>
                    </div>
                  }>
                    <WorkDetail />
                  </Suspense>
                }
              />
              <Route path="/about" element={<About />} />
            </Routes>
          </PageTransition>
        </AnimatePresence>

        <Footer />
      </main>
    </div>
    </Preloader>
  );
}

export default App;
