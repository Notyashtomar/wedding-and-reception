import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { EASE } from '../lib/ease'
import config from '../weddingConfig'

const { gate, images, groom, bride } = config
const SWING = [0.7, 0, 0.18, 1]

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
  const angle = side === 'left' ? 84 : -84
  return (
    <m.div
      className={`door ${side}`}
      exit={{ rotateY: angle, transition: { duration: 2.3, delay: 0.55, ease: SWING } }}
    >
      <div className="leaf" style={{ backgroundImage: `url(${images.door})` }} />
      <m.div className="shade" initial={{ opacity: 0 }} exit={{ opacity: 0.85, transition: { duration: 2, delay: 0.7, ease: 'easeIn' } }} />
    </m.div>
  )
}

export default function Gate({ open, onOpen, hasMusic }) {
  const fontsReady = useFontsReady()
  return (
    <AnimatePresence>
      {!open && (
        <m.div
          key="gate"
          className="gate"
          role="dialog"
          aria-label="Invitation cover"
          exit={{ opacity: 0, transition: { duration: 0.8, delay: 2.4, ease: 'easeInOut' } }}
        >
          <m.div
            className="inner"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1, transition: { duration: 9, ease: 'easeOut' } }}
            exit={{ scale: 1.22, transition: { duration: 2.9, delay: 0.3, ease: SWING } }}
          >
            <div className="doors">
              <Door side="left" />
              <Door side="right" />
            </div>
            <m.div className="scrim" exit={{ opacity: 0, transition: { duration: 0.9 } }} />
            <m.div
              className="seam"
              exit={{ opacity: [1, 1, 0], scaleX: [1, 14, 60], transition: { duration: 1.9, times: [0, 0.4, 1], ease: 'easeOut' } }}
            />
            <m.div
              className="flare"
              initial={{ opacity: 0 }}
              exit={{ opacity: [0, 0.9, 0], transition: { duration: 2.2, delay: 0.35, times: [0, 0.35, 1] } }}
            />

            <m.div
              className="content"
              variants={content}
              initial="hidden"
              animate={fontsReady ? 'show' : 'hidden'}
              exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.6, ease: 'easeIn' } }}
            >
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
          </m.div>

          <m.span className="bar top" aria-hidden="true" initial={{ scaleY: 1 }} exit={{ scaleY: 0, transition: { duration: 1.6, delay: 1.2, ease: EASE } }} />
          <m.span className="bar bottom" aria-hidden="true" initial={{ scaleY: 1 }} exit={{ scaleY: 0, transition: { duration: 1.6, delay: 1.2, ease: EASE } }} />
        </m.div>
      )}
    </AnimatePresence>
  )
}
