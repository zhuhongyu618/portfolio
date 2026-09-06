import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import BlurHighlight from '../components/ui/BlurHighlight'
import AccordionGallery from '../components/ui/AccordionGallery'
import { works } from '../data/works'

/* ==========================================================================
   HOME · BRUTALIST TYPE STUDIO · 粗野字体设计风格首页
   Palette: Ink #0A0A0A (95%) · Paper #F2EEE5 (95%) · Blood/Marigold/Ochre <5%
   Module 顺序：
   #hero-brut      → 首屏巨字海报（ZHONGYU 单行巨字 + 中心大图 + 暗红印章 + 撕纸分隔）
   #brut-marquee   → 粗野跑马灯（章节分隔）
   #profile-brut   → 个人简介（巨字标题 + 涂鸦手写体 + BlurHighlight 简介）
   #project-brut   → 项目经历（3 列 brut-poster 海报卡片 · 无图片纯排版）
   #work-brut      → 工作经历（brut-poster 海报卡片 · 含工作内容介绍）
   #works-brut     → 作品简要展示（AccordionGallery + 米白 offset CTA）
   ========================================================================== */

// 3 个实战项目经历（从简历提取）
const projectExps = [
  {
    no: '01',
    title: '深圳前湾公园体感运动游戏设计',
    titleEn: 'Motion-Sensing Sports Game',
    role: '视觉与 UI&UX 设计师',
    period: '2026',
    accent: '#C8281C',       // blood · 暗红
    tape: 'blood',
    summary:
      '为深圳前湾公园打造智慧文旅互动标杆项目，面向亲子家庭与年轻游客群体打造户外体感运动游戏产品，覆盖园区互动大屏、移动端 H5 与网页端多场景。',
    duties: [
      '主导项目全案视觉设计，打造专属游戏 IP 形象，并延展设计角色动作动画、场景特效、宣传视频等系列视觉资产。',
      '负责移动端、网页端全流程界面设计，梳理信息架构与操作路径，针对体感操作特性优化视觉反馈与界面布局。',
      '作为设计侧核心对接人，全程与项目经理、开发团队协同沟通，同步设计标准与交付规范，跟进开发落地全流程。',
      '多轮输出体验优化方案，从视觉呈现、交互手感、游戏节奏、体感反馈等多维度精准把控最终上线品质。',
    ],
  },
  {
    no: '02',
    title: '长沙智谷智能体测设计',
    titleEn: 'Smart Health Testing',
    role: '视觉与 UI&UX 设计师',
    period: '2026',
    accent: '#D4B896',       // ochre · 米色
    tape: 'ochre',
    summary:
      '为长沙智谷产业园区打造智慧健康配套项目，落地一站式自助智能体测终端系统，覆盖体成分、心肺功能、体态评估等多项检测项目。',
    duties: [
      '主导项目全链路视觉与界面设计，搭建统一视觉设计体系，设计专属视觉符号、数据可视化组件与状态反馈元素。',
      '负责人物模拟体测视频与动画设计，制作标准动作演示动画与流程引导短视频，降低用户理解成本。',
      '深度参与交互逻辑搭建与用户体验设计，梳理从注册到结果查看的全流程信息架构，优化终端操作路径与反馈机制。',
      '多轮全流程体验测试，系统性梳理操作痛点与体验断点，总结问题并输出针对性优化方案，把控最终落地品质。',
    ],
  },
  {
    no: '03',
    title: '北京博大公园智能体设计',
    titleEn: 'Park AI Assistant',
    role: '主 UI&UX 设计师',
    period: '2026',
    accent: '#E85D2F',       // marigold · 涂鸦橙
    tape: 'marigold',
    summary:
      '为北京博大公园打造一体化智能服务交互系统，覆盖园区导览、便民服务、运营管理三大场景，通过智能体界面实现游客端与管理端的数字化交互升级。',
    duties: [
      '作为项目主界面设计师，统筹全链路视觉设计工作，主导制定智能体界面的整体视觉风格、组件规范与设计语言。',
      '深度参与交互逻辑搭建，结合公园业务场景与用户动线梳理信息架构，优化智能问答、路线规划等核心功能的交互流程。',
      '担任设计侧对接枢纽，全程与项目经理、前后端团队紧密协作，清晰传递设计意图与交互细节，推动方案高效落地。',
      '跟进开发全流程，配合前端完成界面还原走查，针对技术限制提出设计折中方案，保障最终上线效果符合预期。',
    ],
  },
]

// 2 份工作经历（从简历提取 · 含工作内容介绍）
const workExps = [
  {
    no: '01',
    company: '北京甲板智慧科技有限公司',
    companyEn: 'Beijing Jiabanzhihui Tech',
    role: '视觉设计师 / UI&UX 设计师',
    period: '2026.03 - 2026.07',
    location: '北京',
    accent: '#C8281C',     // blood · 暗红
    tape: 'blood',
    tags: ['智慧园区', '市政公园', '数字化项目'],
    summary:
      '任职期间深度参与智慧园区、市政公园类数字化项目全流程设计工作，覆盖体感互动游戏、智能服务体、自助体测系统、智能导视等多元业务场景。',
    points: [
      '任职期间深度参与智慧园区、市政公园类数字化项目全流程设计工作，覆盖体感互动游戏、智能服务体、自助体测系统、智能导视等多元业务场景。',
      '主导深圳前湾公园体感运动游戏、北京博大公园智能体、长沙智谷智能体测、北小河智能导视界面等项目的视觉与界面设计，输出全套视觉资产并搭建统一设计语言。',
      '深度参与产品交互逻辑搭建，梳理信息架构与用户操作路径，针对不同场景优化交互流程与反馈机制，平衡功能实用性与使用易用性。',
      '作为设计侧核心执行对接人，与项目经理、前后端开发高效协同，参与需求评审、技术评估与排期同步，推动设计方案高效落地。',
    ],
  },
  {
    no: '02',
    company: '青岛游金地文化传媒有限公司',
    companyEn: 'Qingdao Youjindi Media',
    role: '视觉设计师 / UI&UX 设计师',
    period: '2025.08 - 2026.02',
    location: '青岛',
    accent: '#D4B896',     // ochre · 米色
    tape: 'ochre',
    tags: ['品牌数字化', '营销互动', '线上服务'],
    summary:
      '参与公司品牌数字化、营销互动、线上服务类项目的视觉与界面设计全流程，覆盖企业官网、活动专题 H5、小程序、互动展项等多元载体。',
    points: [
      '参与公司品牌数字化、营销互动、线上服务类项目的视觉与界面设计全流程，覆盖企业官网、活动专题 H5、小程序、互动展项等多元载体。',
      '独立负责多项目的视觉与 UI/UX 设计工作，搭建统一的视觉设计体系，输出高保真界面、品牌视觉延展、动效设计等全套设计资产。',
      '针对不同场景的用户使用习惯打磨交互细节，设计清晰的操作反馈与状态指引，降低用户理解成本，提升操作流畅度与体验友好度。',
      '跟进项目测试与上线反馈，主动复盘并系统性总结视觉呈现、交互体验等维度的问题，输出针对性优化方案并推进设计迭代。',
    ],
  },
]

const Home = () => {
  const navigate = useNavigate()
  const heroImgRef = useRef(null)
  const heroSectionRef = useRef(null)

  // 首屏人物：鼠标视差 + 持续浮动 + 入场
  useEffect(() => {
    const img = heroImgRef.current
    const section = heroSectionRef.current
    if (!img || !section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { scale: 0.82, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 1.4, ease: 'expo.out' }
      )
      gsap.to(img, {
        y: '+=18',
        duration: 3.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1.4,
      })
    }, section)

    const xTo = gsap.quickTo(img, 'x', { duration: 0.6, ease: 'power3.out' })
    const yTo = gsap.quickTo(img, 'rotationY', { duration: 0.6, ease: 'power3.out' })
    const rotXTo = gsap.quickTo(img, 'rotationX', { duration: 0.6, ease: 'power3.out' })

    const onMove = (e) => {
      const rect = section.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      xTo(px * 36)
      yTo(px * 8)
      rotXTo(-py * 6)
    }

    section.addEventListener('mousemove', onMove)
    return () => {
      section.removeEventListener('mousemove', onMove)
      ctx.revert()
    }
  }, [])

  return (
    <>
      {/* ============ #hero-brut · 首屏粗野字体海报 ============ */}
      <section
        ref={heroSectionRef}
        id="hero-brut"
        className="relative bg-ink overflow-hidden h-screen"
        style={{ minHeight: '900px', perspective: '1200px' }}
      >
        {/* 粗野网格线背景 */}
        <div className="brut-grid-lines" />

        {/* 暗红泼墨溅点装饰 */}
        <div className="brut-ink-splash brut-ink-splash--blood" style={{ top: '8%', left: '4%', width: '180px', height: '180px' }} />
        <div className="brut-ink-splash brut-ink-splash--ink" style={{ bottom: '10%', right: '6%', width: '220px', height: '220px', opacity: '0.4' }} />

        {/* 巨字背景层 - ZHONGYU 单行海报字 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-[2]">
          <div className="font-display font-black text-paper/8 leading-[0.8] tracking-brut-tight select-none">
            <div className="text-[clamp(100px,18vw,440px)] whitespace-nowrap">ZHONGYU</div>
          </div>
        </div>

        {/* 章节标签 · 顶部刊头 */}
        <div className="absolute top-[7%] left-[5%] z-10 flex items-center gap-4">
          <span className="brut-stamp brut-stamp--blood">EST · 2004</span>
          <span className="brut-label">PORTFOLIO · 2026</span>
        </div>

        {/* 顶部右侧 · 涂鸦手写体 · 大写 */}
        <span className="brut-scrawl absolute top-[8%] right-[6%] z-10 text-[clamp(36px,4vw,56px)] uppercase">
          Designer
        </span>

        {/* 贴纸拼贴层 · 粗野字体风格 */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="./images/stickers/28e1e498fa69282c454b644b36a846d2.png"
            alt=""
            className="absolute w-[110px] md:w-[140px] lg:w-[170px] top-[16%] left-[14%]"
            style={{ transform: 'rotate(-11deg)', filter: 'grayscale(0.5) contrast(1.15) drop-shadow(3px 3px 0 rgba(10,10,10,0.85))' }}
          />
          <img
            src="./images/stickers/12.png"
            alt=""
            className="absolute w-[160px] md:w-[190px] lg:w-[220px] top-[12%] right-[3%]"
            style={{ transform: 'rotate(6deg)', filter: 'grayscale(0.5) contrast(1.15) drop-shadow(3px 3px 0 rgba(10,10,10,0.85))' }}
          />
          <img
            src="./images/stickers/8ab024460deee5eb53ba0521eec2676f.jpg"
            alt=""
            className="absolute w-[120px] md:w-[140px] lg:w-[170px] top-[42%] right-[14%]"
            style={{ transform: 'rotate(-5deg)', filter: 'grayscale(0.4) contrast(1.15) drop-shadow(3px 3px 0 rgba(10,10,10,0.85))' }}
          />
          <img
            src="./images/stickers/3333.png"
            alt=""
            className="absolute w-[100px] md:w-[120px] lg:w-[150px] top-[60%] left-[8%]"
            style={{ transform: 'rotate(10deg)', filter: 'grayscale(0.5) contrast(1.15) drop-shadow(3px 3px 0 rgba(10,10,10,0.85))' }}
          />
          <img
            src="./images/stickers/hungry-eyes.png"
            alt=""
            className="absolute w-[120px] md:w-[150px] lg:w-[180px] top-[58%] right-[6%]"
            style={{ transform: 'rotate(-6deg)', filter: 'grayscale(0.4) contrast(1.15) drop-shadow(3px 3px 0 rgba(10,10,10,0.85))' }}
          />
          <img
            src="./images/stickers/rock-the-musik.png"
            alt=""
            className="absolute w-[110px] md:w-[140px] lg:w-[170px] top-[72%] left-[22%]"
            style={{ transform: 'rotate(8deg)', filter: 'grayscale(0.5) contrast(1.15) drop-shadow(3px 3px 0 rgba(10,10,10,0.85))' }}
          />
          <img
            src="./images/stickers/fb410e848e70634ad0b8954d45be0515.png"
            alt=""
            className="absolute w-[140px] md:w-[170px] lg:w-[200px] bottom-[10%] right-[14%]"
            style={{ transform: 'rotate(-3deg)', filter: 'grayscale(0.5) contrast(1.15) drop-shadow(3px 3px 0 rgba(10,10,10,0.85))' }}
          />
          <img
            src="./images/stickers/087d9fe684005c980e08f2e228b37058.png"
            alt=""
            className="absolute w-[120px] md:w-[150px] lg:w-[180px] top-[18%] right-[8%]"
            style={{ transform: 'rotate(11deg)', filter: 'grayscale(0.5) contrast(1.15) drop-shadow(3px 3px 0 rgba(10,10,10,0.85))' }}
          />
          <img
            src="./images/stickers/0ec6a0373b1462cec4fef67a9a199501.png"
            alt=""
            className="absolute w-[100px] md:w-[130px] lg:w-[160px] bottom-[30%] left-[14%]"
            style={{ transform: 'rotate(-7deg)', filter: 'grayscale(0.5) contrast(1.15) drop-shadow(3px 3px 0 rgba(10,10,10,0.85))' }}
          />
        </div>

        {/* 中心大图 - 鼠标视差 + 浮动入场 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5]">
          <img
            ref={heroImgRef}
            src="./images/hero-center.png"
            alt="ZY STUDIO"
            className="w-auto h-[88vh] max-h-[860px] object-contain"
            style={{
              filter: 'drop-shadow(0 24px 72px rgba(0,0,0,0.55)) contrast(1.08)',
              transformStyle: 'preserve-3d',
              willChange: 'transform, opacity',
            }}
          />
        </div>

        {/* 底部 · 暗红印章 + 滚动提示 */}
        <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
          <span className="brut-stamp brut-stamp--paper">SCROLL TO EXPLORE</span>
          <span className="font-display font-black text-paper/60 text-[11px] tracking-[0.14em] uppercase animate-brut-jitter" style={{ '--rot': '0deg' }}>
            ↓ ↓ ↓
          </span>
        </div>

        {/* 撕纸底部边缘 */}
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-paper z-[8]" />
      </section>

      {/* ============ #brut-marquee · 粗野跑马灯（章节分隔） ============ */}
      <div className="brut-marquee-wrap brut-torn-top brut-torn-bottom">
        <div className="brut-marquee">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="brut-marquee-item">
              <span>ZHONGYU</span>
              <span className="brut-marquee-sep" />
              <span className="brut-marquee-item--blood">VISUAL DESIGNER</span>
              <span className="brut-marquee-sep" />
              <span className="brut-marquee-item--ochre">UI · UX</span>
              <span className="brut-marquee-sep" />
              <span>BRUTALIST TYPE STUDIO</span>
              <span className="brut-marquee-sep" />
              <span className="brut-marquee-item--marigold">EST 2004</span>
              <span className="brut-marquee-sep" />
            </div>
          ))}
        </div>
      </div>

      {/* ============ #profile-brut · 个人简介（滚动后显示） ============ */}
      <section
        id="profile-brut"
        className="relative bg-ink overflow-hidden pt-16 md:pt-24 pb-12 md:pb-16"
      >
        {/* 装饰元素 · 涂鸦大写 */}
        <span className="brut-scrawl absolute top-[10%] right-[8%] text-[clamp(40px,4vw,64px)] uppercase" aria-hidden>
          HELLO.
        </span>
        <div className="brut-ink-splash brut-ink-splash--blood" style={{ top: '20%', left: '2%', width: '120px', height: '120px', opacity: '0.6' }} />

        {/* 贴纸装饰 */}
        <img src="./images/stickers/56d74eb813cc9a3e6871101a3ae63349.png" alt="" aria-hidden className="pop-sticker-img pop-sticker-img--md" style={{ top: '12%', left: '8%', '--rot': '-10deg' }} />
        <img src="./images/stickers/260370f5ff2facbaf832744f88c98d28.png" alt="" aria-hidden className="pop-sticker-img pop-sticker-img--md" style={{ bottom: '14%', right: '5%', '--rot': '7deg', animationDelay: '1.4s' }} />

        <div className="max-w-content mx-auto px-5 md:px-6">
          {/* 顶部刊头 · 粗野字体风格 */}
          <div className="flex items-center gap-6 mb-10 md:mb-14">
            <span className="brut-serial brut-serial--ink">01</span>
            <span className="h-[2px] w-16 md:w-20 bg-paper" />
            <span className="brut-label text-[20px]">个人简介 · PROFILE</span>
          </div>

          {/* BlurHighlight · 个人简介+技能合并为一段话 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="py-6 md:py-10 text-center"
          >
            <BlurHighlight
              text="我是朱泓宇，2004 年生于山东青岛，毕业于华东交通大学理工学院视觉传达设计本科（2022-2026），GPA 3.7/4.0，专业前 10%，辅修英语并通过四级。我熟练使用 Photoshop、Illustrator、Figma、Mastergo、Stitch、Lovart、After Effects、Codex、Trae、Cinema 4D、TouchDesigner、Midjourney 与 Stable Diffusion，专注视觉传达、UI&UX 与生成式设计。作品曾获 G-CROSS、BICC、新加坡金沙艺术设计大赛铜奖及大学生艺术年鉴入围奖。"
              keywords={[
                'Photoshop',
                'Illustrator',
                'Figma',
                'Mastergo',
                'Stitch',
                'Lovart',
                'After Effects',
                'Codex',
                'Trae',
                'Cinema 4D',
                'TouchDesigner',
                'Midjourney',
                'Stable Diffusion',
              ]}
              stagger={0.04}
              blur={10}
            />
          </motion.div>
        </div>
      </section>

      {/* ============ #project-brut · 项目经历（海报卡片形式 · 无图片） ============ */}
      <section
        id="project-brut"
        className="relative bg-ink overflow-hidden py-16 md:py-24 border-t-[3px] border-paper/30"
      >
        {/* 装饰元素 · 涂鸦大写 */}
        <span className="brut-scrawl brut-scrawl--marigold absolute top-[8%] right-[9%] text-[clamp(32px,3vw,48px)] uppercase" aria-hidden>
          PROJECTS.
        </span>
        <div className="brut-ink-splash brut-ink-splash--ink" style={{ bottom: '12%', left: '4%', width: '160px', height: '160px', opacity: '0.45' }} />

        {/* 贴纸装饰 */}
        <img src="./images/stickers/316d76bee77e802de85c892a519e0754.png" alt="" aria-hidden className="pop-sticker-img pop-sticker-img--sm" style={{ top: '10%', left: '4%', '--rot': '8deg' }} />
        <img src="./images/stickers/29d8f90bca9c0debee977814ac2b5d17.png" alt="" aria-hidden className="pop-sticker-img pop-sticker-img--sm" style={{ bottom: '10%', right: '4%', '--rot': '-5deg', animationDelay: '1.0s' }} />

        <div className="max-w-content mx-auto px-5 md:px-6">
          <div className="flex items-center gap-6 mb-12 md:mb-16">
            <span className="brut-serial brut-serial--ink">02</span>
            <span className="h-[2px] w-16 md:w-20 bg-paper" />
            <span className="brut-label text-[20px]">项目经历 · PROJECT EXPERIENCE</span>
          </div>

          {/* 章节巨字标题 */}
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-paper text-[clamp(40px,7vw,120px)] leading-[0.85] tracking-brut-kerned uppercase mb-12 md:mb-16"
          >
            SELECTED
            <span className="block text-blood">WORKS.</span>
          </motion.h2>

          {/* 3 列项目卡片 · brut-poster 海报卡片 · 无图片纯排版 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projectExps.map((p, i) => (
              <motion.article
                key={p.no}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.9, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                className="brut-press-card group relative flex flex-col"
                style={{ boxShadow: `8px 8px 0 0 ${p.accent}` }}
              >
                {/* 胶带装饰 */}
                <span
                  className={`brut-tape brut-tape--${p.tape}`}
                  style={{ top: '-8px', left: '20px', transform: `rotate(${(i % 2 === 0 ? -4 : 4)}deg)` }}
                />

                {/* 海报顶部 · 大序号 + 印章 */}
                <div className="relative p-6 md:p-7 border-b-[2px] border-paper/25 overflow-hidden">
                  {/* 背景装饰色点 */}
                  <div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-[0.12] blur-3xl pointer-events-none transition-all duration-700 group-hover:scale-125"
                    style={{ background: p.accent }}
                  />

                  {/* 大序号 · 双色错位（泼墨感） */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="font-display font-black leading-none tracking-brut-tight select-none"
                      style={{ fontSize: 'clamp(72px, 9vw, 120px)' }}
                    >
                      <span
                        className="block"
                        style={{ color: 'transparent', WebkitTextStroke: `2px ${p.accent}` }}
                      >
                        {p.no}
                      </span>
                    </div>
                    {/* 角色 tag · 撞色印章 */}
                    <span
                      className="px-3 py-1.5 font-display font-black text-[11px] uppercase tracking-[0.14em] text-ink"
                      style={{ background: p.accent, border: '2px solid #0A0A0A', transform: 'rotate(-3deg)' }}
                    >
                      {p.role}
                    </span>
                  </div>

                  {/* 周期标签 */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-display font-black text-paper tabular-nums text-xs">{p.period}</span>
                    <span className="w-2 h-2" style={{ background: p.accent }} />
                    <span className="brut-label text-fog">PROJECT · {p.no}</span>
                  </div>
                </div>

                {/* 海报内容 */}
                <div className="flex flex-col flex-1 p-6 md:p-7">
                  {/* 中文标题 */}
                  <h3 className="font-display font-black text-paper text-[clamp(18px,2vw,26px)] leading-[1.1] tracking-brut-kerned uppercase mb-2 group-hover:text-paper-2 transition-colors duration-400">
                    {p.title}
                  </h3>
                  {/* 英文副标题 · 撞色 */}
                  <p
                    className="font-display font-black text-xs md:text-sm uppercase tracking-brut-kerned mb-5"
                    style={{ color: p.accent }}
                  >
                    {p.titleEn}
                  </p>

                  {/* 简介 */}
                  <p className="leading-peach-read text-fog text-sm mb-5">{p.summary}</p>

                  {/* 工作内容列表 */}
                  <ul className="space-y-2.5 mt-auto">
                    {p.duties.map((d, idx) => (
                      <li key={idx} className="flex gap-3 text-[13px] md:text-sm leading-peach-read text-fog">
                        <span className="flex-shrink-0 mt-1 font-display font-black text-sm leading-none" style={{ color: p.accent }}>
                          ▸
                        </span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ #work-brut · 工作经历（海报卡片形式 · 含工作内容介绍） ============ */}
      <section
        id="work-brut"
        className="relative bg-ink overflow-hidden py-16 md:py-24 border-t-[3px] border-paper/30"
      >
        {/* 装饰元素 · 涂鸦大写 */}
        <span className="brut-scrawl brut-scrawl--paper absolute top-[10%] right-[12%] text-[clamp(40px,4vw,64px)] uppercase" aria-hidden>
          CAREER.
        </span>
        <div className="brut-ink-splash brut-ink-splash--blood" style={{ top: '15%', right: '8%', width: '160px', height: '160px', opacity: '0.5' }} />

        {/* 贴纸装饰 */}
        <img src="./images/stickers/75023c48e584600d0e0d10b871c9b56f.png" alt="" aria-hidden className="pop-sticker-img pop-sticker-img--md" style={{ top: '8%', right: '4%', '--rot': '6deg' }} />
        <img src="./images/stickers/4c433b6b1a0c7c9c3df9127358140cc1.png" alt="" aria-hidden className="pop-sticker-img pop-sticker-img--sm" style={{ bottom: '12%', right: '4%', '--rot': '-8deg', animationDelay: '1.2s' }} />
        <img src="./images/stickers/41ab5b2a351bbf1c27ce30cb3e511a70.png" alt="" aria-hidden className="pop-sticker-img pop-sticker-img--sm" style={{ top: '38%', left: '8%', '--rot': '9deg', animationDelay: '0.6s' }} />

        <div className="max-w-content mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end mb-12 md:mb-16">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-6 mb-8 md:mb-10">
                <span className="brut-serial brut-serial--ink">03</span>
                <span className="h-[2px] w-16 md:w-20 bg-paper" />
                <span className="brut-label text-[20px]">工作经历 · WORK EXPERIENCE</span>
              </div>
              <h2 className="font-display font-black leading-[0.85] tracking-brut-kerned uppercase flex flex-wrap items-baseline gap-x-4">
                <span className="text-paper text-[clamp(40px,7vw,120px)]">CAREER</span>
                <span className="text-blood text-[clamp(40px,7vw,120px)]">HISTORY.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pl-8 lg:border-l-[2px] border-paper/30">
              <p className="brut-label mb-4">智慧文旅 × 品牌传媒</p>
              <p className="leading-peach-read text-fog text-sm md:text-base">
                两份正式工作经历，横跨<strong className="text-paper">智慧园区 / 市政公园数字化</strong>与
                <strong className="text-paper">品牌数字化 / 营销互动</strong>两大业务赛道，
                具备从项目启动到上线交付的完整全流程设计经验。
              </p>
            </div>
          </div>

          {/* 工作经历海报卡片网格 · 含工作内容介绍 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {workExps.map((w, i) => (
              <motion.article
                key={w.no}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.9, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                className="brut-press-card group relative flex flex-col"
                style={{ boxShadow: `10px 10px 0 0 ${w.accent}` }}
              >
                {/* 胶带装饰 */}
                <span
                  className={`brut-tape brut-tape--${w.tape}`}
                  style={{ top: '-8px', right: '24px', transform: `rotate(${(i % 2 === 0 ? 4 : -4)}deg)` }}
                />

                {/* 海报顶部 · 公司名 + 大序号 */}
                <div className="relative p-6 md:p-8 border-b-[2px] border-paper/25 overflow-hidden">
                  {/* 背景装饰色点 */}
                  <div
                    className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-[0.12] blur-3xl pointer-events-none transition-all duration-700 group-hover:scale-125"
                    style={{ background: w.accent }}
                  />

                  {/* 大序号背景 · 双色错位 */}
                  <div
                    className="absolute top-4 right-5 font-display font-black leading-none tracking-brut-tight select-none pointer-events-none"
                    style={{ fontSize: 'clamp(96px, 12vw, 160px)', color: 'transparent', WebkitTextStroke: `2px ${w.accent}` }}
                  >
                    {w.no}
                  </div>

                  {/* 顶部刊头 · 编号 + 地区 */}
                  <div className="relative z-10 flex items-center gap-3 mb-5">
                    <span
                      className="w-10 h-10 flex items-center justify-center font-display font-black text-paper text-sm"
                      style={{ background: w.accent, border: '2px solid #0A0A0A' }}
                    >
                      {w.no}
                    </span>
                    <span className="brut-label text-fog">EXPERIENCE · {w.period}</span>
                    <span className="ml-auto brut-label text-fog">📍 {w.location}</span>
                  </div>

                  {/* 公司中文名 · 巨字 */}
                  <h3 className="relative z-10 font-display font-black text-paper text-[clamp(24px,3vw,40px)] leading-[1.05] tracking-brut-kerned mb-2 group-hover:text-paper-2 transition-colors duration-400 uppercase whitespace-nowrap">
                    {w.company}
                  </h3>
                  {/* 公司英文名 · 撞色 */}
                  <p
                    className="relative z-10 font-display font-black text-xs md:text-sm uppercase tracking-brut-kerned mb-4"
                    style={{ color: w.accent }}
                  >
                    {w.companyEn}
                  </p>

                  {/* 角色 + 标签 */}
                  <div className="relative z-10 flex flex-wrap items-center gap-2.5">
                    <span
                      className="px-3 py-1.5 font-display font-black text-[11px] uppercase tracking-[0.14em] text-ink"
                      style={{ background: w.accent, border: '2px solid #0A0A0A' }}
                    >
                      {w.role}
                    </span>
                    {w.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1.5 border-[2px] border-paper/25 text-fog text-[10px] uppercase tracking-[0.18em] font-display font-bold"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 海报内容 · 工作内容介绍 */}
                <div className="flex flex-col flex-1 p-6 md:p-8">
                  {/* 章节小标题 */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="brut-label text-fog">DUTIES · 工作内容</span>
                    <span className="h-[2px] flex-1 bg-paper/15" />
                  </div>

                  {/* 摘要 */}
                  <p className="leading-peach-read text-fog text-sm mb-6">{w.summary}</p>

                  {/* 工作内容要点列表 */}
                  <ul className="space-y-3 mt-auto">
                    {w.points.map((p, idx) => (
                      <li key={idx} className="flex gap-3 text-sm md:text-base leading-peach-read text-fog">
                        <span
                          className="flex-shrink-0 mt-1 font-display font-black text-sm leading-none"
                          style={{ color: w.accent }}
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  {/* 底部 · CTA 行 */}
                  <div className="mt-6 pt-5 border-t-[2px] border-paper/20 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="brut-label text-fog">TIMELINE</span>
                      <span className="font-display font-black text-paper text-sm tabular-nums">{w.period}</span>
                    </div>
                    <div
                      className="w-10 h-10 flex items-center justify-center transition-transform duration-500 group-hover:rotate-[8deg]"
                      style={{ background: w.accent, border: '2px solid #0A0A0A' }}
                    >
                      <svg className="w-5 h-5 text-paper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ #works-brut · 作品简要展示 ============ */}
      <section
        id="works-brut"
        className="relative bg-ink overflow-hidden py-16 md:py-24 border-t-[3px] border-paper/30"
      >
        {/* 装饰元素 · 涂鸦大写 */}
        <span className="brut-scrawl brut-scrawl--ochre absolute top-[10%] right-[10%] text-[clamp(36px,4vw,56px)] uppercase" aria-hidden>
          ARCHIVE.
        </span>
        <div className="brut-ink-splash brut-ink-splash--blood" style={{ bottom: '8%', left: '4%', width: '140px', height: '140px', opacity: '0.55' }} />

        {/* 贴纸装饰 */}
        <img src="./images/stickers/f011df2900337937b03bb44cd15eb546.png" alt="" aria-hidden className="pop-sticker-img pop-sticker-img--md" style={{ top: '35%', left: '9%', '--rot': '-6deg' }} />
        <img src="./images/stickers/70a38ec76541776780281e4aac56135e.png" alt="" aria-hidden className="pop-sticker-img pop-sticker-img--md" style={{ bottom: '10%', right: '5%', '--rot': '-9deg', animationDelay: '1.6s' }} />
        <img src="./images/stickers/b19a210b746270d85c639f6eff0cf353.png" alt="" aria-hidden className="pop-sticker-img pop-sticker-img--sm" style={{ top: '16%', right: '12%', '--rot': '12deg', animationDelay: '0.4s' }} />

        <div className="max-w-content mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end mb-12 md:mb-16">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-6 mb-8 md:mb-10">
                <span className="brut-serial brut-serial--ink">04</span>
                <span className="h-[2px] w-16 md:w-20 bg-paper" />
                <span className="brut-label text-[20px]">作品简要展示 · PORTFOLIO BRIEF</span>
              </div>
              <h2 className="font-display font-black leading-[0.85] tracking-brut-kerned uppercase flex flex-wrap items-baseline gap-x-4">
                <span className="text-paper text-[clamp(40px,7vw,120px)]">SELECTED</span>
                <span className="relative text-[clamp(40px,7vw,120px)] text-paper">
                  <span
                    className="absolute inset-0 text-paper opacity-[0.07] blur-sm translate-x-2 translate-y-1 select-none"
                    aria-hidden
                  >
                    WORKS.
                  </span>
                  <span className="relative text-blood">WORKS.</span>
                </span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pl-8 lg:border-l-[2px] border-paper/30">
              <p className="leading-peach-read text-fog text-sm md:text-base mb-6">
                三件精选作品完整收录于
                <span className="text-paper font-bold"> 作品档案 </span>
                栏目，点击卡片可跳转查看从设计稿到原稿的完整展示。
              </p>
              <Link
                to="/works"
                className="group inline-flex items-center gap-4 px-7 md:px-8 py-4 md:py-5 bg-transparent text-paper border-[2px] border-paper hover:bg-paper hover:text-ink relative overflow-hidden shadow-brut-press hover:shadow-brut-press-blood hover:-translate-y-1 hover:-translate-x-1 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                <span className="font-display font-black text-xs md:text-sm tracking-[0.28em] uppercase relative z-10">
                  查看全部作品档案
                </span>
                <svg
                  className="relative w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
                <span
                  className="absolute inset-0 -z-10 translate-x-2 translate-y-2 bg-blood pointer-events-none"
                  aria-hidden
                />
              </Link>
            </div>
          </div>

          {/* AccordionGallery 作品手风琴展示 */}
          <AccordionGallery
            items={works.map((work) => ({
              image: work.cover,
              label: work.title,
              link: `/works/${work.id}`,
              alt: work.title,
            }))}
            defaultIndex={0}
            accentColor="#F2EEE5"
            overlayColor="#0A0A0A"
            textColor="#F2EEE5"
            grayscale={true}
            height={520}
            gap={10}
            radius={0}
            expandRatio={0.52}
            duration={0.6}
            ease="power3.out"
            parallax={0.5}
            tilt={8}
            stagger={0.06}
            trigger="hover"
          />
        </div>
      </section>
    </>
  )
}

export default Home
