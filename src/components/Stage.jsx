import { useEffect, useRef } from 'react'
import config from '../weddingConfig'

const order = ['hero', 'invite', 'wedding', 'venue', 'reception', 'close']
const smooth = (x) => x * x * (3 - 2 * x)
const clamp01 = (x) => Math.max(0, Math.min(1, x))

// Fixed painted backdrops that dissolve into one another as each section scrolls in. Each scene
// also pushes in slowly as its section is scrolled through (a scroll-linked Ken Burns), so the
// camera only moves when the guest does and nothing animates while the page is at rest.
export default function Stage({ sectionRefs, children }) {
  const layers = useRef([])

  // Decode every backdrop up front, while the cover is showing, so no image decode
  // lands in the middle of a scroll.
  useEffect(() => {
    const warm = () =>
      order.forEach((key) => {
        const img = new Image()
        img.src = config.images.backgrounds[key]
        img.decode?.().catch(() => {})
      })
    const id = window.requestIdleCallback ? requestIdleCallback(warm, { timeout: 1500 }) : setTimeout(warm, 300)
    return () => (window.cancelIdleCallback ? cancelIdleCallback(id) : clearTimeout(id))
  }, [])

  useEffect(() => {
    // Layout is measured only on resize, so the per-frame work reads nothing but scrollY.
    let starts = []
    let lengths = []
    let span = 1
    const measure = () => {
      const vh = window.innerHeight
      starts = sectionRefs.current.map((s) => (s ? s.offsetTop - vh * 0.85 : 0))
      lengths = sectionRefs.current.map((s) => (s ? s.offsetHeight + vh : vh))
      span = vh * 0.75
    }

    // Every layer stays composited (never hidden) so the GPU never has to re-rasterise a
    // full-screen image mid-scroll. Only layers that can be seen get new styles, and only
    // opacity and transform ever change.
    const last = []
    let ticking = false
    const paint = () => {
      ticking = false
      const y = window.scrollY
      const n = layers.current.length
      const opacity = []
      for (let i = 0; i < n; i++) opacity[i] = i === 0 ? 1 : smooth(clamp01((y - starts[i]) / span))
      for (let i = 0; i < n; i++) {
        const layer = layers.current[i]
        if (!layer) continue
        const covered = i + 1 < n && opacity[i + 1] >= 1
        const o = covered ? 0 : opacity[i]
        const p = clamp01((y - starts[i]) / lengths[i])
        const t = o > 0 ? `translate3d(0, ${(-1.6 * p).toFixed(2)}%, 0) scale(${(1.03 + 0.09 * p).toFixed(4)})` : last[i]?.t
        const os = o.toFixed(3)
        if (last[i] && last[i].o === os && last[i].t === t) continue
        last[i] = { o: os, t }
        layer.style.opacity = os
        if (t) layer.style.transform = t
      }
    }
    const request = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(paint)
      }
    }
    const remeasure = () => {
      measure()
      request()
    }

    measure()
    paint()
    const ro = new ResizeObserver(remeasure)
    ro.observe(document.body)
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', remeasure)
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', remeasure)
    }
  }, [sectionRefs])

  return (
    <div className="stage" aria-hidden="true">
      {order.map((key, i) => (
        <div
          key={key}
          ref={(el) => (layers.current[i] = el)}
          className={`layer layer-${key}`}
          style={{ backgroundImage: `url(${config.images.backgrounds[key]})`, opacity: i === 0 ? 1 : 0, transform: 'scale(1.03)' }}
        />
      ))}
      <div className="vignette" />
      {children}
    </div>
  )
}
