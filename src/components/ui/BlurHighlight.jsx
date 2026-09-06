import { motion } from 'framer-motion'
import './BlurHighlight.css'

/* ==========================================================================
   BlurHighlight · React Bits Pro "Blur Highlight" 自定义实现
   - 段落文字逐词 blur-in 入场（filter: blur → 0）
   - 关键词自动高亮：彩色色块从左向右扫过（highlight sweep）
   - 关键词颜色循环撞色，呼应全页波普语言
   - 非关键词仅 blur-in，保证长段落可读性
   - 滚动进入视口触发一次（once）
   ========================================================================== */

// 粗野字体设计系统撞色 · 暗红 / 涂鸦橙 / 米色（控制在 5% 以内）
const DEFAULT_COLORS = ['#C8281C', '#E85D2F', '#D4B896', '#C9952F', '#8E1A12']

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const BlurHighlight = ({
  text = '',
  keywords = [],
  className = '',
  baseColor = '#F2EEE5',
  colors = DEFAULT_COLORS,
  stagger = 0.045,
  blur = 10,
}) => {
  // 按关键词切分（保留匹配项为独立 token），关键词按长度降序避免短词抢先匹配
  const sortedKw = [...new Set(keywords)].sort((a, b) => b.length - a.length)
  const pattern = sortedKw.length
    ? new RegExp(`(${sortedKw.map(escapeRegExp).join('|')})`, 'g')
    : null
  const chunks = pattern ? text.split(pattern).filter(Boolean) : [text]

  // 展开为渲染单元：关键词整段高亮，其余按空格拆词
  const units = []
  let colorIdx = 0
  chunks.forEach((chunk, ci) => {
    const isKw = sortedKw.some((k) => k === chunk)
    if (isKw) {
      units.push({ type: 'kw', text: chunk, color: colors[colorIdx % colors.length] })
      colorIdx += 1
    } else {
      // 拆词保留空格
      const parts = chunk.split(/(\s+)/)
      parts.forEach((p) => {
        if (p === '') return
        units.push({ type: p.trim() === '' ? 'space' : 'word', text: p })
      })
    }
  })

  return (
    <p className={`blur-highlight ${className}`} style={{ color: baseColor }}>
      {units.map((u, i) => {
        if (u.type === 'space') {
          return <span key={i} className="blur-highlight__space"> </span>
        }
        if (u.type === 'kw') {
          return (
            <motion.span
              key={i}
              className="blur-highlight__word blur-highlight__word--kw"
              initial={{ opacity: 0.15, filter: `blur(${blur}px)` }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-12%' }}
              transition={{ duration: 0.5, delay: i * stagger, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span
                className="blur-highlight__sweep"
                style={{ background: u.color }}
                initial={{ x: '-100%' }}
                whileInView={{ x: '100%' }}
                viewport={{ once: true, margin: '-12%' }}
                transition={{ duration: 0.6, delay: i * stagger, ease: 'easeInOut' }}
                aria-hidden
              />
              <span className="blur-highlight__text" style={{ color: u.color }}>
                {u.text}
              </span>
            </motion.span>
          )
        }
        return (
          <motion.span
            key={i}
            className="blur-highlight__word"
            initial={{ opacity: 0.15, filter: `blur(${blur}px)` }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: 0.5, delay: i * stagger, ease: [0.16, 1, 0.3, 1] }}
          >
            {u.text}
          </motion.span>
        )
      })}
    </p>
  )
}

export default BlurHighlight
