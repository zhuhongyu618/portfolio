/**
 * 作品集全页面导出为单个 PDF
 * 依次访问：首页 → 作品 → 3 个作品详情 → 关于
 * jspdf / html2canvas 采用动态导入，避免影响首屏加载
 */

const PAGES = [
  { path: '/', title: '首页 · STUDIO' },
  { path: '/works', title: '作品 · ARCHIVE' },
  { path: '/works/original-ip', title: '原创 IP' },
  { path: '/works/art-studio', title: '粒象工作室' },
  { path: '/works/mivox', title: 'Mivox 觅沃' },
  { path: '/about', title: '关于 · ARTIST' },
];

const A4_W = 210; // mm
const A4_H = 297; // mm

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// 等待所有图片加载完成（含失败的图片，避免 Promise 永远 pending）
// 带超时保护：超大图片可能加载很慢，超时后继续截图
function waitForImages(timeoutMs = 20000) {
  const imgs = Array.from(document.querySelectorAll('img'));
  const loadPromises = imgs.map(
    (img) =>
      new Promise((resolve) => {
        if (img.complete) {
          resolve();
        } else {
          img.addEventListener('load', resolve, { once: true });
          img.addEventListener('error', resolve, { once: true });
        }
      })
  );
  const timeout = new Promise((resolve) => setTimeout(resolve, timeoutMs));
  return Promise.race([Promise.all(loadPromises), timeout]);
}

// 滚动到顶部（兼容 Lenis）
function scrollToTopSync() {
  const lenis = window.__lenis;
  if (lenis && typeof lenis.scrollTo === 'function') {
    try { lenis.scrollTo(0, { immediate: true }); } catch (e) {}
  }
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

// 隐藏不希望出现在 PDF 里的浮动元素
function toggleDecorations(hide) {
  const selectors = [
    '.cursor-halo',
    '#brut-cursor-halo',
    '.scroll-progress',
  ];
  selectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      el.style.setProperty('display', hide ? 'none' : '', 'important');
    });
  });
}

// 截图前预处理：强制加载所有懒加载图片 + 让 whileInView 动画元素可见
// 返回一个 cleanup 函数用于恢复
function prepareForCapture() {
  const restored = [];
  const styleTags = [];

  // 1. 强制所有图片加载（移除 lazy）
  document.querySelectorAll('img').forEach((img) => {
    const saved = {
      el: img,
      loading: img.getAttribute('loading'),
    };
    if (saved.loading === 'lazy') {
      img.setAttribute('loading', 'eager');
    }
    const dataSrc = img.getAttribute('data-src') || img.getAttribute('data-lazy-src');
    if (dataSrc && !img.src) {
      img.src = dataSrc;
    }
    restored.push(saved);
  });

  // 2. 注入 CSS 规则强制所有元素可见（覆盖 framer-motion 的 opacity:0）
  // 比遍历所有元素 getComputedStyle 快得多
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    html body * {
      opacity: 1 !important;
      visibility: visible !important;
    }
  `;
  document.head.appendChild(styleEl);
  styleTags.push(styleEl);

  return () => {
    for (const t of styleTags) {
      try { t.parentNode && t.parentNode.removeChild(t); } catch (e) {}
    }
    for (const r of restored) {
      try {
        if (r.loading) r.el.setAttribute('loading', r.loading);
      } catch (e) {}
    }
  };
}

// html2canvas 带超时保护（防止极长页面卡死）
function html2canvasWithTimeout(target, options, timeoutMs = 60000) {
  return Promise.race([
    import('html2canvas').then(({ default: h2c }) => h2c(target, options)),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`html2canvas timeout (${timeoutMs}ms)`)), timeoutMs)
    ),
  ]);
}

// 修复 color-mix() 等现代 CSS 函数不被 html2canvas 支持的问题
// 策略：只删除含 color-mix/oklch/color() 的 CSS 规则
// （跳过逐元素内联样式写入，对长页面性能影响太大）
function fixModernColors(clonedDoc) {
  try {
    for (const sheet of clonedDoc.styleSheets) {
      try {
        const rules = sheet.cssRules;
        if (!rules) continue;
        for (let i = rules.length - 1; i >= 0; i--) {
          const text = rules[i].cssText || '';
          if (text.includes('color-mix') || text.includes('oklch') || /\bcolor\(/.test(text)) {
            sheet.deleteRule(i);
          }
        }
      } catch (e) { /* 跨域样式表跳过 */ }
    }
  } catch (e) {}
}

/**
 * 导出作品集为 PDF
 * @param {Function} navigate - React Router 的 useNavigate 返回值
 * @param {Function} onProgress - (currentIndex, total, title) => void
 */
export async function exportPortfolioPDF(navigate, onProgress) {
  // 动态导入，避免影响首屏
  const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
    import('jspdf'),
    import('html2canvas'),
  ]);

  const pdf = new jsPDF('p', 'mm', 'a4');
  const total = PAGES.length;
  const originalPath = window.location.pathname + window.location.search;

  try {
    for (let i = 0; i < total; i++) {
      const { path, title } = PAGES[i];
      if (onProgress) onProgress(i, total, title);

      // 使用 React Router 导航
      navigate(path);

      // 等待路由切换 + framer-motion 进入动画 + 图片加载
      // AnimatePresence mode="wait" 会先卸载旧页面，需等待新页面挂载
      await wait(2500);
      scrollToTopSync();
      await waitForImages();
      await wait(1200);
      scrollToTopSync();

      // 用 body 截图（#main-content 在某些情况下宽度计算为 0）
      const target = document.body;
      const html = document.documentElement;
      const body = document.body;

      // 强制设置视口宽度（防止路由切换后 innerWidth=0 导致截图失败）
      const viewportW = Math.max(window.innerWidth, 1440);
      const savedHtmlWidth = html.style.width;
      const savedBodyWidth = body.style.width;
      const savedHtmlMinWidth = html.style.minWidth;
      html.style.width = viewportW + 'px';
      html.style.minWidth = viewportW + 'px';
      body.style.width = viewportW + 'px';

      // 等待目标元素有实际尺寸
      let retry = 0;
      while ((target.offsetHeight < 100 || target.offsetWidth < 100) && retry < 20) {
        await wait(300);
        retry++;
      }
      if (target.offsetHeight < 100 || target.offsetWidth < 100) {
        console.warn(`Page ${title} has no visible content (${target.offsetWidth}x${target.offsetHeight}), skipping`);
        html.style.width = savedHtmlWidth;
        html.style.minWidth = savedHtmlMinWidth;
        body.style.width = savedBodyWidth;
        continue;
      }

      toggleDecorations(true);

      // 临时重置 Lenis / transform 干扰
      const savedHtmlTransform = html.style.transform;
      const savedBodyTransform = body.style.transform;
      const savedHtmlOverflow = html.style.overflow;
      const savedBodyOverflow = body.style.overflow;
      html.style.transform = 'none';
      body.style.transform = 'none';
      html.style.overflow = 'visible';
      body.style.overflow = 'visible';

      // 预加载图片 + 强制动画元素可见
      const cleanup = prepareForCapture();
      await waitForImages();
      await wait(800);

      // 根据页面高度动态调整 scale，防止画布尺寸超限/内存溢出
      // 浏览器画布单边最大约 32767px，总面积约 268M px
      // 保守起见限制单边 16384px，减少内存压力
      const targetH = target.offsetHeight;
      let scale = 1.5;
      const maxCanvasDim = 16384;
      if (targetH * scale > maxCanvasDim) {
        scale = Math.floor(maxCanvasDim / targetH * 100) / 100;
        if (scale < 0.4) scale = 0.4;
      }
      console.log(`[PDF] ${title}: target=${target.offsetWidth}x${targetH}, scale=${scale}`);

      let canvas;
      try {
        canvas = await html2canvasWithTimeout(target, {
          scale,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#0A0A0A',
          logging: false,
          windowWidth: viewportW,
          onclone: fixModernColors,
        }, 90000);
      } catch (capErr) {
        console.error(`[PDF] ${title}: capture failed, skipping`, capErr);
        cleanup();
        html.style.transform = savedHtmlTransform;
        body.style.transform = savedBodyTransform;
        html.style.overflow = savedHtmlOverflow;
        body.style.overflow = savedBodyOverflow;
        html.style.width = savedHtmlWidth;
        html.style.minWidth = savedHtmlMinWidth;
        body.style.width = savedBodyWidth;
        toggleDecorations(false);
        continue;
      } finally {
        // cleanup 在 catch 中已调用，这里兜底
      }
      cleanup();

      // 恢复所有样式
      html.style.transform = savedHtmlTransform;
      body.style.transform = savedBodyTransform;
      html.style.overflow = savedHtmlOverflow;
      body.style.overflow = savedBodyOverflow;
      html.style.width = savedHtmlWidth;
      html.style.minWidth = savedHtmlMinWidth;
      body.style.width = savedBodyWidth;

      toggleDecorations(false);

      if (canvas.width === 0 || canvas.height === 0) {
        console.warn(`Page ${title} canvas is empty (${canvas.width}x${canvas.height}), target=${target.offsetWidth}x${target.offsetHeight}, skipping`);
        canvas.width = 0; canvas.height = 0;
        continue;
      }

      const imgW = canvas.width;
      const imgH = canvas.height;
      console.log(`[PDF] ${title}: canvas=${imgW}x${imgH}, slicing into A4 pages`);

      // 按 A4 宽度等比缩放
      const ratio = A4_W / imgW;

      // 长内容分页（第一页由 pdf 初始化时已创建，后续页面按需添加）
      const pagePxHeight = A4_H / ratio; // 每页对应 canvas 像素高度
      let yOffset = 0;
      let sliceCount = 0;

      try {
        while (yOffset < imgH) {
          const slicePxH = Math.min(pagePxHeight, imgH - yOffset);
          const sliceCanvas = document.createElement('canvas');
          sliceCanvas.width = imgW;
          sliceCanvas.height = slicePxH;
          const ctx = sliceCanvas.getContext('2d');
          ctx.drawImage(canvas, 0, yOffset, imgW, slicePxH, 0, 0, imgW, slicePxH);

          const sliceData = sliceCanvas.toDataURL('image/jpeg', 0.7);
          // 第一页(i=0)的第一片(sliceCount=0)不需要 addPage，其余都需要
          if (sliceCount > 0 || i > 0) pdf.addPage();
          pdf.addImage(sliceData, 'JPEG', 0, 0, A4_W, slicePxH * ratio);

          // 释放切片画布内存
          sliceCanvas.width = 0;
          sliceCanvas.height = 0;

          yOffset += slicePxH;
          sliceCount++;
        }
      } catch (sliceErr) {
        console.error(`[PDF] ${title}: slicing failed`, sliceErr);
      }

      // 释放主画布内存
      canvas.width = 0;
      canvas.height = 0;
    }

    // 所有页面处理完毕，保存 PDF
    const pageCount = pdf.getNumberOfPages ? pdf.getNumberOfPages() : 'unknown';
    console.log(`[PDF] All pages processed. PDF pages: ${pageCount}. Saving...`);
    try {
      pdf.save('ZHONGYU-Portfolio-2026.pdf');
      console.log('[PDF] pdf.save() called successfully');
      if (onProgress) onProgress(total, total, '导出完成');
    } catch (saveErr) {
      console.error('[PDF] pdf.save() failed:', saveErr);
      if (onProgress) onProgress(-1, total, '保存失败: ' + saveErr.message);
    }
  } catch (err) {
    console.error('PDF export failed:', err);
    if (onProgress) onProgress(-1, total, '导出失败: ' + err.message);
  } finally {
    // 恢复原始路由
    navigate(originalPath);
    scrollToTopSync();
  }
}
