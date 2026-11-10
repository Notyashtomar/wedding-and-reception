import { useEffect, useRef } from 'react'
import config from '../weddingConfig'

const order = ['hero', 'invite', 'wedding', 'venue', 'reception', 'close']
const smooth = (x) => x * x * (3 - 2 * x)
const clamp01 = (x) => Math.max(0, Math.min(1, x))

// Fixed painted backdrops that dissolve into one another as each section scrolls in.
//
// Phones flicker when the GPU runs out of tile memory, so at most four scenes exist at once:
// the one just behind the current scene (for scrolling back), the current one, the one fading
// in, and the next one, shown a whole section early at opacity 0 so it is uploaded long before
// it is needed. Each scene is an <img>, which the browser composites straight from the decoded
// image instead of re-rasterising it at the screen's pixel density.
//
// On touch screens only opacity changes; a scroll-driven transform is applied from script one
// frame behind the finger and reads as shake. Pointer devices also get a slow push-in.
export default function Stage({ sectionRefs, children }) {
  const layers = useRef([])

  // Decode every backdrop up front, while the cover is showing, so no image decode
  // lands in the middle of a scroll.
  useEffect(() => {
    const warm = () => layers.current.forEach((img) => img?.decode?.().catch(() => {}))
    const id = window.requestIdleCallback ? requestIdleCallback(warm, { timeout: 1500 }) : setTimeout(warm, 300)
    return () => (window.cancelIdleCallback ? cancelIdleCallback(id) : clearTimeout(id))
  }, [])

  useEffect(() => {
    const touch = window.matchMedia('(hover: none), (pointer: coarse)').matches
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

    const last = layers.current.map(() => ({ shown: null, o: null, t: null }))
    let ticking = false
    const paint = () => {
      ticking = false
      const y = window.scrollY
      const n = layers.current.length
      const opacity = []
      let current = 0
      for (let i = 0; i < n; i++) {
        opacity[i] = i === 0 ? 1 : smooth(clamp01((y - starts[i]) / span))
        if (opacity[i] >= 1) current = i
      }
      for (let i = 0; i < n; i++) {
        const layer = layers.current[i]
        if (!layer) continue
        const prev = last[i]
        const shown = i >= current - 1 && i <= current + 2
        if (prev.shown !== shown) {
          prev.shown = shown
          layer.style.display = shown ? 'block' : 'none'
        }
        if (!shown) continue
        const o = opacity[i].toFixed(3)
        if (prev.o !== o) {
          prev.o = o
          layer.style.opacity = o
        }
        if (!touch) {
          const p = clamp01((y - starts[i]) / lengths[i])
          const t = `translate3d(0, ${(-1.6 * p).toFixed(2)}%, 0) scale(${(1.03 + 0.08 * p).toFixed(4)})`
          if (prev.t !== t) {
            prev.t = t
            layer.style.transform = t
          }
        }
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
        <img
          key={key}
          ref={(el) => (layers.current[i] = el)}
          className={`layer layer-${key}`}
          src={config.images.backgrounds[key]}
          alt=""
          decoding="async"
          fetchPriority={i === 0 ? 'high' : 'low'}
          style={{ opacity: i === 0 ? 1 : 0, display: i < 3 ? 'block' : 'none' }}
        />
      ))}
      <div className="vignette" />
      {children}
    </div>
  )
}
