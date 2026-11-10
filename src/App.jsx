import { useEffect, useRef, useState } from 'react'
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import Gate from './components/Gate'
import Stage from './components/Stage'
import Petals from './components/Petals'
import GoldDust from './components/GoldDust'
import Hero from './components/Hero'
import Invitation from './components/Invitation'
import Wedding from './components/Wedding'
import Venue from './components/Venue'
import Reception from './components/Reception'
import Closing from './components/Closing'
import { ScrollCue, SoundToggle } from './components/Controls'
import useMusic from './hooks/useMusic'
import config from './weddingConfig'

export default function App() {
  const [open, setOpen] = useState(false)
  const sections = useRef([])
  const music = useMusic(config.music.src, config.music.volume)
  const setSection = (i) => (el) => (sections.current[i] = el)

  useEffect(() => {
    document.documentElement.classList.toggle('locked', !open)
    document.body.classList.toggle('locked', !open)
  }, [open])

  const handleOpen = () => {
    window.scrollTo(0, 0)
    setOpen(true)
    music.start()
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <Gate open={open} onOpen={handleOpen} hasMusic={music.available} />
        {open && music.available && <SoundToggle playing={music.playing} onToggle={music.toggle} />}
        {open && <ScrollCue sectionRefs={sections} />}
        {config.effects.dust && <GoldDust />}
        {config.effects.grain && <div className="grain" aria-hidden="true" />}

        <main className="card">
          <Stage sectionRefs={sections}>{open && config.effects.petals && <Petals />}</Stage>
          <Hero ref={setSection(0)} active={open} />
          <Invitation ref={setSection(1)} />
          <Wedding ref={setSection(2)} />
          <Venue ref={setSection(3)} />
          <Reception ref={setSection(4)} />
          <Closing ref={setSection(5)} />
        </main>
      </MotionConfig>
    </LazyMotion>
  )
}
