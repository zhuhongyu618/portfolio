import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/* ==========================================================================
   ABOUT · BRUTALIST TYPE STUDIO · 关于我
   Palette: Ink #0A0A0A (95%) · Paper #F2EEE5 (95%) · Blood/Marigold/Ochre <5%
   模块顺序：
   #about-brut-hero       → 刊头（巨字 ABOUT ME + 暗红印章 + 撕纸边缘 + 涂鸦）
   #about-brut-awards     → 个人获奖经历（暗红印章 + 米色块 + 撕纸卡片）
   #about-brut-advantages → 个人优势（粗野卡片 + 撞色编号 + 涂鸦序号）
   #about-brut-contact    → 个人联系方式（撞色印章卡 + 米色块 + 撕纸边）
   ========================================================================== */

// 5 项国际设计大奖（粗野字体撞色：暗红 / 米色 / 橙色循环，控制在 5% 以内）
const awards = [
  {
    no: '01',
    name: '国青杯 · 全国高校艺术设计大赛 · 一等奖',
    org: '中国人生科学学会艺术教育专业委员会',
    date: '2025',
    tier: '国家级 · 一等奖',
    accent: '#C8281C',     // blood · 暗红
    tape: 'blood',
  },
  {
    no: '02',
    name: 'G-CROSS 创意星球 · 铜奖',
    org: 'G-CROSS 国际创意大奖赛 · Global Creative Cross Awards',
    date: '2025',
    tier: '国际 · 铜奖',
    accent: '#D4B896',     // ochre · 米色
    tape: 'ochre',
  },
  {
    no: '03',
    name: 'BICC 中英国际创意大赛 · 铜奖',
    org: 'BICC · Sino-British International Creative Competition',
    date: '2025',
    tier: '国际 · 铜奖',
    accent: '#E85D2F',     // marigold · 涂鸦橙
    tape: 'marigold',
  },
  {
    no: '04',
    name: '新加坡金沙艺术设计大赛 · 铜奖',
    org: 'Marina Bay Sands Art & Design Competition · 新加坡',
    date: '2025',
    tier: '国际 · 铜奖',
    accent: '#C8281C',     // blood · 暗红（循环）
    tape: 'blood',
  },
  {
    no: '05',
    name: '中国当代大学生艺术作品年鉴 · 入围奖',
    org: '《中国当代大学生艺术作品年鉴》编委会 · 全国评选',
    date: '2025',
    tier: '全国 · 入围奖',
    accent: '#D4B896',     // ochre · 米色（循环）
    tape: 'ochre',
  },
]

// 个人优势 · 四大核心能力画像
const advantages = [
  {
    no: 'I',
    title: '全链路设计能力',
    titleEn: 'Full-Stack Designer',
    accent: '#C8281C',     // blood
    tape: 'blood',
    summary:
      '从品牌视觉到交互界面，从网页落地页到 AI 产品官网，可独立承担从概念提案、视觉系统、组件规范到高保真页面输出的完整全流程设计工作，无需多工种介入即可交付可落地的全案设计方案。',
    points: [
      '品牌视觉 · VI 系统 / IP 角色设计 / 宣传物料',
      '界面 UI / UX · 信息架构 / 交互流程 / 组件库',
      '网页落地页 · 响应式适配 / 产品叙事 / 视觉编排',
      '动效与延展 · AE 动态演示 / 视频分镜 / 场景特效',
    ],
  },
  {
    no: 'II',
    title: '项目落地实战经验',
    titleEn: 'Delivery-Focused',
    accent: '#D4B896',     // ochre
    tape: 'ochre',
    summary:
      '具备真实企业工作背景，深度参与过深圳前湾公园、长沙智谷、北京博大公园等多个市政级项目完整上线流程，熟悉智慧园区、健康终端、智能体系统等复杂业务场景，能够将设计与开发、产品、项目经理协同落地。',
    points: [
      '2 份正式工作 · 累计主导 3+ 个商业项目',
      '熟悉产品评审 / 技术限制 / 排期协同等全流程',
      '可输出从设计走查到折中方案的落地优化策略',
      '擅长针对不同用户群打磨界面手感与反馈机制',
    ],
  },
  {
    no: 'III',
    title: 'AI 工作流深度掌握',
    titleEn: 'AI-Augmented Workflow',
    accent: '#E85D2F',     // marigold
    tape: 'marigold',
    summary:
      '熟用多种 AI 设计工具与工作流，可在保证设计品质的同时显著提升输出速度，从头脑风暴、概念发散、视觉参考生成到产品化辅助均有成熟使用习惯，让设计表达更快速、更有层次感。',
    points: [
      'AIGC 参考生成 · Midjourney / Stable Diffusion / Lovart',
      '设计代码化 · Trae / Stitch / Codex / Peachweb',
      '多端界面交付 · Figma / Mastergo 组件与规范',
      '视觉与动效 · PS / AI / AE / C4D / TouchDesigner',
    ],
  },
  {
    no: 'IV',
    title: '强抗压与沟通协作',
    titleEn: 'Communication & Pressure',
    accent: '#C8281C',     // blood（循环）
    tape: 'blood',
    summary:
      '对设计品质有稳定的高要求，在紧张排期下仍能保持输出节奏与细节把控；善于用清晰的设计表达与非设计背景的项目经理、产品、开发高效沟通，能够承担设计侧核心对接角色推动项目上线。',
    points: [
      '跨团队协作 · 设计侧核心执行人与对接枢纽',
      '可独立主持需求评审、方案汇报与交付同步',
      '英语四级 · 可阅读海外设计趋势与文档',
      '稳定交付 · 多项目并行下的节奏管理能力',
    ],
  },
]

const About = () => {
  return (
    <div className="relative pt-32 md:pt-36 bg-ink min-h-screen overflow-hidden">
      {/* === 全局粗野字体背景装饰 === */}
      <div className="brut-grid-lines opacity-50" />
      <div className="brut-ink-splash brut-ink-splash--blood" style={{ top: '8%', right: '4%', width: '180px', height: '180px', opacity: '0.55' }} />
      <div className="brut-ink-splash brut-ink-splash--ink" style={{ top: '40vh', left: '3%', width: '200px', height: '200px', opacity: '0.4' }} />
      <div className="brut-ink-splash brut-ink-splash--marigold" style={{ bottom: '12%', right: '6%', width: '160px', height: '160px', opacity: '0.4' }} />

      {/* 贴纸拼贴层 · 粗野字体风格 */}
      <img src="/images/stickers/b8fc430775979486ad642ef1bac00b13.png" alt="" aria-hidden className="pop-sticker-img pop-sticker-img--md" style={{ top: '10%', right: '3%', '--rot': '5deg' }} />
      <img src="/images/stickers/e2035fd82e0824520d3e6194285cf3ca.png" alt="" aria-hidden className="pop-sticker-img pop-sticker-img--sm" style={{ top: '42%', left: '8%', '--rot': '-8deg', animationDelay: '1.1s' }} />
      <img src="/images/stickers/e760eb1004e665c15f6b5e47b908534a.png" alt="" aria-hidden className="pop-sticker-img pop-sticker-img--lg" style={{ bottom: '8%', right: '5%', '--rot': '9deg', animationDelay: '1.8s' }} />
      <img src="/images/stickers/ca904055ff770b25d7654e2ad06759e9.png" alt="" aria-hidden className="pop-sticker-img pop-sticker-img--sm" style={{ top: '30%', right: '10%', '--rot': '-6deg', animationDelay: '0.7s' }} />
      <img src="/images/stickers/f77373a3c35e581ccc40eb53393eea76.png" alt="" aria-hidden className="pop-sticker-img pop-sticker-img--sm" style={{ top: '18%', left: '8%', '--rot': '6deg', animationDelay: '0.3s' }} />

      {/* ============ #about-brut-hero · 刊头 ============ */}
      <section id="about-brut-hero" className="max-w-content mx-auto px-5 md:px-6 relative z-10">
        <div className="py-14 md:py-16 border-b-[3px] border-paper/30 brut-torn-bottom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 顶部刊头行 · 印章 + 标签 + 涂鸦 */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-12 md:mb-16">
              <span className="brut-stamp brut-stamp--blood">DESIGNER · 2026</span>
              <span className="brut-label">ABOUT ME · 关于我 / The Designer</span>
              <span className="brut-scrawl brut-scrawl--marigold text-[clamp(28px,3vw,44px)] ml-auto uppercase" aria-hidden>
                WHO AM I?
              </span>
            </div>

            {/* 巨字标题 · 双行错位 ABOUT / ME. */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black leading-[0.82] tracking-brut-kerned uppercase select-none"
            >
              <span className="block text-paper text-[clamp(56px,12vw,200px)]">
                ABOUT
              </span>
              <span className="block relative text-[clamp(56px,12vw,200px)] -mt-[1.5vw]">
                <span
                  className="absolute inset-0 text-paper opacity-[0.06] blur-sm translate-x-3 translate-y-2 select-none"
                  aria-hidden
                >
                  ME.
                </span>
                <span className="relative">
                  <span className="text-blood">ME</span>
                  <span className="text-paper">.</span>
                  <span className="inline-block w-3 h-3 md:w-5 md:h-5 bg-blood align-[0.4em] ml-3 md:ml-5 animate-brut-jitter" style={{ '--rot': '0deg' }} />
                </span>
              </span>
            </motion.h1>

            {/* 描述条 · 巨字序号 + 统计卡 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mt-14 md:mt-18">
              {/* 左：说明 */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-4 mb-6">
                  <span className="brut-serial brut-serial--ink">01</span>
                  <span className="h-[2px] w-16 md:w-20 bg-paper" />
                  <span className="brut-label text-[14px]">INTRO · 章节导读</span>
                </div>
                <p className="leading-peach-read text-fog text-base md:text-lg max-w-3xl mb-6">
                  我是一名<strong className="text-paper">视觉传达设计专业</strong>的毕业生，
                  2026 年 6 月毕业。拥有两段正式工作经历，主导过深圳前湾公园体感游戏、
                  长沙智谷智能体测、北京博大公园智能体等多个真实商业项目的全流程设计。
                </p>
                <p className="leading-peach-read text-fog text-base md:text-lg max-w-3xl">
                  我的作品覆盖<strong className="text-paper">原创 IP 视觉系统</strong>、
                  <strong className="text-paper"> 品牌网页交互设计</strong>、
                  <strong className="text-paper"> AI 产品官网设计</strong>三大方向，
                  既具备品牌视觉的整体系统能力，又熟悉网页与产品界面的全链路落地流程。
                </p>
              </div>

              {/* 右：粗野统计 · 撞色印章卡 */}
              <div className="lg:col-span-5 lg:pl-8 lg:border-l-[2px] border-paper/30">
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {[
                    { num: '05', label: '项国际设计奖项', accent: '#C8281C' },
                    { num: '03', label: '个大型实战项目', accent: '#D4B896' },
                    { num: '02', label: '份正式工作经历', accent: '#E85D2F' },
                    { num: '14', label: '款工具熟练掌握', accent: '#C8281C' },
                  ].map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
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
                        {s.num === '05' || s.num === '14' ? <span className="text-sm">+</span> : null}
                      </p>
                      <p className="brut-label mt-3 text-fog text-[10px] leading-tight">
                        {s.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* 个人宣言 · 撞色印章横幅 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-14 md:mt-18 relative"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="brut-stamp brut-stamp--marigold">STATEMENT</span>
                <span className="brut-label">Designer's Statement · 个人宣言</span>
              </div>
              <div className="relative p-6 md:p-8 border-[2px] border-paper/30 bg-ink-2 brut-torn-top brut-torn-bottom" style={{ boxShadow: '8px 8px 0 0 #C8281C' }}>
                {/* 涂鸦手写体装饰 */}
                <span className="brut-scrawl brut-scrawl--marigold absolute -top-4 right-6 text-[clamp(28px,3vw,40px)] uppercase z-30" aria-hidden>
                  MY CREED.
                </span>
                <p className="font-display font-black leading-[1.15] tracking-brut-kerned text-[clamp(22px,3.4vw,56px)] uppercase mb-6 md:mb-8 text-paper">
                  <span className="text-blood">「</span>
                  做有秩序、有温度、可落地的设计
                  <span className="text-blood">」</span>
                </p>
                <p className="leading-peach-read text-fog text-base md:text-lg max-w-4xl">
                  我相信设计不仅仅是「好看」，而是要把<strong className="text-paper">视觉秩序</strong>、
                  <strong className="text-paper">用户体验</strong>与<strong className="text-paper">技术落地</strong>
                  三者捏合在一起，做到有秩序、有温度、可上线交付。
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============ #about-brut-awards · 个人获奖经历 ============ */}
      <section id="about-brut-awards" className="relative bg-ink overflow-hidden py-14 md:py-16 border-b-[3px] border-paper/30">
        {/* 装饰元素 */}
        <span className="brut-scrawl brut-scrawl--paper absolute top-[8%] right-[10%] text-[clamp(36px,4vw,56px)] uppercase" aria-hidden>
          HONORS.
        </span>
        <div className="brut-ink-splash brut-ink-splash--blood" style={{ bottom: '8%', left: '4%', width: '160px', height: '160px', opacity: '0.5' }} />

        <div className="max-w-content mx-auto px-5 md:px-6 relative z-10">
          {/* 章节刊头 */}
          <div className="flex items-center gap-4 mb-10 md:mb-14">
            <span className="brut-serial brut-serial--ink">02</span>
            <span className="h-[2px] w-16 md:w-20 bg-paper" />
            <div>
              <span className="brut-label text-[14px]">AWARDS &amp; HONORS · 个人获奖经历</span>
              <p className="brut-label text-fog mt-1 text-[12px]">共 {awards.length} 项重要设计奖项 · 国家级 × 国际</p>
            </div>
          </div>

          {/* 巨字标题 */}
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-[clamp(40px,7vw,120px)] leading-[0.85] tracking-brut-kerned text-paper uppercase mb-12 md:mb-16"
          >
            AWARDS<span className="text-blood">.</span>
          </motion.h2>

          {/* 奖项卡片网格 · 粗野字体风格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
            {awards.map((a, i) => (
              <motion.article
                key={a.no}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="brut-press-card group relative h-full"
              >
                {/* 胶带装饰 */}
                <span
                  className={`brut-tape brut-tape--${a.tape}`}
                  style={{ top: '-8px', left: '24px', transform: `rotate(${(i % 2 === 0 ? -4 : 4)}deg)` }}
                />

                <div className="relative h-full p-6 md:p-7 overflow-hidden">
                  {/* 大背景编号 · 双色错位（泼墨感） */}
                  <div
                    className="absolute top-5 right-6 font-display font-black leading-none tracking-brut-tight select-none pointer-events-none opacity-90 group-hover:-translate-y-2 transition-transform duration-600"
                    style={{
                      fontSize: 'clamp(72px, 9vw, 130px)',
                      color: 'transparent',
                      WebkitTextStroke: `2px ${a.accent}`,
                    }}
                  >
                    {a.no}
                  </div>

                  {/* 暗红印章编号 + 等级标签 */}
                  <div className="relative z-10 flex items-center gap-3 mb-6">
                    <span
                      className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center font-display font-black text-xl md:text-2xl text-paper"
                      style={{ background: a.accent, border: '2px solid #0A0A0A' }}
                    >
                      {a.no}
                    </span>
                    <span
                      className="px-3 md:px-3.5 py-1.5 inline-flex items-center text-[10px] md:text-xs font-display font-black uppercase tracking-[0.18em] border-[2px]"
                      style={{ background: `${a.accent}22`, color: a.accent, borderColor: `${a.accent}66` }}
                    >
                      {a.tier}
                    </span>
                  </div>

                  {/* 奖项名称 */}
                  <h3 className="font-display font-black text-paper text-lg md:text-2xl leading-snug tracking-brut-kerned mb-4 relative z-10 group-hover:text-paper-2 transition-colors duration-400 uppercase">
                    {a.name}
                  </h3>

                  {/* 主办单位 */}
                  <p className="brut-label text-fog mb-3 relative z-10 text-[10px]">
                    AWARDED BY · 主办单位
                  </p>
                  <p className="text-paper text-sm md:text-base leading-relaxed mb-5 relative z-10">
                    {a.org}
                  </p>

                  {/* 底部 · 年份 + HONORED 印章 */}
                  <div className="pt-5 mt-5 border-t-[2px] border-paper/20 flex items-center justify-between relative z-10">
                    <span className="font-display font-black text-paper text-sm tabular-nums">{a.date}</span>
                    <span
                      className="brut-stamp"
                      style={{ background: a.accent, color: '#F2EEE5' }}
                    >
                      HONORED
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ #about-brut-advantages · 个人优势 ============ */}
      <section id="about-brut-advantages" className="relative bg-ink overflow-hidden py-14 md:py-16 border-b-[3px] border-paper/30">
        {/* 装饰元素 */}
        <span className="brut-scrawl brut-scrawl--ochre absolute top-[8%] right-[10%] text-[clamp(36px,4vw,56px)] uppercase" aria-hidden>
          STRENGTHS.
        </span>
        <div className="brut-ink-splash brut-ink-splash--ink" style={{ bottom: '10%', right: '4%', width: '180px', height: '180px', opacity: '0.45' }} />
        <img src="/images/stickers/e7e850c14eed0978c1d9b389604acc03.png" alt="" aria-hidden className="pop-sticker-img pop-sticker-img--md" style={{ top: '22%', right: '5%', '--rot': '11deg', animationDelay: '1.5s' }} />
        <span className="brut-scrawl brut-scrawl--marigold absolute bottom-[6%] left-[4%] text-[clamp(36px,4vw,56px)] uppercase" aria-hidden>
          EDGE.
        </span>

        <div className="max-w-content mx-auto px-5 md:px-6 relative z-10">
          {/* 章节刊头 + 巨字标题 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-12 md:mb-16 items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-8 md:mb-10">
                <span className="brut-serial brut-serial--ink">03</span>
                <span className="h-[2px] w-16 md:w-20 bg-paper" />
                <span className="brut-label text-[14px]">STRENGTHS · 个人优势</span>
              </div>
              <motion.h2
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-black leading-[0.85] tracking-brut-kerned uppercase"
              >
                <span className="block text-paper text-[clamp(40px,7vw,120px)]">CORE</span>
                <span className="block text-blood text-[clamp(40px,7vw,120px)] -mt-[1.5vw]">STRENGTHS.</span>
              </motion.h2>
            </div>
            <div className="lg:col-span-5 lg:pl-8 lg:border-l-[2px] border-paper/30">
              <p className="leading-peach-read text-fog text-sm md:text-base">
                四大核心能力画像，从设计输出到项目落地，从 AI 工作流到跨团队沟通，构建了一套相对完整的设计师成长体系。
              </p>
            </div>
          </div>

          {/* 优势卡片网格 · 粗野字体风格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7 lg:gap-8">
            {advantages.map((ad, i) => (
              <motion.article
                key={ad.no}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.95, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="brut-press-card group relative h-full"
                style={{ boxShadow: `8px 8px 0 0 ${ad.accent}` }}
              >
                {/* 胶带装饰 */}
                <span
                  className={`brut-tape brut-tape--${ad.tape}`}
                  style={{ top: '-8px', right: '24px', transform: `rotate(${(i % 2 === 0 ? 4 : -4)}deg)` }}
                />

                <div className="relative h-full p-6 md:p-8 overflow-hidden">
                  {/* 背景装饰色点 · 撞色印章 */}
                  <div
                    className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-[0.15] blur-3xl pointer-events-none transition-all duration-700 group-hover:scale-125"
                    style={{ background: ad.accent }}
                  />

                  {/* 头部 · 罗马数字 + 撞色对勾 */}
                  <div className="flex items-start justify-between gap-5 mb-6 md:mb-7 relative z-10">
                    <div>
                      <p
                        className="font-display font-black leading-none tracking-brut-tight text-paper mb-3 md:mb-4 select-none"
                        style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}
                      >
                        {ad.no}
                      </p>
                      <h3 className="font-display font-black text-paper text-xl md:text-2xl tracking-brut-kerned leading-[1.05] mb-1.5 uppercase">
                        {ad.title}
                      </h3>
                      <p className="font-display font-black uppercase tracking-[0.18em] text-xs md:text-sm" style={{ color: ad.accent }}>
                        {ad.titleEn}
                      </p>
                    </div>
                    <div
                      className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center"
                      style={{
                        background: ad.accent,
                        border: '2px solid #0A0A0A',
                      }}
                    >
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-paper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>

                  {/* 摘要 */}
                  <p className="leading-peach-read text-fog text-sm md:text-base mb-6 md:mb-7 relative z-10">
                    {ad.summary}
                  </p>

                  {/* 要点列表 · 涂鸦三角 */}
                  <ul className="space-y-3 relative z-10">
                    {ad.points.map((p, idx) => (
                      <li key={idx} className="flex gap-3.5 text-sm md:text-base leading-peach-read text-fog">
                        <span className="flex-shrink-0 mt-2 font-display font-black text-sm leading-none" style={{ color: ad.accent }}>
                          ▸
                        </span>
                        <span className="pt-0.5">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ #about-brut-contact · 个人联系方式 ============ */}
      <section
        id="about-brut-contact"
        className="relative py-14 md:py-16 overflow-hidden"
      >
        {/* 装饰元素 */}
        <span className="brut-scrawl brut-scrawl--marigold absolute top-[8%] right-[10%] text-[clamp(40px,4vw,64px)] uppercase" aria-hidden>
          LET'S TALK.
        </span>
        <div className="brut-ink-splash brut-ink-splash--blood" style={{ bottom: '10%', left: '4%', width: '180px', height: '180px', opacity: '0.5' }} />

        <div className="max-w-content mx-auto px-5 md:px-6 relative z-10">
          {/* 章节刊头 */}
          <div className="flex items-center gap-4 mb-10 md:mb-14">
            <span className="brut-serial brut-serial--ink">04</span>
            <span className="h-[2px] w-16 md:w-20 bg-paper" />
            <div>
              <span className="brut-label text-[14px]">CONTACT · 个人联系方式</span>
              <p className="brut-label text-fog mt-1 text-[12px]">随时欢迎交流设计、项目合作与工作机会</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10">
            {/* 左：巨字招呼 + CTA + 信息卡 */}
            <div className="lg:col-span-7">
              {/* 巨字招呼 */}
              <motion.h2
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-black text-[clamp(40px,8vw,136px)] leading-[0.88] tracking-brut-kerned uppercase text-paper mb-8 md:mb-10"
              >
                <span className="block">LET'S</span>
                <span className="block relative">
                  <span
                    className="absolute inset-0 text-paper opacity-[0.08] blur-sm translate-x-3 translate-y-2 select-none"
                    aria-hidden
                  >
                    TALK.
                  </span>
                  <span className="relative">
                    <span className="text-blood">TALK</span>
                    <span className="text-paper">.</span>
                  </span>
                </span>
              </motion.h2>

              <p className="leading-peach-read text-fog text-base md:text-lg mb-8 md:mb-10 max-w-3xl">
                不论是<strong className="text-paper">设计岗位 / 工作机会</strong>，
                还是<strong className="text-paper">自由设计合作 / 项目交流 / 作品集反馈</strong>，
                都欢迎随时与我联系。我会在 24 小时内回复邮件与消息。
              </p>

              {/* CTA · 米白按钮 + 暗红 offset */}
              <Link
                to="/works"
                className="group inline-flex items-center gap-4 px-7 md:px-9 py-4 md:py-5 bg-paper text-ink relative overflow-hidden shadow-brut-press-blood hover:-translate-y-1 hover:-translate-x-1 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] mb-8 md:mb-10"
              >
                <span className="font-display font-black text-xs md:text-sm tracking-[0.28em] uppercase relative z-10">
                  浏览我的作品集
                </span>
                <svg
                  className="relative w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span className="absolute inset-0 -z-10 translate-x-2 translate-y-2 bg-blood pointer-events-none" aria-hidden />
              </Link>

              {/* 信息卡 · 米色块 + 暗红印章 */}
              <div className="grid grid-cols-2 gap-4 md:gap-5">
                <div
                  className="relative p-5 border-[2px] border-paper/30 bg-ink-2"
                  style={{ boxShadow: '6px 6px 0 0 #D4B896' }}
                >
                  <span
                    className="absolute -top-2 -right-2 px-2 py-1 font-mono font-bold text-[9px] tracking-[0.2em] uppercase text-ink"
                    style={{ background: '#D4B896', border: '2px solid #0A0A0A', transform: 'rotate(-6deg)' }}
                  >
                    N°01
                  </span>
                  <p className="brut-label text-fog mb-2 text-[9px]">LOCATION · 现居城市</p>
                  <p className="font-display font-black text-paper text-xl md:text-2xl leading-none uppercase">青岛</p>
                  <p className="mt-2 text-fog text-xs font-mono">Shandong · China</p>
                </div>
                <div
                  className="relative p-5 border-[2px] border-paper/30 bg-ink-2"
                  style={{ boxShadow: '6px 6px 0 0 #C8281C' }}
                >
                  <span
                    className="absolute -top-2 -right-2 px-2 py-1 font-mono font-bold text-[9px] tracking-[0.2em] uppercase text-paper"
                    style={{ background: '#C8281C', border: '2px solid #0A0A0A', transform: 'rotate(-6deg)' }}
                  >
                    N°02
                  </span>
                  <p className="brut-label text-fog mb-2 text-[9px]">AVAILABILITY · 入职时间</p>
                  <p className="font-display font-black text-paper text-xl md:text-2xl leading-none uppercase">随时到岗</p>
                  <p className="mt-2 text-fog text-xs font-mono">Full Time · 全职岗位</p>
                </div>
              </div>
            </div>

            {/* 右：联系卡组 · 三张粗野字体撞色卡 */}
            <div className="lg:col-span-5 flex flex-col gap-4 md:gap-6">
              {/* 邮箱卡 · 暗红底 + 米白 offset */}
              <motion.a
                href="mailto:3112516515@qq.com"
                whileHover={{ y: -6, x: -6 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                className="group relative p-6 md:p-7 border-[2px] cursor-pointer overflow-hidden"
                style={{
                  background: '#C8281C',
                  borderColor: '#0A0A0A',
                  boxShadow: '12px 12px 0 0 #F2EEE5',
                }}
              >
                {/* 撕纸顶部边缘 */}
                <div className="brut-torn-top absolute inset-x-0 top-0 h-3" />
                {/* 粗野网点叠加 */}
                <div className="brut-halftone opacity-30" />

                <div className="relative z-10 flex items-start justify-between mb-5 md:mb-6">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono font-bold text-xs md:text-sm text-paper/80 tracking-[0.2em] uppercase">
                      01 · EMAIL
                    </span>
                    <span className="font-display font-black text-lg md:text-xl leading-none text-paper uppercase">邮箱联系</span>
                  </div>
                  <div className="w-11 h-11 md:w-12 md:h-12 bg-paper text-ink flex items-center justify-center group-hover:rotate-[-8deg] transition-transform duration-500 border-[2px] border-ink">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <p className="relative z-10 font-display font-black break-all leading-none text-paper text-[clamp(16px,2.6vw,28px)] tracking-brut-kerned mb-3 md:mb-4">
                  3112516515@qq.com
                </p>
                <div className="relative z-10 flex items-center justify-between pt-4 md:pt-5 border-t-[2px] border-paper/25">
                  <span className="font-display font-black text-[10px] md:text-xs tracking-[0.22em] uppercase text-paper">
                    点击发送邮件 · SEND MAIL
                  </span>
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-paper group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </motion.a>

              {/* 电话卡 · 米色底 + 暗红 offset */}
              <motion.a
                href="tel:13668862258"
                whileHover={{ y: -6, x: -6 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                className="group relative p-6 md:p-7 border-[2px] cursor-pointer overflow-hidden"
                style={{
                  background: '#D4B896',
                  borderColor: '#0A0A0A',
                  boxShadow: '12px 12px 0 0 #C8281C',
                }}
              >
                {/* 撕纸底部边缘 */}
                <div className="brut-torn-bottom absolute inset-x-0 bottom-0 h-3" />

                <div className="relative z-10 flex items-start justify-between mb-5 md:mb-6">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono font-bold text-xs md:text-sm text-ink/70 tracking-[0.2em] uppercase">
                      02 · PHONE
                    </span>
                    <span className="font-display font-black text-lg md:text-xl leading-none text-ink uppercase">电话联系</span>
                  </div>
                  <div className="w-11 h-11 md:w-12 md:h-12 bg-ink text-paper flex items-center justify-center group-hover:rotate-[8deg] transition-transform duration-500 border-[2px] border-paper">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 5a2 2 0 012-2h2l2 5-2 1a12 12 0 006 6l1-2 5 2v2a2 2 0 01-2 2A16 16 0 013 5z" />
                    </svg>
                  </div>
                </div>
                <p className="font-display font-black leading-none text-ink text-[clamp(18px,3vw,32px)] tracking-brut-kerned mb-3 md:mb-4">
                  136 · 6886 · 2258
                </p>
                <div className="flex items-center justify-between pt-4 md:pt-5 border-t-[2px] border-ink/20">
                  <span className="font-display font-black text-[10px] md:text-xs tracking-[0.22em] uppercase text-ink">
                    点击直接拨打 · CALL ME
                  </span>
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-ink group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </motion.a>

              {/* 通用信息卡 · 米白底 + 暗红 offset */}
              <motion.div
                whileHover={{ y: -6, x: -6 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                className="group relative p-6 md:p-7 border-[2px] border-solid overflow-hidden text-ink"
                style={{
                  background: '#F2EEE5',
                  borderColor: '#0A0A0A',
                  boxShadow: '12px 12px 0 0 #C8281C',
                }}
              >
                {/* 撕纸顶部边缘 */}
                <div className="brut-torn-top absolute inset-x-0 top-0 h-3" />
                {/* 粗野网点叠加 */}
                <div className="brut-halftone opacity-25" />

                <div className="relative z-10 flex items-start justify-between mb-5 md:mb-6">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono font-bold text-xs md:text-sm text-ink/70 tracking-[0.2em] uppercase">
                      03 · SOCIAL / INFO
                    </span>
                    <span className="font-display font-black text-lg md:text-xl leading-none text-ink uppercase">更多信息</span>
                  </div>
                  <div className="w-11 h-11 md:w-12 md:h-12 bg-blood text-paper flex items-center justify-center group-hover:rotate-[-8deg] transition-transform duration-500 border-[2px] border-ink">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="relative z-10 space-y-3 md:space-y-4">
                  <InfoRow label="姓名" value="朱泓宇" />
                  <InfoRow label="出生年月" value="2004 年 06 月" />
                  <InfoRow label="学校 / 专业" value="华东交通大学理工学院 · 视觉传达设计（本科）" />
                  <InfoRow label="毕业时间" value="2026 年 06 月" />
                  <InfoRow label="求职意向" value="UI / UX 设计师 · 交互设计师 · 视觉设计师" />
                  <InfoRow label="可到岗时间" value="随时到岗 · 全职岗位" />
                </div>
                <div className="relative z-10 mt-5 md:mt-6 pt-4 md:pt-5 border-t-[2px] border-ink/20">
                  <p className="font-display font-black text-[10px] md:text-xs tracking-[0.2em] uppercase text-ink leading-relaxed">
                    可随时通过以上任意方式联系 · 24 HOURS RESPONSE
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 底部撕纸分隔 */}
      <div className="brut-torn-top relative h-3 bg-paper" />
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="grid grid-cols-[6rem_1fr] items-start gap-3 md:gap-4 text-ink">
      <span className="font-mono font-bold text-[10px] md:text-xs tracking-[0.18em] uppercase pt-1 text-ink/70">
        {label}
      </span>
      <span className="font-display font-bold text-sm md:text-base leading-snug break-words">{value}</span>
    </div>
  )
}

export default About
