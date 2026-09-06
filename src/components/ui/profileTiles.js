const svgTile = (bg, label, value, desc = '', icon = '') => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="264" viewBox="0 0 400 264">
    <rect width="400" height="264" fill="${bg}"/>
    <rect width="400" height="264" fill="url(#g)"/>
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="rgba(255,255,255,0.08)"/>
        <stop offset="100%" stop-color="rgba(20,20,20,0.15)"/>
      </linearGradient>
    </defs>
    <circle cx="360" cy="30" r="50" fill="rgba(255,255,255,0.06)"/>
    <circle cx="40" cy="240" r="60" fill="rgba(20,20,20,0.08)"/>
  </svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

const svgStatTile = (bg, num, unit, label) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="264" viewBox="0 0 400 264">
    <rect width="400" height="264" fill="${bg}"/>
    <rect width="400" height="264" fill="url(#g)"/>
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="rgba(255,255,255,0.06)"/>
        <stop offset="100%" stop-color="rgba(20,20,20,0.12)"/>
      </linearGradient>
    </defs>
    <circle cx="340" cy="200" r="80" fill="rgba(255,255,255,0.04)"/>
    <text x="200" y="120" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="72" font-weight="900" fill="#fff" opacity="0.18">${num}</text>
  </svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export const profileTiles = [
  {
    image: svgTile('rgba(0,224,255, 1)', '邮箱 · Email', '3112516515@qq.com', '', '✉'),
    title: '邮箱',
    subtitle: { label: '邮箱 · EMAIL', value: '3112516515@qq.com' },
  },
  {
    image: svgTile('rgba(255,51,153, 1)', '电话 · Phone', '136 6886 2258', '', '☎'),
    title: '电话',
    subtitle: { label: '电话 · PHONE', value: '136 6886 2258' },
  },
  {
    image: svgTile('rgba(233,196,106, 1)', '现居 · Location', '山东 · 青岛', '', '◉'),
    title: '现居',
    subtitle: { label: '现居 · LOCATION', value: '山东 · 青岛' },
  },
  {
    image: svgTile('rgba(232,232,232, 1)', '出生年月 · Birth', '2004 年 06 月', '', '◇'),
    title: '出生',
    subtitle: { label: '出生年月 · BIRTH', value: '2004 年 06 月' },
  },
  {
    image: svgTile('rgba(230, 42, 27, 1)', '专业 · Major', '视觉传达设计 · 本科', '', '◎'),
    title: '专业',
    subtitle: { label: '专业 · MAJOR', value: '视觉传达设计 · 本科' },
  },
  {
    image: svgTile('rgba(0,224,255, 1)', '毕业时间 · Graduation', '2026 年 06 月', '', '◑'),
    title: '毕业',
    subtitle: { label: '毕业时间 · GRADUATION', value: '2026 年 06 月' },
  },
  {
    image: svgTile('rgba(10, 10, 10, 1)', '教育背景', '华东交通大学理工学院', '2022.09 – 2026.06 · GPA 3.7/4.0 · Top 10%'),
    title: '教育背景',
    subtitle: { label: '教育背景 · EDUCATION', value: '华东交通大学理工学院', desc: '2022.09 – 2026.06 · GPA 3.7/4.0' },
  },
  {
    image: svgStatTile('rgba(255,51,153, 1)', '05+', '项', '国际设计大奖'),
    title: '05+ 项国际设计大奖',
    subtitle: { label: '统计 · STATS', value: '05+ 项', desc: '国际设计大奖' },
  },
  {
    image: svgStatTile('rgba(0,224,255, 1)', '03+', '项', '实战项目'),
    title: '03+ 项实战项目',
    subtitle: { label: '统计 · STATS', value: '03+ 项', desc: '实战项目' },
  },
  {
    image: svgStatTile('rgba(233,196,106, 1)', '12+', '款', '设计工具熟练'),
    title: '12+ 款设计工具',
    subtitle: { label: '统计 · STATS', value: '12+ 款', desc: '设计工具熟练' },
  },
  {
    image: svgStatTile('rgba(230, 42, 27, 1)', '02', '份', '工作经历'),
    title: '02 份工作经历',
    subtitle: { label: '统计 · STATS', value: '02 份', desc: '工作经历' },
  },
  {
    image: svgTile('rgba(0,224,255, 1)', '技能', 'Photoshop · Illustrator · Figma', ''),
    title: '技能栈 1',
    subtitle: { label: '技能 · SKILLS', value: 'PS · AI · Figma' },
  },
  {
    image: svgTile('rgba(255,51,153, 1)', '技能', 'AE · Cinema 4D · TouchDesigner', ''),
    title: '技能栈 2',
    subtitle: { label: '技能 · SKILLS', value: 'AE · C4D · TouchDesigner' },
  },
  {
    image: svgTile('rgba(233,196,106, 1)', '技能', 'Stitch · Lovart · Midjourney', ''),
    title: '技能栈 3',
    subtitle: { label: '技能 · SKILLS', value: 'Stitch · Lovart · MJ' },
  },
  {
    image: svgTile('rgba(232,232,232, 1)', '技能', 'Trae · SD · 英语四级', ''),
    title: '技能栈 4',
    subtitle: { label: '技能 · SKILLS', value: 'Trae · SD · CET-4' },
  },
]
