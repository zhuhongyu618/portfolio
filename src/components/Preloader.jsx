import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from './ui/CountUp';

/* ==========================================================================
   PRELOADER · BRUTALIST TYPE STUDIO · 粗野字体加载动画
   Palette: Ink #0A0A0A (95%) · Paper #F2EEE5 (95%) · Blood/Marigold/Ochre <5%
   ========================================================================== */

export default function Preloader({ children }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  const handleComplete = useCallback(() => {
    setTimeout(() => setLoading(false), 600);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) return;

    const duration = 2800;
    const startTime = performance.now();
    let rafId;

    const tick = (now) => {
      const elapsed = now - startTime;
      const raw = Math.min(100, (elapsed / duration) * 100);
      const eased = 1 - Math.pow(1 - raw / 100, 3);
      setProgress(eased);

      if (raw < 100) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);

    const forceComplete = setTimeout(() => {
      setProgress(100);
    }, duration + 100);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(forceComplete);
    };
  }, [loading]);

  useEffect(() => {
    if (progress >= 100 && loading) {
      handleComplete();
    }
  }, [progress, loading, handleComplete]);

  useEffect(() => {
    if (!loading) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
            style={{ background: '#0A0A0A' }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
            onAnimationStart={() => {
              if (!mounted) return;
            }}
          >
            {/* ===== 粗野网点 · 纸张噪点 ===== */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1.2' fill='%23F2EEE5'/%3E%3C/svg%3E")`,
                backgroundSize: '18px 18px',
              }}
            />

            {/* ===== 扫描线叠加 ===== */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, rgba(242,238,229,0.15) 0px, rgba(242,238,229,0.15) 1px, transparent 1px, transparent 4px)',
              }}
            />

            {/* ===== 粗野字体边角刊头 ===== */}
            <div className="absolute top-6 left-6 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full animate-brut-shake" style={{ background: '#C8281C' }} />
              <span className="font-mono text-[10px] text-fog tracking-[0.3em] uppercase">
                Loading Portfolio
              </span>
            </div>

            <div className="absolute top-6 right-6">
              <span className="font-mono text-[10px] text-fog tracking-[0.3em] uppercase">
                BRUTALIST · 4C · INK
              </span>
            </div>

            {/* 撕纸边缘装饰 */}
            <div className="brut-torn-top absolute inset-x-0 top-0 h-3" />

            {/* ===== Count Up Big Number ===== */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Percentage symbol row */}
              <div className="flex items-baseline">
                <CountUp
                  from={0}
                  to={100}
                  duration={2.8}
                  delay={0.2}
                  className="font-display font-black text-paper leading-none tracking-brut-tight"
                  startWhen={mounted}
                  onEnd={handleComplete}
                  style={{ fontSize: 'clamp(48px, 8vw, 120px)' }}
                />
                <span
                  className="font-display font-black text-paper leading-none ml-2 md:ml-3"
                  style={{ fontSize: 'clamp(48px, 8vw, 120px)' }}
                >
                  %
                </span>
              </div>

              {/* ===== Progress Bar · 粗野字体撞色 ===== */}
              <div className="mt-6 md:mt-10 w-[280px] md:w-[420px]">
                <div className="relative h-[3px] bg-paper/15 overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0"
                    style={{
                      width: `${progress}%`,
                      background: '#C8281C',
                      boxShadow: '0 0 18px rgba(200,40,28,0.5)',
                    }}
                    transition={{ ease: 'linear', duration: 0.05 }}
                  />
                  <motion.div
                    className="absolute inset-y-0 left-0"
                    style={{
                      width: `${progress}%`,
                      background: '#F2EEE5',
                      mixBlendMode: 'screen',
                    }}
                    initial={{ width: '0%' }}
                  />
                </div>

                {/* Stage labels */}
                <div className="flex justify-between mt-3">
                  <span
                    className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] uppercase"
                    style={{ color: '#8A8A8A' }}
                  >
                    {progress < 30
                      ? 'Fetching Assets…'
                      : progress < 60
                        ? 'Compiling Modules…'
                        : progress < 90
                          ? 'Rendering Layout…'
                          : 'Finalizing…'}
                  </span>
                  <span
                    className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] uppercase"
                    style={{ color: '#8A8A8A' }}
                  >
                    ZHONGYU · 2026
                  </span>
                </div>
              </div>

              {/* ===== 粗野字体撞色色点 · 暗红/橙/米色 ===== */}
              <div className="mt-8 flex items-center gap-3">
                {['#8E1A12', '#C8281C', '#E85D2F', '#D4B896'].map((color, i) => (
                  <motion.div
                    key={i}
                    className="w-2.5 h-2.5"
                    style={{ background: color }}
                    animate={{
                      scale: progress > (i + 1) * 20 ? [1, 1.5, 1] : [0.8, 1, 0.8],
                      opacity: progress > (i + 1) * 20 ? 1 : 0.5,
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: 'mirror',
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* ===== Bottom scanline decoration ===== */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <motion.div
                className="w-[80px] h-[2px] bg-paper/60"
                animate={{
                  scaleX: [1, 2.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* ===== Top warp speed bar · 粗野字体撞色 ===== */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background:
                  'linear-gradient(90deg, transparent, #C8281C, #D4B896, #E85D2F, #C8281C, transparent)',
                backgroundSize: '200% 100%',
                animation: 'loading-flow 2s linear infinite',
              }}
            />

            {/* ===== Bottom warp speed bar · 粗野字体撞色 ===== */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px]"
              style={{
                background:
                  'linear-gradient(90deg, transparent, #E85D2F, #D4B896, #C8281C, transparent)',
                backgroundSize: '200% 100%',
                animation: 'loading-flow 2.5s linear infinite reverse',
              }}
            />

            {/* 撕纸底部边缘 */}
            <div className="brut-torn-bottom absolute inset-x-0 bottom-0 h-3" />
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}
