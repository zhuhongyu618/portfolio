import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ==========================================================================
   SKILLS · #section-bananas — 波普四象限作品墙 + #section-expo 技能博览会
   对应参考站：#section-bananas（2x2 丝网印刷重复画） + #section-expo（能力展）
   核心：pop-quad-grid · Bento 6 宫格 · 工具双向跑马灯 · CMYK 装饰
   ========================================================================== */

const Skills = () => {
  const gridRef = useRef(null)
  const toolsRef = useRef(null)
  const gridInView = useInView(gridRef, { once: true, margin: '-12%' })
  const toolsInView = useInView(toolsRef, { once: true, margin: '-10%' })

  const marqueeA = ['Photoshop', 'Illustrator', 'Figma', 'Mastergo', 'After Effects', 'Cinema 4D', 'Stitch', 'Lovart']
  const marqueeB = ['Midjourney', 'Stable Diffusion', 'Trae AI', 'Peachweb', 'Brand Design', 'UI/UX', '3D Motion']
  const tools = ['Photoshop', 'Illustrator', 'Figma', 'Mastergo', 'Midjourney', 'Stable Diffusion', 'After Effects', 'Cinema 4D', 'Stitch', 'Lovart', 'Trae', 'Peachweb']

  const skills = [
    { no: '01', title: 'Visual Communication', desc: '视觉传达设计 / IP 形象 / 品牌视觉系统', icon: '◐', accent: 'cream' },
    { no: '02', title: 'UI & UX Design', desc: '界面设计 / 交互体验 / 设计系统构建', icon: '◇', accent: 'pop-cyan' },
    { no: '03', title: 'AI Creative', desc: 'AI 辅助设计 / Midjourney / Stable Diffusion', icon: '✦', accent: 'pop-magenta', feature: true },
    { no: '04', title: 'Motion & 3D', desc: '动效设计 / 3D 建模 / AE &amp; C4D', icon: '◉', accent: 'pop-yellow' },
    { no: '05', title: 'Brand & IP', desc: '品牌视觉 / IP 形象 / 延展应用规范', icon: '✧', accent: 'cream' },
    { no: '06', title: 'Design Systems', desc: '组件规范 / 多终端适配 / 协作交付', icon: '◎', accent: 'pop-red' },
  ]

  return (
    <>
      {/* ============ #section-bananas · 波普四象限代表作墙 ============ */}
      <section
        id="section-bananas"
        ref={gridRef}
        className="relative bg-void overflow-hidden expo-padding"
      >
        <div className="max-w-expo mx-auto px-5 md:px-8 relative">

          {/* ===== 章节刊头：编号 + 标题 ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-14 md:mb-20">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-4 mb-10 md:mb-14">
                <span className="font-display font-black text-cream text-[clamp(40px,6vw,88px)] leading-none tracking-warhol-tight">03</span>
                <span className="h-px w-14 md:w-20 bg-cream relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-pop-cyan to-transparent"
                    style={{ backgroundSize: '200% 100%', animation: 'pop-flicker 4s ease-in-out infinite' }} />
                </span>
                <span className="expo-eyebrow">
                  The Silkscreen Hall · 丝网版画厅
                </span>
              </div>
              <h2 className="font-display font-black leading-[0.86] tracking-warhol-kerned text-cream uppercase">
                <span className="block text-warhol-title">Selected</span>
                <span className="block text-warhol-title relative">
                  <span className="absolute inset-0 text-cream opacity-[0.07] blur-sm translate-x-2 translate-y-1 select-none" aria-hidden>Works.</span>
                  <span className="relative">Works.</span>
                </span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:pl-12">
              <p className="peach-prose mb-6">
                以安迪·沃霍尔丝网印刷的<strong>重复与变奏</strong>为灵感，
                将代表作以 2×2 四象限呈现——同一件作品的四种不同色彩调性，
                如同一场 CMYK 四色印刷的视觉实验。
              </p>
              <div className="flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-3">
                  <span className="font-display font-black text-ticket-num text-cream leading-none">04</span>
                  <span className="expo-eyebrow text-cream-muted">COLORWAYS</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-display font-black text-ticket-num text-pop-magenta leading-none">02×02</span>
                  <span className="expo-eyebrow text-cream-muted">GRID</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-display font-black text-ticket-num text-pop-yellow leading-none">CMYK</span>
                  <span className="expo-eyebrow text-cream-muted">4C PRINT</span>
                </div>
              </div>
            </div>
          </div>

          {/* ===== 波普四象限作品墙（pop-quad-grid） ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* 左：2×2 四象限（AI Creative 代表作品） */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={gridInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <div className="pop-quad-grid">
                {/* 4 张相同图的不同滤镜（AI Creative 代表） */}
                <div>
                  <img src="./images/works/ai-creative/ai-creative-2.jpg" alt="AI Creative · Variant 01" loading="lazy" />
                  <div className="absolute top-3 left-3 z-2 work-serial">01_01</div>
                </div>
                <div>
                  <img src="./images/works/ai-creative/ai-creative-3.jpg" alt="AI Creative · Variant 02" loading="lazy" />
                  <div className="absolute top-3 left-3 z-2 work-serial" style={{ borderColor: 'rgba(0,224,255,0.5)' }}>01_02</div>
                </div>
                <div>
                  <img src="./images/works/ai-creative/ai-creative-6.jpg" alt="AI Creative · Variant 03" loading="lazy" />
                  <div className="absolute top-3 left-3 z-2 work-serial" style={{ borderColor: 'rgba(255,51,153,0.5)' }}>01_03</div>
                </div>
                <div>
                  <img src="./images/works/ai-creative/ai-creative-7.jpg" alt="AI Creative · Variant 04" loading="lazy" />
                  <div className="absolute top-3 left-3 z-2 work-serial" style={{ borderColor: 'rgba(233,196,106,0.5)' }}>01_04</div>
                </div>
              </div>

              {/* 四象限标签条 */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <p className="font-display font-black text-cream text-base md:text-lg tracking-tight uppercase">
                    AI Creative Series · 2025
                  </p>
                  <div className="cmyk-dots">
                    <span style={{ background: '#00E0FF' }} />
                    <span style={{ background: '#FF3399' }} />
                    <span style={{ background: '#E9C46A' }} />
                    <span style={{ background: '#D14D78' }} />
                  </div>
                </div>
                <span className="expo-meta">
                  SILKSCREEN · 4-COLOR · EDITION 1/1
                </span>
              </motion.div>
            </motion.div>

            {/* 右：作品 02 四象限（UI/UX 代表） */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={gridInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1.1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <div className="pop-quad-grid" style={{ aspectRatio: '3 / 4' }}>
                <div>
                  <img src="./images/works/web1.jpg" alt="UI UX · 01" loading="lazy" />
                  <div className="absolute top-3 left-3 z-2 work-serial">02_01</div>
                </div>
                <div>
                  <img src="./images/works/web2.jpg" alt="UI UX · 02" loading="lazy" />
                  <div className="absolute top-3 left-3 z-2 work-serial">02_02</div>
                </div>
                <div>
                  <img src="./images/works/web3.jpg" alt="UI UX · 03" loading="lazy" />
                  <div className="absolute top-3 left-3 z-2 work-serial">02_03</div>
                </div>
                <div>
                  <img src="./images/works/mobile1.jpg" alt="UI UX · 04" loading="lazy" />
                  <div className="absolute top-3 left-3 z-2 work-serial">02_04</div>
                </div>
              </div>
              <div className="mt-5">
                <p className="font-display font-black text-cream text-base md:text-lg tracking-tight uppercase mb-2">
                  UI/UX · Smart Park System
                </p>
                <p className="expo-meta">VISUAL DESIGN · PROTOTYPE · 2026</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ #section-expo · 技能博览会（能力 Bento） ============ */}
      <section
        id="section-expo"
        className="relative bg-void overflow-hidden py-20 md:py-28 border-y border-cream/15"
      >
        <div className="max-w-expo mx-auto px-5 md:px-8 relative">

          {/* ===== 章节刊头 ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-14 md:mb-20">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-10">
                <span className="font-display font-black text-cream text-[clamp(40px,6vw,88px)] leading-none tracking-warhol-tight">04</span>
                <span className="h-px w-14 bg-cream" />
                <span className="expo-eyebrow">
                  Capabilities · 能力博览会
                </span>
              </div>
              <h2 className="font-display font-black leading-[0.88] tracking-warhol-kerned text-cream uppercase">
                <span className="block text-warhol-sub">Skills</span>
                <span className="block text-warhol-sub relative">
                  <span className="absolute inset-0 text-cream opacity-[0.07] blur-sm translate-x-1.5 translate-y-1 select-none" aria-hidden>&amp; Tools.</span>
                  <span className="relative">&amp; Tools.</span>
                </span>
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pl-12 lg:border-l-2 border-cream/25 flex items-end">
              <div>
                <p className="text-cream-muted text-peach-lead leading-peach-read max-w-2xl mb-6">
                  跨越视觉传达、UI&amp;UX、AI 创意与动效三维设计能力，
                  具备从概念构思到落地交付的 <span className="text-cream font-bold">全流程设计经验</span>。
                </p>
                <div className="flex flex-wrap items-center gap-5">
                  <div className="flex items-center gap-3">
                    <span className="font-display font-black text-[clamp(32px,4vw,56px)] text-cream leading-none tracking-warhol-tight">06</span>
                    <span className="expo-eyebrow text-cream-muted">CORE</span>
                  </div>
                  <div className="w-px h-10 bg-cream/25" />
                  <div className="flex items-center gap-3">
                    <span className="font-display font-black text-[clamp(32px,4vw,56px)] text-pop-cyan leading-none tracking-warhol-tight">12</span>
                    <span className="expo-eyebrow text-cream-muted">TOOLS</span>
                  </div>
                  <div className="w-px h-10 bg-cream/25" />
                  <div className="flex items-center gap-3">
                    <span className="font-display font-black text-[clamp(32px,4vw,56px)] text-pop-magenta leading-none tracking-warhol-tight">05+</span>
                    <span className="expo-eyebrow text-cream-muted">AWARDS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== Skills Bento 6 宫格（不对称 · feature 卡更大） ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 relative">
            {skills.map((skill, i) => {
              const isFeature = skill.feature
              const accentColor =
                skill.accent === 'cream' ? '#E8E8E8' :
                skill.accent === 'pop-cyan' ? '#00E0FF' :
                skill.accent === 'pop-magenta' ? '#FF3399' :
                skill.accent === 'pop-yellow' ? '#E9C46A' :
                skill.accent === 'pop-red' ? '#D14D78' : '#E8E8E8'
              const textAccent =
                skill.accent === 'cream' ? 'text-cream' :
                skill.accent === 'pop-cyan' ? 'text-pop-cyan' :
                skill.accent === 'pop-magenta' ? 'text-pop-magenta' :
                skill.accent === 'pop-yellow' ? 'text-pop-yellow' :
                skill.accent === 'pop-red' ? 'text-pop-red' : 'text-cream'

              // Feature 卡（AI Creative）跨 2 列在大屏，突出品红黑底
              const spanCls = isFeature
                ? 'md:col-span-2 lg:col-span-2 row-span-1'
                : 'lg:col-span-1'

              return (
                <motion.div
                  key={skill.no}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.9, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative group overflow-hidden border-b border-r border-cream/18 first:border-l-0 md:odd:border-l-0 md:border-l-cream/18 lg:border-l-cream/18 ${spanCls}`}
                >
                  <div
                    className={`relative py-12 md:py-14 px-7 md:px-10 h-full transition-all duration-500 ${
                      isFeature
                        ? 'bg-void text-cream hover:bg-void-10'
                        : 'bg-void hover:bg-void-10'
                    }`}
                  >
                    {/* 背景大字编号 */}
                    <div
                      className="absolute top-4 right-5 font-display font-black leading-none tracking-warhol-tight select-none pointer-events-none transition-all duration-600 group-hover:-translate-y-2"
                      style={{
                        fontSize: 'clamp(72px,8vw,120px)',
                        color: 'rgba(232,232,232,0.05)',
                      }}
                    >
                      {skill.no}
                    </div>

                    {/* 顶部：icon + 编号 + feature 标 */}
                    <div className="flex items-start justify-between mb-10 relative z-10">
                      <div
                        className={`relative inline-flex items-center justify-center w-14 h-14 overflow-hidden transition-all duration-500 group-hover:rotate-[-6deg]`}
                        style={{
                          background: isFeature ? '#FF3399' : 'transparent',
                          border: `1px solid ${accentColor}55`,
                        }}
                      >
                        <span className={`text-2xl font-display font-black ${isFeature ? 'text-void' : textAccent}`}>
                          {skill.icon}
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="expo-eyebrow text-cream-muted">SKILL</span>
                        {isFeature && (
                          <span
                            className="px-2.5 py-1 font-display font-black text-[10px] tracking-[0.2em] uppercase"
                            style={{ background: '#FF3399', color: '#000' }}
                          >
                            ★ FEATURED
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 标题（大写 Display） */}
                    <h3
                      className={`font-display font-black leading-[1.02] tracking-tight mb-5 transition-colors duration-400 relative z-10 uppercase ${isFeature ? 'text-cream group-hover:text-cream-soft' : 'text-cream group-hover:text-cream-soft'}`}
                      style={{ fontSize: 'clamp(24px,3vw,44px)' }}
                    >
                      {skill.title}
                    </h3>

                    {/* 描述 */}
                    <p className="relative z-10 leading-peach-read text-cream-muted text-sm md:text-base max-w-md">
                      {skill.desc}
                    </p>

                    {/* 底部强调线（强调色） */}
                    <div
                      className="absolute left-0 bottom-0 w-0 h-[3px] group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] z-10"
                      style={{ background: accentColor }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ Design Toolbox · 工具双向跑马灯 ============ */}
      <section
        ref={toolsRef}
        className="relative bg-void overflow-hidden py-18 md:py-24 border-b border-cream/15"
      >
        <div className="max-w-expo mx-auto px-5 md:px-8 mb-12 md:mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={toolsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-display font-black text-cream text-[clamp(32px,4.5vw,56px)] leading-none tracking-warhol-tight">05</span>
                <span className="h-px w-12 bg-cream/50" />
                <span className="expo-eyebrow text-cream-muted">Tools &amp; Software · 设计工具箱</span>
              </div>
              <h3 className="font-display font-black leading-[0.95] tracking-warhol-kerned text-cream uppercase">
                <span className="block text-[clamp(36px,5.8vw,96px)]">Design</span>
                <span
                  className="block text-[clamp(36px,5.8vw,96px)] relative"
                  style={{
                    WebkitTextStroke: '1.5px rgba(232,232,232,0.5)',
                    color: 'transparent',
                  }}
                >
                  Toolbox.
                </span>
              </h3>
            </div>
            <p className="text-cream-muted text-sm md:text-base max-w-md leading-peach-read">
              从 Adobe 系列到 AI 创意工具栈，熟练掌握从视觉产出、交互原型到动效落地的完整专业工具链。
            </p>
          </motion.div>
        </div>

        {/* 跑马灯 A · 正向实心字（Adobe 系列 + 设计工具） */}
        <div className="pop-marquee-wrap border-y border-cream/15 mb-3 bg-void-10/40">
          <div className="pop-marquee animate-pop-marquee py-4 md:py-5">
            {[...marqueeA, ...marqueeA, ...marqueeA].map((t, i) => (
              <span
                key={`a-${i}`}
                className="flex items-center gap-10 font-display font-black text-[clamp(22px,3.2vw,56px)] leading-none tracking-warhol-tight uppercase text-cream whitespace-nowrap"
              >
                {t}
                <span
                  className="inline-block w-2.5 h-2.5 md:w-3 md:h-3 rounded-full"
                  style={{ background: i % 3 === 0 ? '#00E0FF' : i % 3 === 1 ? '#FF3399' : '#E9C46A' }}
                />
              </span>
            ))}
          </div>
        </div>

        {/* 跑马灯 B · 反向空心描边字（AI 系列 + 类别） */}
        <div className="pop-marquee-wrap border-b border-cream/15 bg-void-10/20">
          <div className="pop-marquee animate-pop-marquee-rev py-4 md:py-5">
            {[...marqueeB, ...marqueeB, ...marqueeB].map((t, i) => (
              <span
                key={`b-${i}`}
                className="flex items-center gap-10 font-display font-black text-[clamp(22px,3.2vw,56px)] leading-none tracking-warhol-tight uppercase whitespace-nowrap"
                style={{ WebkitTextStroke: '1.5px rgba(232,232,232,0.55)', color: 'transparent' }}
              >
                {t}
                <span
                  className="inline-block w-2.5 h-2.5 md:w-3 md:h-3 border-2"
                  style={{ borderColor: i % 2 === 0 ? '#FF3399' : '#E9C46A', background: 'transparent' }}
                />
              </span>
            ))}
          </div>
        </div>

        {/* 底部工具胶囊（静态 Pills） */}
        <div className="max-w-expo mx-auto px-5 md:px-8 mt-12 md:mt-16 relative z-10">
          <div className="flex flex-wrap gap-2.5 md:gap-3">
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.04 * i, ease: [0.16, 1, 0.3, 1] }}
                className="group relative inline-flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 border border-cream/25 text-cream text-sm md:text-[13px] font-display font-bold uppercase tracking-widest hover:border-cream/60 hover:text-void hover:bg-cream hover:-translate-y-0.5 transition-all duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-default overflow-hidden"
              >
                <span className="relative z-10">{tool}</span>
                <span
                  className="relative z-10 w-1.5 h-1.5 rounded-full"
                  style={{
                    background:
                      i % 4 === 0 ? '#00E0FF' :
                      i % 4 === 1 ? '#FF3399' :
                      i % 4 === 2 ? '#E9C46A' : '#E8E8E8'
                  }}
                />
              </motion.span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Skills
