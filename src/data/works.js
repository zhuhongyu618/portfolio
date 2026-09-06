/* =========================================================
   作品集数据 — 3 个作品严格按用户要求
   统一字段：pageImages（主要页面）·  originalImages（原稿）
   ========================================================= */
export const works = [
  /* ======================================================
     作品 01：原创 IP 视觉与交互设计
     页面：Frame-0 ~ Frame-19（共 20 张，统一高度）
     原稿：原稿1~原稿6（可点击跳转查看原稿，加中文交互提示）
     ====================================================== */
  {
    id: 'original-ip',
    serial: '01',
    title: '原创 IP 视觉与交互设计',
    titleEn: 'Original IP Visual & Interaction Design',
    category: 'ip',
    categoryLabel: '原创 IP',
    year: '2025',
    period: '2025.06 — 2025.12',
    role: '主视觉 / UI & UX 设计师',
    cover: '/images/works/original-ip/Frame-0.jpg',

    // 主要页面：Frame-0 ~ Frame-18（全部按顺序排列，高度统一）
    pageImages: Array.from({ length: 19 }, (_, i) =>
      `/images/works/original-ip/Frame-${i}.jpg`
    ),

    // 原稿：原稿1~原稿6（点击可跳转查看原稿，附中文交互提示）
    originalImages: [
      { src: encodeURI('/images/works/original-ip/原稿1.jpg'), label: '原稿', tip: '点击查看主要界面原稿' },
      { src: encodeURI('/images/works/original-ip/原稿2.jpg'), label: '原稿', tip: '点击查看主要界面原稿' },
      { src: encodeURI('/images/works/original-ip/原稿3.jpg'), label: '原稿', tip: '点击查看主要界面原稿' },
      { src: encodeURI('/images/works/original-ip/原稿4.jpg'), label: '原稿', tip: '点击查看主要界面原稿' },
      { src: encodeURI('/images/works/original-ip/原稿5.jpg'), label: '原稿', tip: '点击查看主要界面原稿' },
      { src: encodeURI('/images/works/original-ip/原稿6.jpg'), label: '原稿', tip: '点击查看主要界面原稿' },
    ],

    // 兼容 WorkCard 等组件
    images: Array.from({ length: 20 }, (_, i) =>
      `/images/works/original-ip/Frame-${i}.jpg`
    ),

    tags: ['原创 IP', '视觉设计', '交互设计', '角色形象'],
    shortDesc: '从角色原型到视觉系统、从交互界面到扩展应用的全链路原创 IP 设计项目，建立完整 IP 世界观与视觉资产库。',
    concept: '以「数字感」与「流行文化」为灵感源泉，打造具有辨识度与延展性的原创 IP 体系，从角色形象、视觉符号到交互界面形成统一语言。',
    description:
      '原创 IP 视觉与交互设计项目，围绕核心角色世界观展开，完成从角色原型设计、三视图构建、视觉系统搭建，到交互界面、海报宣传、周边延展应用等完整视觉资产的输出，形成具备传播力与落地性的完整 IP 设计体系。',
    details: [
      '主导核心 IP 角色原型与三视图设计，建立角色形象规范与表情动作系统，确保跨场景延展性与识别度。',
      '完成主要页面设计，从 IP 落地页、角色介绍、互动场景到延展应用，形成完整视觉叙事。',
      '输出主要界面原稿，可点击跳转查看高保真原稿文件，支持团队评审与开发落地参考。',
      '搭建 IP 视觉系统，包含色彩体系、字体层级、图形语言与装饰元素规范，确保跨载体的视觉一致性。',
    ],
  },

  /* ======================================================
     作品 02：粒象工作室品牌交互设计
     页面：Frame-0 ~ Frame-11（共 12 张，统一高度）
     原稿：Frame-12 ~ Frame-19（共 8 张，点击可跳转查看原稿，附中文交互提示）
     ====================================================== */
  {
    id: 'art-studio',
    serial: '02',
    title: '粒象工作室品牌交互设计',
    titleEn: 'LX Studio Brand Interaction Design',
    category: 'brand',
    categoryLabel: '品牌 & 网页',
    year: '2026',
    period: '2026.06 — 2026.08',
    role: '独立品牌 & 网页 UI/UX 主设计师',
    cover: '/images/works/art-studio/Frame-0.jpg',

    // 主要页面：Frame-0 ~ Frame-14（全部按顺序排列，高度统一）
    pageImages: Array.from({ length: 15 }, (_, i) =>
      `/images/works/art-studio/Frame-${i}.jpg`
    ),

    // 原稿：Frame-15 ~ Frame-22（共 8 张，可点击跳转查看原稿，附中文交互提示）
    originalImages: Array.from({ length: 8 }, (_, i) => {
      const idx = i + 15
      return {
        src: `/images/works/art-studio/Frame-${idx}.jpg`,
        label: `原稿`,
        tip: `点击查看主要界面原稿`,
      }
    }),

    // 兼容 WorkCard 等组件
    images: Array.from({ length: 23 }, (_, i) =>
      `/images/works/art-studio/Frame-${i}.jpg`
    ),

    tags: ['品牌官网', '艺术工作室', '响应式网页', '移动端适配'],
    shortDesc: '为粒象独立艺术工作室打造从品牌气质到双端落地页的完整界面设计，覆盖作品展示、艺术家介绍、预约联系等核心场景。',
    concept: '以「克制与张力并存」为设计核心，用大留白的版式与高对比的文字编排承载艺术作品本身，让界面成为作品的延伸。',
    description:
      '粒象工作室品牌交互设计项目，围绕品牌对外展示与作品集叙事两大核心诉求，完成从品牌气质梳理、视觉语言定义、版式系统搭建，到网页端 + 移动端双端完整落地页设计的全链路输出。涵盖首页主视觉、作品画廊、艺术家简介、关于工作室、联系预约等多个核心页面模块。',
    details: [
      '主导项目整体视觉与品牌基调定义，搭建品牌色彩、字体层级、图形语言与网格系统，让官网语言与作品气质同频。',
      '负责主要页面设计，以不对称杂志式大编排承载作品展示与品牌叙事，建立清晰阅读动线。',
      '输出主要界面原稿，可点击跳转查看高保真原稿文件，支撑开发还原与团队评审。',
      '建立响应式适配规则与组件规范，梳理导航、作品卡片、标题组等核心 UI 元素的多端表现，保证跨设备一致性。',
    ],
  },

  /* ======================================================
     作品 03：Mivox 觅沃产品网页设计
     页面：Frame-0 ~ Frame-7（共 8 张，统一高度）
     原稿：Frame-8（可点击跳转查看原稿，附中文交互提示）
     ====================================================== */
  {
    id: 'mivox',
    serial: '03',
    title: 'Mivox 觅沃产品网页设计',
    titleEn: 'Mivox Product Website Design',
    category: 'ai',
    categoryLabel: 'AI 产品官网',
    year: '2026',
    period: '2026.03 — 2026.04',
    role: '产品官网 UI&UX 主设计师',
    cover: '/images/works/mivox/Frame-0.jpg',

    // 主要页面：Frame-0 ~ Frame-10（全部按顺序排列，高度统一）
    pageImages: Array.from({ length: 11 }, (_, i) =>
      `/images/works/mivox/Frame-${i}.jpg`
    ),

    // 原稿：Frame-11（可点击跳转查看原稿，附中文交互提示）
    originalImages: [
      { src: '/images/works/mivox/Frame-11.jpg', label: '原稿', tip: '点击查看主要界面原稿' },
    ],

    // 兼容 WorkCard 等组件
    images: Array.from({ length: 12 }, (_, i) =>
      `/images/works/mivox/Frame-${i}.jpg`
    ),

    tags: ['AI 产品', '官网落地页', '产品叙事', '响应式'],
    shortDesc: '为 Mivox 觅沃 AI 产品打造从品牌叙事、功能交付到转化入口的完整官网设计，以清晰动线承载产品核心价值。',
    concept: '以「科技感 · 可信赖 · 有温度」为设计基调，通过高反差的版式节奏与产品化视觉语言，将人工智能技术转化为用户可感知的产品价值。',
    description:
      'Mivox 觅沃产品网页设计项目，围绕 AI 产品品牌对外展示与转化获取两大核心目标，完成从品牌叙事架构、视觉语言定义、组件系统搭建到完整落地页设计的全链路输出。包含首页主视觉、产品功能页、解决方案页、关于产品与联系入口等核心模块。',
    details: [
      '主导产品官网整体视觉风格定义，结合 AI 产品属性搭建科技感与可信赖并存的视觉体系，建立品牌识别记忆点。',
      '完成主要页面设计，以产品叙事为线索串联功能展示、案例举证与转化入口，形成清晰转化动线。',
      '输出主要界面原稿，可点击跳转查看高保真原稿文件，支撑开发落地与跨团队评审参考。',
      '搭建响应式组件规范与栅格系统，梳理导航、卡片、CTA 按钮等核心组件多端表现，确保跨设备视觉一致性。',
    ],
  },
]

export const categories = [
  { id: 'all', label: '全部作品' },
  { id: 'ip', label: '原创 IP' },
  { id: 'brand', label: '品牌 & 网页' },
  { id: 'ai', label: 'AI 产品官网' },
]

export const getWorkById = (id) => works.find((w) => w.id === id)

export const getRelatedWorks = (id, limit = 3) =>
  works.filter((w) => w.id !== id).slice(0, limit)
