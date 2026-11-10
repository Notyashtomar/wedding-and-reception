import { useEffect, useRef } from 'react'

// Glowing motes of gold that rise and twinkle over the whole invitation, like dust in
// candlelight. One pre-rendered glow sprite is stamped per mote, so a frame costs a few dozen
// drawImage calls; the loop stops while the tab is hidden. The motes are soft blurs, so the
// canvas is kept at 1x resolution: on a 3x phone that is a ninth of the pixels to upload per frame.
export default function GoldDust() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const count = window.matchMedia('(hover: hover) and (pointer: fine)').matches ? 44 : 26

    const sprite = document.createElement('canvas')
    sprite.width = sprite.height = 64
    const s = sprite.getContext('2d')
    const g = s.createRadialGradient(32, 32, 0, 32, 32, 32)
    g.addColorStop(0, 'rgba(255, 246, 214, 1)')
    g.addColorStop(0.18, 'rgba(255, 214, 140, 0.9)')
    g.addColorStop(0.45, 'rgba(232, 168, 72, 0.28)')
    g.addColorStop(1, 'rgba(232, 168, 72, 0)')
    s.fillStyle = g
    s.fillRect(0, 0, 64, 64)

    let w = 0
    let h = 0
    // Mobile browsers fire resize as the URL bar slides; only reallocate when the size really changes.
    const resize = () => {
      const nw = canvas.clientWidth
      const nh = canvas.clientHeight
      if (nw === w && Math.abs(nh - h) < 120 && h) return
      w = nw
      h = nh
      canvas.width = w
      canvas.height = h
    }
    resize()

    const spawn = (p, anywhere) => {
      p.x = Math.random() * w
      p.y = anywhere ? Math.random() * h : h + 20
      p.size = 5 + Math.random() * Math.random() * 16
      p.vy = 0.12 + Math.random() * 0.4
      p.vx = (Math.random() - 0.5) * 0.12
      p.phase = Math.random() * Math.PI * 2
      p.twinkle = 0.008 + Math.random() * 0.025
      p.alpha = 0.3 + Math.random() * 0.55
      return p
    }
    const motes = Array.from({ length: count }, () => spawn({}, true))

    let raf = 0
    let prev = performance.now()
    const frame = (now) => {
      const k = Math.min(3, (now - prev) / 16.67)
      prev = now
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      for (const p of motes) {
        p.phase += p.twinkle * k
        p.y -= p.vy * k
        p.x += (p.vx + Math.sin(p.phase) * 0.18) * k
        if (p.y < -20 || p.x < -20 || p.x > w + 20) spawn(p, false)
        ctx.globalAlpha = p.alpha * (0.5 + 0.5 * Math.sin(p.phase * 1.7))
        ctx.drawImage(sprite, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size)
      }
      raf = requestAnimationFrame(frame)
    }
    const start = () => {
      cancelAnimationFrame(raf)
      prev = performance.now()
      raf = requestAnimationFrame(frame)
    }
    const onVisibility = () => (document.hidden ? cancelAnimationFrame(raf) : start())

    start()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={ref} className="dust" aria-hidden="true" />
}
