import { forwardRef } from 'react'
import { Panel, Reveal, RevealGroup } from './Reveal'
import { Chapter, Crown, Rule } from './Ornaments'
import { Address, DateBox, EventActions } from './EventParts'
import config from '../weddingConfig'

const { reception } = config

const Reception = forwardRef(function Reception(_, ref) {
  return (
    <Panel ref={ref} className="bg-reception reception" id="s5" aria-label={reception.name}>
      <Chapter n="IV">The Reception</Chapter>
      <RevealGroup className="arch arch-event">
        <Crown />
        <Reveal as="p" className="hindi" lang="hi">
          {reception.hindi}
        </Reveal>
        <Reveal as="h2" className="ev-name">
          {reception.name}
        </Reveal>
        <Reveal>
          <DateBox evt={reception} />
          <p className="ev-time">{reception.time}</p>
        </Reveal>
        <Reveal>
          <Rule />
          <Address venue={reception.venue} />
        </Reveal>
      </RevealGroup>
      <Reveal className="stack">
        <EventActions evt={reception} />
      </Reveal>
    </Panel>
  )
})

export default Reception
