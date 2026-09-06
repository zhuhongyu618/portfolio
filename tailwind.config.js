/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '24px',
        sm: '24px',
        lg: '32px',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        /* ===== 粗野字体设计风格 · 黑白灰主色 95% ===== */
        'ink':        '#0A0A0A',   /* 主黑 · 油墨黑 */
        'ink-2':      '#141414',   /* 次黑 · 展厅底 */
        'ink-3':      '#1C1C1C',   /* 深灰 · 卡片底 */
        'ink-4':      '#262626',   /* 中深灰 */
        'concrete':   '#3A3A3A',   /* 水泥灰 */
        'ash':        '#5A5A5A',   /* 灰烬灰 */
        'fog':        '#8A8A8A',   /* 雾灰 */
        'paper':      '#F2EEE5',   /* 牛皮纸米白 · 主前景文字 */
        'paper-2':    '#E8E2D3',   /* 深米色 */
        'paper-3':    '#D9CFB8',   /* 米黄 */
        'bone':       '#C8C2B6',   /* 骨色 */

        /* ===== 极少量撞色 5% · 暗红 / 橙 / 米黄 ===== */
        'blood':      '#C8281C',   /* 印刷暗红 · 印章主色 */
        'blood-deep': '#8E1A12',   /* 暗血红 */
        'rust':       '#B23A1E',   /* 锈红 */
        'marigold':   '#E85D2F',   /* 涂鸦橙 */
        'ochre':      '#D4B896',   /* 米色撞色 */
        'mustard':    '#C9952F',   /* 芥末黄 */

        /* ===== 兼容旧 token · 防止旧组件崩 ===== */
        'void':       '#0A0A0A',
        'void-10':    '#141414',
        'void-20':    '#1C1C1C',
        'void-30':    '#262626',
        'mist':       '#F2EEE5',
        'mist-soft':  '#E8E2D3',
        'mist-muted': '#A6A6A6',
        'mist-deep':  '#8C8C8C',
        'cream':      '#F2EEE5',     /* alias paper */
        'cream-soft':  '#E8E2D3',
        'cream-muted': '#8A8A8A',
        'pop-cyan':   '#5A8FB0',      /* 旧波普色降饱和后保留兼容 */
        'pop-magenta':'#C8281C',      /* alias blood */
        'pop-yellow': '#D4B896',      /* alias ochre */
        'pop-red':    '#C8281C',
        'pop-blue':   '#5A8FB0',
        'pop-hotpink':'#B23A1E',
        'pop-brightyellow':'#C9952F',
        'ink-line':   '#3A3A3A',
      },
      maxWidth: {
        'content': '1200px',
        'expo': '1200px',
        'wide': '1440px',
      },
      spacing: {
        '4.5': '1.125rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
      },
      fontFamily: {
        /* 粗野字体：Archivo Black + JetBrains Mono + Noto Serif 粗体 */
        display: ['"Archivo Black"', '"Cabinet Grotesk"', '"PingFang SC"', '"HarmonyOS Sans SC"', '"Microsoft YaHei"', 'sans-serif'],
        sans:    ['"Inter Tight"', '"PingFang SC"', '"HarmonyOS Sans SC"', '"Noto Sans SC"', '"Microsoft YaHei"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        serif:   ['"Noto Serif SC"', '"Source Han Serif SC"', 'Georgia', 'serif'],
        scrawl:  ['"Caveat"', '"Permanent Marker"', '"Bangers"', 'cursive'],  /* 狂草手写体 */
      },
      fontSize: {
        /* 粗野字体 · 极端字阶 · 巨字海报式排版 */
        'brut-hero':     ['clamp(96px, 22vw, 360px)', { lineHeight: '0.82', letterSpacing: '-0.055em', fontWeight: '900' }],
        'brut-display':  ['clamp(72px, 16vw, 280px)', { lineHeight: '0.84', letterSpacing: '-0.05em', fontWeight: '900' }],
        'brut-title':    ['clamp(56px, 10vw, 200px)', { lineHeight: '0.88', letterSpacing: '-0.045em', fontWeight: '900' }],
        'brut-sub':      ['clamp(36px, 6vw, 120px)', { lineHeight: '0.92', letterSpacing: '-0.035em', fontWeight: '900' }],
        'brut-headline': ['clamp(28px, 4vw, 72px)', { lineHeight: '0.95', letterSpacing: '-0.025em', fontWeight: '900' }],
        'brut-label':    ['clamp(14px, 1.4vw, 20px)',  { lineHeight: '1.2', letterSpacing: '0.04em', fontWeight: '700' }],
        /* 兼容旧 token */
        'warhol-hero':    ['clamp(96px, 22vw, 360px)', { lineHeight: '0.82', letterSpacing: '-0.055em', fontWeight: '900' }],
        'warhol-display': ['clamp(72px, 16vw, 280px)', { lineHeight: '0.84', letterSpacing: '-0.05em', fontWeight: '900' }],
        'warhol-title':   ['clamp(56px, 10vw, 200px)', { lineHeight: '0.88', letterSpacing: '-0.045em', fontWeight: '900' }],
        'warhol-sub':     ['clamp(36px, 6vw, 120px)', { lineHeight: '0.92', letterSpacing: '-0.035em', fontWeight: '900' }],
        'warhol-label':   ['clamp(14px, 1.4vw, 20px)',  { lineHeight: '1.2', letterSpacing: '0.04em', fontWeight: '700' }],
        'h1-display':      ['32px', { lineHeight: '1.25', fontWeight: '600' }],
        'h2-display':      ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'h3-display':      ['20px', { lineHeight: '1.3', fontWeight: '500' }],
        'body-lg':        ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm':        ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-xs':        ['12px', { lineHeight: '1.4', fontWeight: '400' }],
        'peach-body':     ['16px', { lineHeight: '1.72', letterSpacing: '0.02em' }],
        'peach-lead':     ['19px', { lineHeight: '1.75', letterSpacing: '0.01em' }],
        'expo-eyebrow':   ['11px', { lineHeight: '1', letterSpacing: '0.32em', fontWeight: '700' }],
        'expo-meta':      ['12px', { lineHeight: '1.2', letterSpacing: '0.14em', fontWeight: '500' }],
        'ticket-num':     ['clamp(40px, 5vw, 84px)', { lineHeight: '0.9', letterSpacing: '-0.02em', fontWeight: '900' }],
      },
      letterSpacing: {
        'warhol-tight':  '-0.055em',
        'warhol-kerned': '-0.035em',
        'expo-track':     '0.32em',
        'peach-loose':    '0.02em',
        'brut-tight':    '-0.055em',
        'brut-kerned':   '-0.04em',
      },
      lineHeight: {
        'warhol-crunch': '0.82',
        'warhol-tight':  '0.88',
        'peach-read':    '1.72',
        'brut-crunch':  '0.82',
        'brut-tight':   '0.88',
      },
      borderRadius: {
        'card-lg': '16px',
        'card-md': '12px',
        'card-sm': '8px',
        'tag': '4px',
        /* 粗野字体偏好锐利直角 */
        'none': '0',
      },
      boxShadow: {
        /* 粗野字体 · 粗野 offset 阴影 + 撕纸边缘 */
        'brut-press':       '8px 8px 0 0 rgba(242,238,229,1)',     /* 米白 offset */
        'brut-press-blood': '8px 8px 0 0 rgba(200,40,28,1)',       /* 暗红 offset */
        'brut-press-ink':   '10px 10px 0 0 rgba(10,10,10,0.9)',   /* 黑 offset on light */
        'brut-press-marigold': '8px 8px 0 0 rgba(232,93,47,1)',   /* 橙色 offset */
        'brut-press-ochre': '8px 8px 0 0 rgba(212,184,150,1)',    /* 米色 offset */
        /* 兼容旧 */
        'pop-press':     '8px 8px 0 0 rgba(242,238,229,1)',
        'pop-press-mag': '8px 8px 0 0 rgba(200,40,28,1)',
        'pop-press-cyn': '8px 8px 0 0 rgba(90,143,176,1)',
        'frame-outline': '0 0 0 1px rgba(242,238,229,0.2)',
        'halation':      '0 30px 90px -20px rgba(200,40,28,0.22)',
        'card':          '0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.15)',
        'card-hover':    '0 10px 25px -5px rgba(0,0,0,0.35), 0 4px 10px -5px rgba(0,0,0,0.1)',
      },
      backgroundImage: {
        /* 粗野字体 · 涂鸦噪点 + 撕纸边缘 + 泼墨溅 */
        'grain':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        'halftone':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='rgba(242,238,229,0.06)'/%3E%3Ccircle cx='10' cy='6' r='0.7' fill='rgba(242,238,229,0.05)'/%3E%3Ccircle cx='6' cy='12' r='0.9' fill='rgba(242,238,229,0.07)'/%3E%3Ccircle cx='14' cy='14' r='0.6' fill='rgba(242,238,229,0.05)'/%3E%3C/svg%3E\")",
        'scanlines':
          "repeating-linear-gradient(0deg, rgba(242,238,229,0.03) 0px, rgba(242,238,229,0.03) 1px, transparent 1px, transparent 3px)",
        'cream-rise':
          'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(242,238,229,0.08) 100%)',
        'paper-texture':
          "radial-gradient(ellipse at 30% 20%, rgba(216,200,160,0.18) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(180,150,100,0.12) 0%, transparent 50%)",
      },
      animation: {
        'pop-marquee':      'pop-marquee 40s linear infinite',
        'pop-marquee-rev':  'pop-marquee-rev 52s linear infinite',
        'ticker-slow':      'ticker-slow 70s linear infinite',
        'pop-flicker':      'pop-flicker 3.2s ease-in-out infinite',
        'pop-blink':        'pop-blink 1.4s ease-in-out infinite',
        'scan-vertical':    'scan-vertical 9s linear infinite',
        'ticket-tear':      'ticket-tear 1.8s ease-in-out infinite',
        /* 粗野字体 · 抖动 + 撕扯 */
        'brut-shake':       'brut-shake 0.4s ease-in-out infinite',
        'brut-jitter':      'brut-jitter 6s ease-in-out infinite',
        'brut-float':       'brut-float 7s ease-in-out infinite',
        'ink-drip':         'ink-drip 3s ease-in-out infinite',
        'stamp-hit':        'stamp-hit 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        'pop-marquee': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pop-marquee-rev': {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'ticker-slow': {
          '0%':   { transform: 'translateX(3%)' },
          '100%': { transform: 'translateX(-53%)' },
        },
        'pop-flicker': {
          '0%,100%': { opacity: '1' },
          '47%':     { opacity: '1' },
          '48%':     { opacity: '0.3' },
          '49%':     { opacity: '1' },
          '73%':     { opacity: '1' },
          '74%':     { opacity: '0.6' },
          '75%':     { opacity: '1' },
        },
        'pop-blink': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.15', transform: 'scale(1)' },
        },
        'scan-vertical': {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'ticket-tear': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-3px)' },
        },
        /* 粗野字体 · 抖动 */
        'brut-shake': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%':  { transform: 'translate(-1px, 1px) rotate(-0.5deg)' },
          '50%':  { transform: 'translate(1px, -1px) rotate(0.5deg)' },
          '75%':  { transform: 'translate(-1px, -1px) rotate(-0.3deg)' },
        },
        'brut-jitter': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(var(--rot, 0deg))' },
          '50%':  { transform: 'translate(0, -10px) rotate(calc(var(--rot, 0deg) + 4deg))' },
        },
        'brut-float': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(var(--rot, 0deg))' },
          '50%':  { transform: 'translate(0, -10px) rotate(calc(var(--rot, 0deg) + 4deg))' },
        },
        'ink-drip': {
          '0%, 100%': { transform: 'translateY(0) scaleY(1)' },
          '50%':  { transform: 'translateY(2px) scaleY(1.05)' },
        },
        'stamp-hit': {
          '0%':   { transform: 'scale(2) rotate(-12deg)', opacity: '0' },
          '60%':  { transform: 'scale(0.92) rotate(-3deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(-3deg)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
