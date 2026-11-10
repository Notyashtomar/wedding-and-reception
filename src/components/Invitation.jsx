import { forwardRef } from 'react'
import { Panel, Reveal, RevealGroup } from './Reveal'
import { Chapter, Crown, Rule } from './Ornaments'
import config from '../weddingConfig'

const { groom, bride, invitation } = config

function Person({ person }) {
  return (
    <Reveal className="person-block">
      <p className="person foil">{person.firstName}</p>
      <p className="parents">
        {person.relation} {person.mother}
        <br />
        <span className="and">&amp;</span> {person.father}
      </p>
      {person.residence && <p className="res">({person.residence})</p>}
    </Reveal>
  )
}

const Invitation = forwardRef(function Invitation(_, ref) {
  return (
    <Panel ref={ref} className="bg-invite invite" id="s2" aria-label="Invitation">
      <Chapter n="I">The Invitation</Chapter>
      <RevealGroup className="arch">
        <Crown />
        <Reveal className="om-mark" lang="hi" aria-label="Om">
          ॐ
        </Reveal>
        <Reveal as="p" className="lead">
          {invitation.lead.map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </Reveal>
        <Reveal as="p" className="rite">
          {invitation.rite}
        </Reveal>
        <Reveal>
          <Rule />
          <p className="of">of</p>
        </Reveal>
        <Person person={groom} />
        <Reveal as="p" className="weds-mark">
          weds
        </Reveal>
        <Person person={bride} />
      </RevealGroup>
    </Panel>
  )
})

export default Invitation
