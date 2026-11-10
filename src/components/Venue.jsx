import { forwardRef } from 'react'
import { Panel, Reveal, RevealGroup } from './Reveal'
import { Chapter, Crown, Rule } from './Ornaments'
import { Address, EventActions } from './EventParts'
import config from '../weddingConfig'

const { wedding } = config

const Venue = forwardRef(function Venue(_, ref) {
  return (
    <Panel ref={ref} className="bg-venue venue" id="s4" aria-label={wedding.venue.label}>
      <Chapter n="III">The Venue</Chapter>
      <RevealGroup className="arch arch-venue">
        <Crown />
        <Reveal>
          <Address venue={wedding.venue} />
        </Reveal>
        <Reveal>
          <Rule />
          <p className="on">
            {wedding.weekday}, {wedding.day} {wedding.monthYear}
          </p>
        </Reveal>
      </RevealGroup>
      <Reveal className="stack">
        <EventActions evt={wedding} />
      </Reveal>
    </Panel>
  )
})

export default Venue
