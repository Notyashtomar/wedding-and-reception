import { forwardRef } from 'react'
import { m } from 'motion/react'
import { Panel, Reveal, RevealGroup } from './Reveal'
import { EASE } from '../lib/ease'
import { Chapter, Crown, Rule } from './Ornaments'
import { DateBox } from './EventParts'
import Countdown from './Countdown'
import config from '../weddingConfig'

const { wedding } = config

const line = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 1.8, delay: 0.3, ease: EASE } },
}

function Schedule({ items }) {
  return (
    <Reveal as="ol" className="schedule" aria-label="Programme">
      <m.span className="track" variants={line} aria-hidden="true" />
      {items.map((it) => (
        <li key={it.name}>
          <span className="node" aria-hidden="true" />
          <span className="what">
            <span className="s-name">{it.name}</span>
            <span className="s-gloss">{it.gloss}</span>
          </span>
          <time className="s-time">{it.time}</time>
        </li>
      ))}
    </Reveal>
  )
}

const Wedding = forwardRef(function Wedding(_, ref) {
  return (
    <Panel ref={ref} className="bg-wedding wedding" id="s3" aria-label={wedding.name}>
      <Chapter n="II">The Wedding</Chapter>
      <RevealGroup className="arch arch-event">
        <Crown />
        <Reveal as="p" className="hindi" lang="hi">
          {wedding.hindi}
        </Reveal>
        <Reveal as="h2" className="ev-name">
          {wedding.name}
        </Reveal>
        <Reveal>
          <DateBox evt={wedding} />
        </Reveal>
        <Reveal>
          <Rule />
          <p className="prog">The Programme</p>
        </Reveal>
        <Schedule items={wedding.schedule} />
      </RevealGroup>
      <Reveal className="count-wrap">
        <p className="count-lead">Counting down to the big day</p>
        <Countdown target={new Date(wedding.start).getTime()} doneTitle={wedding.startedMessage} doneSub={wedding.startedSubtext} />
      </Reveal>
    </Panel>
  )
})

export default Wedding
