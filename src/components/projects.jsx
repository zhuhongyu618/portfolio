import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

// ====== Spotlight helper ======
function useSpotlight() {
 const ref = useRef(null)
 const onMove = (e) => {
   const el = ref.current
   if (!el) return
   const r = el.getBoundingClientRect()
   el.style.setProperty('--spot-x', `${((e.clientX - r.left) / r.width) * 100}%`)
   el.style.setProperty('--spot-y', `${((e.clientY - r.top) / r.height) * 100}%`)
 }
 return [ref, onMove]
}

// ====== 3D Tilt wrapper ======
function TiltWrap({ children, className = '', strength = 7 }) {
 const ref = useRef(null)
 const x = useMotionValue(0)
 const y = useMotionValue(0)
 const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.55 })
 const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.55 })
 const rotX = useTransform(sy, [-1, 1], [strength, -strength])
 const rotY = useTransform(sx, [-1, 1], [-strength, strength])
 const onMove = (e) => {
   const el = ref.current
   if (!el) return
   const r = el.getBoundingClientRect()
   x.set(((e.clientX - r.left) / r.width - 0.5) * 2)
   y.set(((e.clientY - r.top) / r.height - 0.5) * 2)
 }
 const onLeave = () => { x.set(0); y.set(0) }
 return (
   <motion.div
     ref={ref}
     onMouseMove={onMove}
     onMouseLeave={onLeave}
     style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', perspective: 1200 }}
     className={className}
   >
     {children}
   </motion.div>
 )
}

const fadeUp = {
 hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
 show: (i = 0) => ({
   opacity: 1,
   y: 0,
   filter: 'blur(0px)',
   transition: {
     duration: 0.9,
     delay: 0.08 * i,
     ease: [0.16, 1, 0.3, 1],
   },
 }),
}

const Projects = () => {
 const [sH, omH] = useSpotlight()

 const projects = [
   {
     id: 1,
     slug: 'ai-creative-design',
     title: 'AI 创意设计',
     role: '视觉与 UI&UX 设计师',
     year: '2026',
     period: '05 — 06',
     tags: ['AI 创意', '视觉系统', '数字产品'],
     description:
       '探索人工智能与视觉设计的深度融合，面向设计师与创意人群打造 AI 辅助创意工作流产品与品牌视觉体系。以先锋的美学表达与人性化的交互逻辑，定义下一代创意工具的视觉语言与使用体验。',
     details: [
       '主导全链路 AI 创意产品视觉体系与界面设计',
       '构建 AI 生成内容的品牌视觉规范与美学原则',
       '结合 Midjourney / Stable Diffusion 打造专属工作流',
       '从 0 到 1 搭建产品交互原型与高保真设计稿',
     ],
   },
   {
     id: 2,
     slug: 'art-studio-website',
     title: '个人独立艺术工作室界面设计',
     role: '主 UI&UX 设计师',
     year: '2026',
     period: '06 — 07',
     tags: ['品牌官网', '艺术气质', '响应式'],
     description:
       '为独立艺术家与创意工作室打造集作品展示、艺术理念传达与作品收藏于一体的品牌数字门户。深度结合艺术工作室的文化语境与当代艺术审美，输出兼具画廊气质与交互趣味的高级响应式界面。',
     details: [
       '独立负责艺术工作室官网全案视觉与界面设计',
       '设计端到端响应式体验：PC / Pad / Mobile 多终端',
       '搭建作品展示、工作室介绍、在线收藏三大核心模块',
       '建立艺术气质的设计系统与动效规范',
     ],
   },
   {
     id: 3,
     slug: 'emotion-voice-agent',
     title: '智能情感语音交互智能体产品界面设计',
     role: '视觉与 UI&UX 设计师',
     year: '2026',
     period: '04 — 05',
     tags: ['智能体产品', '语音交互', '情感化'],
     description:
       '面向家庭与办公场景打造具有情感感知能力的语音交互智能体产品，覆盖手机、平板与智能屏多终端形态。负责智能体从视觉识别、对话界面、情感反馈到多端体验的全链路视觉与交互设计工作。',
     details: [
       '制定语音智能体的整体视觉风格与品牌气质',
       '设计语音对话、情感反馈、系统状态等关键界面',
       '梳理手机 / Pad / 智能屏多端信息架构与交互流程',
       '输出完整设计规范、组件库与动效交付文档',
     ],
   },
 ]

 return (
   <section id="featured-works" className="relative bg-paper-soft">
     {/* ===== Background Layers ===== */}
     <div className="absolute inset-0 -z-0 pointer-events-none">
       <div className="absolute top-1/3 -left-20 w-[40vw] h-[40vw] max-w-[560px] max-h-[560px] rounded-full blur-[120px] opacity-50"
            style={{ background: 'radial-gradient(circle at 30% 30%, rgba(230,86,42,0.22) 0%, transparent 60%)' }} />
       <div className="absolute bottom-1/4 -right-10 w-[36vw] h-[36vw] max-w-[520px] max-h-[520px] rounded-full blur-[110px] opacity-40"
            style={{ background: 'radial-gradient(circle at 70% 60%, rgba(45,91,255,0.18) 0%, transparent 60%)' }} />
       <div className="absolute inset-0 opacity-[0.35] mix-blend-multiply"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.04 0 0 0 0 0.04 0 0 0 0 0.04 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: '240px 240px' }} />
     </div>

     <div className="relative max-w-content mx-auto px-5 md:px-8">
       {/* ===== Header ===== */}
       <div
         ref={sH}
         onMouseMove={omH}
         className="flex flex-col md:flex-row md:items-end justify-between py-20 md:py-24 border-b-2 border-ink-0 gap-8 md:gap-10"
       >
         <div className="relative">
           <motion.div
             initial="hidden"
             whileInView="show"
             viewport={{ once: true, margin: '-10%' }}
             variants={{ show: { transition: { staggerChildren: 0.08 } } }}
           >
             <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10">
               <span className="relative">
                 <span className="font-display font-black text-ink-0 text-3xl md:text-4xl leading-none tracking-tighter-display">
                   02
                 </span>
                 <svg className="absolute -bottom-1.5 -right-5 w-10 h-10 md:w-12 md:h-12 pointer-events-none" viewBox="0 0 48 48" fill="none">
                   <motion.circle
                     cx="24" cy="24" r="21"
                     stroke="#E6562A" strokeWidth="1.5" strokeDasharray="3 5" fill="none"
                     animate={{ rotate: 360 }}
                     transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                     style={{ transformOrigin: '24px 24px' }}
                   />
                 </svg>
               </span>
               <span className="h-px w-12 md:w-16 bg-ink-0 relative overflow-hidden">
                 <span className="absolute inset-0 bg-gradient-to-r from-ink-0 via-ink-0 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }}></span>
               </span>
               <p className="text-ink-0 text-[10px] md:text-xs tracking-[0.3em] uppercase font-display font-black">
                 Selected Works · 精选作品
               </p>
             </motion.div>

             <motion.h2
               variants={fadeUp}
               custom={1}
               className="font-display font-black text-[clamp(56px,9vw,144px)] leading-[0.82] tracking-tighter-display text-ink-0 uppercase"
             >
               Featured
               <br />
               <span className="relative">
                 <span className="absolute inset-0 text-ink-0 blur-md opacity-20 translate-x-1.5 translate-y-2 select-none pointer-events-none" aria-hidden>Projects.</span>
                 <span className="relative text-ink-0">Projects.</span>
               </span>
             </motion.h2>
           </motion.div>
         </div>

         <motion.div
           initial="hidden"
           whileInView="show"
           viewport={{ once: true }}
           variants={fadeUp}
           custom={2}
           className="hidden md:flex items-center gap-3 md:gap-4 text-ink-0 text-sm md:text-base font-display font-bold uppercase tracking-wider pb-1 md:pb-3"
         >
           <span className="relative flex h-2.5 w-2.5">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ink-0 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-ink-0"></span>
           </span>
           <span className="text-ink-0">2026</span>
           <span className="w-10 md:w-12 h-px bg-ink-0"></span>
           <span>03 Projects</span>
         </motion.div>
       </div>

       {/* ===== Project List ===== */}
       <div className="divide-y-2 divide-ink-0">
         {projects.map((project, index) => (
           <ProjectRow key={project.id} project={project} index={index} />
         ))}
       </div>

       {/* ===== Internship Note ===== */}
       <motion.div
         initial="hidden"
         whileInView="show"
         viewport={{ once: true, margin: '-10%' }}
         variants={{ show: { transition: { staggerChildren: 0.08 } } }}
         className="py-20 md:py-24 border-t-2 border-ink-0"
       >
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:gap-16">
           <motion.div variants={fadeUp} custom={0} className="lg:col-span-5 relative">
             {/* Decorative blur */}
             <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-ink-0/15 blur-3xl pointer-events-none" />

             <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 relative">
               <span className="relative">
                 <span className="font-display font-black text-ink-0 text-3xl md:text-4xl leading-none tracking-tighter-display">
                   03
                 </span>
               </span>
               <span className="h-px w-12 md:w-16 bg-ink-0 relative overflow-hidden">
                 <span className="absolute inset-0 bg-gradient-to-r from-ink-0 via-ink-0 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }}></span>
               </span>
               <p className="text-ink-0 text-[10px] md:text-xs tracking-[0.3em] uppercase font-display font-black">
                 Internship · 实习经历
               </p>
             </div>

             <TiltWrap strength={8}>
               <div className="relative p-7 md:p-9 bg-ink-0 text-bg-primary overflow-hidden" style={{ transform: 'translateZ(0)' }}>
                 {/* decorative mesh */}
                 <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-ink-0/25 blur-3xl pointer-events-none" />
                 <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: '200px 200px' }} />

                 <h3 className="font-display font-black text-[clamp(36px,5vw,72px)] tracking-tighter-display uppercase leading-[0.92] relative" style={{ transform: 'translateZ(30px)' }}>
                   北京甲板
                   <br />
                   <span className="relative text-ink-0">智慧科技.</span>
                 </h3>
                 <p className="text-bg-primary/60 text-sm md:text-base mt-5 md:mt-6 font-display font-bold uppercase tracking-[0.15em] relative" style={{ transform: 'translateZ(40px)' }}>
                   视觉设计师 / UI&amp;UX 设计师 · 2026.03 — 07
                 </p>

                 {/* mini stats */}
                 <div className="mt-8 md:mt-10 grid grid-cols-3 gap-4 md:gap-6 relative" style={{ transform: 'translateZ(60px)' }}>
                   <div>
                     <p className="font-display font-black text-2xl md:text-4xl leading-none text-ink-30 tabular-nums">5mo</p>
                     <p className="text-[10px] md:text-xs mt-2 tracking-[0.15em] uppercase text-bg-primary/55 font-display font-bold">Duration</p>
                   </div>
                   <div>
                     <p className="font-display font-black text-2xl md:text-4xl leading-none text-bg-primary tabular-nums">4+</p>
                     <p className="text-[10px] md:text-xs mt-2 tracking-[0.15em] uppercase text-bg-primary/55 font-display font-bold">Projects</p>
                   </div>
                   <div>
                     <p className="font-display font-black text-2xl md:text-4xl leading-none text-[#FFD8B5] tabular-nums">100%</p>
                     <p className="text-[10px] md:text-xs mt-2 tracking-[0.15em] uppercase text-bg-primary/55 font-display font-bold">Delivered</p>
                   </div>
                 </div>
               </div>
             </TiltWrap>
           </motion.div>

           <motion.div
             variants={fadeUp}
             custom={1}
             className="lg:col-span-7 lg:pl-12 lg:border-l-2 border-ink-90"
           >
             <p className="eyebrow text-ink-0 mb-6 md:mb-8">/ About The Experience</p>
             <p className="text-ink-30 text-base md:text-xl leading-relaxed max-w-[60ch]">
               任职期间深度参与<span className="text-ink-0 font-bold"> 智慧园区、市政公园 </span>类数字化项目全流程设计工作，
               覆盖体感互动游戏、智能服务体、自助体测系统、智能导视等多元业务场景，独立负责对应项目的
               <span className="relative text-ink-0 font-bold">视觉风格定义
                 <span className="absolute -bottom-0.5 left-0 h-[2px] w-full bg-ink-0/40"></span>
               </span>、界面设计与交互体验优化。
             </p>

             {/* Role badges */}
             <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
               {[
                 { t: 'Lead Designer', d: '全链路视觉与 UI&UX 主导' },
                 { t: 'Full-stack Delivery', d: '从概念、设计规范到最终落地交付' },
                 { t: 'Multi-terminal', d: '智能屏 / Web / Mobile 多端适配' },
                 { t: 'Cross-team', d: '对接产品、开发与运营团队' },
               ].map((r, i) => (
                 <div key={r.t} className="group relative p-5 md:p-6 bg-paper/50 border-2 border-ink-90 hover:border-ink-0 hover:bg-paper transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden spotlight-card">
                   <span className="absolute top-2 right-3 font-display font-black text-4xl leading-none text-ink-0/[0.06] group-hover:text-ink-0/25 transition-colors duration-700 select-none pointer-events-none">
                     0{i + 1}
                   </span>
                   <p className="text-ink-0 text-xs tracking-[0.2em] uppercase mb-2 md:mb-3 font-display font-black relative">
                     {r.t}
                   </p>
                   <p className="text-ink-30 text-sm md:text-base leading-relaxed relative">{r.d}</p>
                   <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-ink-0 group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]"></span>
                 </div>
               ))}
             </div>
           </motion.div>
         </div>
       </motion.div>
     </div>
   </section>
 )
}

// ==================== Project Row ====================
function ProjectRow({ project, index }) {
 const [sR, omR] = useSpotlight()

 return (
   <motion.article
     ref={sR}
     onMouseMove={omR}
     initial="hidden"
     whileInView="show"
     viewport={{ once: true, margin: '-8%' }}
     variants={{ show: { transition: { staggerChildren: 0.06 } } }}
     className="group py-16 md:py-20 lg:py-24 relative spotlight-card"
     id={`project-${project.id}`}
   >
     {/* subtle top shimmer line when in view */}
     <span className="absolute top-[-2px] left-0 w-full h-[2px] overflow-hidden pointer-events-none">
       <span className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-accent-primary to-transparent"
             style={{ animation: `shimmer 3s linear ${index * 0.4}s infinite`, backgroundSize: '200% 100%' }}></span>
     </span>

     <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:gap-16 items-start">
       {/* ===== Left: Index + Title ===== */}
       <motion.div variants={fadeUp} custom={0} className="lg:col-span-5">
         <div className="flex items-start gap-6 md:gap-8">
           <span className="font-display font-black text-ink-0 text-[clamp(48px,7vw,96px)] leading-none tracking-tighter-display relative">
             {String(index + 1).padStart(2, '0')}
             <span className="absolute -bottom-1 -right-2 w-3 h-3 rounded-full bg-ink-0/20 animate-ping"></span>
           </span>
           <div className="flex-1">
             <Link to={`/works/${project.slug}`} className="block group/title">
               <h3 className="font-display font-black text-[clamp(30px,4vw,60px)] leading-[1.02] text-ink-0 tracking-tighter-display mb-5 md:mb-7 group-hover/title:text-ink-0 transition-colors duration-500 relative inline-block">
                 {project.title}
                 <svg className="absolute -bottom-1 left-0 w-full h-2 pointer-events-none" viewBox="0 0 500 8" fill="none" preserveAspectRatio="none">
                   <motion.path
                     d="M2 5 Q 125 1, 250 4 T 498 3"
                     stroke="#E6562A"
                     strokeWidth="2"
                     strokeLinecap="round"
                     fill="none"
                     initial={{ pathLength: 0, opacity: 0 }}
                     whileInView={{ pathLength: 1, opacity: 1 }}
                     viewport={{ once: true }}
                     transition={{ duration: 1.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                   />
                 </svg>
               </h3>
             </Link>
             <div className="flex flex-wrap items-center gap-3 md:gap-4 text-ink-30 text-sm md:text-base font-medium">
               <span className="uppercase tracking-wider font-display font-bold">{project.role}</span>
               <span className="w-1.5 h-1.5 rounded-full bg-ink-0 flex-shrink-0"></span>
               <span className="font-display font-black text-ink-0 tabular-nums">
                 {project.year}.<span className="text-ink-0">{project.period}</span>
               </span>
             </div>
           </div>
         </div>
       </motion.div>

       {/* ===== Right: Description + Details + CTA ===== */}
       <motion.div variants={fadeUp} custom={1} className="lg:col-span-7 lg:pl-12 lg:border-l-2 border-ink-90">
         <p className="text-ink-30 text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-[62ch]">
           {project.description}
         </p>

         {/* Details list */}
         <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10">
           {project.details.map((detail, i) => (
             <motion.li
               key={i}
               initial={{ opacity: 0, x: -12 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
               className="group/item flex items-start gap-4 md:gap-5 text-ink-0 text-sm md:text-base font-medium relative"
             >
               <span className="font-display font-black text-ink-0 text-xs mt-0.5 flex-shrink-0 relative w-8 h-8 flex items-center justify-center border border-ink-0/30 bg-signal-soft group-hover/item:bg-ink-0 group-hover/item:text-bg-primary group-hover/item:border-ink-0 transition-all duration-400">
                 {String(i + 1).padStart(2, '0')}
               </span>
               <span className="pt-1 leading-relaxed group-hover/item:translate-x-1 transition-transform duration-400">{detail}</span>
             </motion.li>
           ))}
         </ul>

         {/* Tags + CTA row */}
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 md:gap-8">
           <div className="flex flex-wrap gap-2 md:gap-2.5">
             {project.tags.map((tag) => (
               <span
                 key={tag}
                 className="direction-aware-chip relative px-4 md:px-5 py-2 md:py-2.5 bg-paper border-2 border-ink-0 text-ink-0 text-[11px] md:text-xs font-display font-black uppercase tracking-[0.15em] hover:text-bg-primary transition-all duration-500 overflow-hidden cursor-default"
               >
                 <span className="relative z-10">{tag}</span>
                 <span className="absolute inset-0 z-0 bg-ink-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-600 ease-[cubic-bezier(0.77,0,0.175,1)]"></span>
               </span>
             ))}
           </div>

           <Link
             to={`/works/${project.slug}`}
             className="group/cta self-start sm:self-center inline-flex items-center gap-3 md:gap-4 text-ink-0 group-hover/cta:text-ink-0 transition-colors duration-400"
           >
             <span className="font-display font-black text-xs md:text-sm uppercase tracking-[0.22em] relative overflow-hidden">
               View Case Study
               <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-ink-0 group-hover/cta:w-full transition-all duration-600 ease-[cubic-bezier(0.77,0,0.175,1)]"></span>
             </span>
             <span className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-ink-0 group-hover/cta:border-ink-0 group-hover/cta:bg-ink-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
               <svg
                 className="w-4 h-4 md:w-5 md:h-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1 group-hover/cta:text-bg-primary"
                 fill="none"
                 stroke="currentColor"
                 viewBox="0 0 24 24"
               >
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
               </svg>
               {/* ripple fill */}
               <span className="absolute inset-0 bg-ink-0 scale-0 group-hover/cta:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -z-0"></span>
             </span>
           </Link>
         </div>
       </motion.div>
     </div>
   </motion.article>
 )
}

export default Projects