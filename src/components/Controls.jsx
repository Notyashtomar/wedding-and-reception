import { useEffect, useState } from 'react'
import { m } from 'motion/react'

export function SoundToggle({ playing, onToggle }) {
  return (
    <m.button
      type="button"
      className="sound"
      aria-label={playing ? 'Turn music off' : 'Turn music on'}
      aria-pressed={playing}
      onClick={onToggle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: playing ? 1 : 0.6, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 9v6h4l5 4V5L8 9H4z" />
        {playing ? <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" /> : <path d="M16 9l5 6M21 9l-5 6" />}
      </svg>
      {playing && <span className="pulse" aria-hidden="true" />}
    </m.button>
  )
}

export function ScrollCue({ sectionRefs }) {
  const [gone, setGone] = useState(false)

  useEffect(() => {
    let frame = 0
    const check = () => {
      frame = 0
      // Once the guest has started scrolling the cue has done its job and would only sit over the cards.
      setGone(window.scrollY > window.innerHeight * 0.35)
    }
    const request = () => {
      if (!frame) frame = requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
    }
  }, [])

  const next = () => {
    const y = window.scrollY + 8
    const target = sectionRefs.current.find((s) => s && s.offsetTop > y)
    window.scrollTo({ top: target ? target.offsetTop : y + window.innerHeight * 0.8, behavior: 'smooth' })
  }

  return (
    <button type="button" className={`cue${gone ? ' gone' : ''}`} aria-label="Scroll down" onClick={next}>
      <span>Scroll</span>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 7l6 6 6-6M6 12l6 6 6-6" />
      </svg>
    </button>
  )
}
