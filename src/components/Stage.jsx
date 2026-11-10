import { useEffect, useRef } from 'react'
import config from '../weddingConfig'

const order = ['hero', 'invite', 'wedding', 'venue', 'reception', 'close']
const smooth = (x) => x * x * (3 - 2 * x)

// Fixed painted backdrops that dissolve into one another as each section scrolls in, with a
// slow upward drift across the whole page and a Ken Burns push on whichever scene is showing.
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
    let span = 1
    let maxScroll = 1
    const measure = () => {
      const vh = window.innerHeight
      starts = sectionRefs.current.map((s) => (s ? s.offsetTop - vh * 0.85 : 0))
      span = vh * 0.75
      maxScroll = document.documentElement.scrollHeight - vh || 1
    }

    // Every layer stays composited (never hidden) so the GPU never has to re-rasterise a
    // full-screen image mid-scroll; only opacity and transform change, and only when they differ.
    // The Ken Burns animation runs only on layers that can actually be seen.
    const last = []
    const lastLive = []
    let ticking = false
    const paint = () => {
      ticking = false
      const y = window.scrollY
      const drift = `translate3d(0, ${(Math.min(1, y / maxScroll) * -1.5).toFixed(2)}%, 0) scale(1.03)`
      const opacities = layers.current.map((_, i) =>
        i === 0 ? 1 : smooth(Math.max(0, Math.min(1, (y - starts[i]) / span))),
      )
      layers.current.forEach((layer, i) => {
        if (!layer) return
        const o = opacities[i].toFixed(3)
        const live = opacities[i] > 0 && !(opacities[i + 1] >= 1)
        if (lastLive[i] !== live) {
          lastLive[i] = live
          layer.classList.toggle('live', live)
        }
        const key = o + drift
        if (last[i] === key) return
        last[i] = key
        layer.style.opacity = o
        layer.style.transform = drift
      })
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
        <div key={key} ref={(el) => (layers.current[i] = el)} className={`layer layer-${key}`} style={{ opacity: i === 0 ? 1 : 0 }}>
          <div className="kb" style={{ backgroundImage: `url(${config.images.backgrounds[key]})` }} />
        </div>
      ))}
      <div className="vignette" />
      {children}
    </div>
  )
}
