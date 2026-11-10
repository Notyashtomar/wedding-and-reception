import { useEffect, useState } from 'react'
import { m } from 'motion/react'
import { EASE } from '../lib/ease'
import config from '../weddingConfig'

const { gate, images, groom, bride } = config
// Must outlast the longest opening animation in index.css (doors fade out by 3.2s).
const OPENING_MS = 3300

const content = {
  hidden: {},
  show: { transition: { staggerChildren: 0.22, delayChildren: 0.5 } },
}
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 1.5, ease: EASE } },
}

// Holds the entrance until the web fonts are ready (or 1.2s pass) so text never swaps visibly.
function useFontsReady() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const done = () => setReady(true)
    const timer = setTimeout(done, 1200)
    document.fonts?.ready.then(done)
    return () => clearTimeout(timer)
  }, [])
  return ready
}

function Door({ side }) {
  return (
    <div className={`door ${side}`}>
      <div className="leaf" style={{ backgroundImage: `url(${images.door})` }} />
      <div className="shade" />
    </div>
  )
}

// The opening is pure CSS (`.gate.opening` in index.css) so the compositor runs it on its own
// thread; the page waking up underneath can't make the doors stutter on a phone.
export default function Gate({ opening, onOpen, onDone, hasMusic }) {
  const fontsReady = useFontsReady()

  useEffect(() => {
    if (!opening) return
    const timer = setTimeout(onDone, OPENING_MS)
    return () => clearTimeout(timer)
  }, [opening, onDone])

  return (
    <div className={`gate${opening ? ' opening' : ''}`} role="dialog" aria-label="Invitation cover">
      <div className="inner">
        <div className="drift">
          <div className="doors">
            <Door side="left" />
            <Door side="right" />
          </div>
          <div className="scrim" />
          <div className="seam" />
          <div className="flare" />

          <m.div className="content" variants={content} initial="hidden" animate={fontsReady ? 'show' : 'hidden'}>
            <m.p variants={item} className="mantra" lang="hi">
              {gate.mantra}
            </m.p>
            <m.div variants={item}>
              <img className="ganesh" src={images.ganesh} alt="Shri Ganesh" width="84" height="100" />
            </m.div>
            <m.p variants={item} className="presenter">
              {gate.presenter}
            </m.p>
            <m.p variants={item} className="lead">
              {gate.lead}
            </m.p>
            <m.p variants={item} className="title">
              {gate.title}
            </m.p>
            <m.p variants={item} className="couple">
              <span className="foil">{groom.firstName}</span>
              <span className="amp">&amp;</span>
              <span className="foil">{bride.firstName}</span>
            </m.p>
            <m.div variants={item}>
              <button type="button" onClick={onOpen}>
                <span>{gate.button}</span>
              </button>
            </m.div>
            {hasMusic && (
              <m.p variants={item} className="note">
                {gate.musicNote}
              </m.p>
            )}
          </m.div>
        </div>
      </div>

      <span className="bar top" aria-hidden="true" />
      <span className="bar bottom" aria-hidden="true" />
    </div>
  )
}
