import { forwardRef } from 'react'
import { Panel, Reveal, RevealGroup } from './Reveal'
import { Chapter, Crown, FrameOrnaments, PhoneIcon, Rule } from './Ornaments'
import { formatPhone, telHref } from '../lib/event'
import config from '../weddingConfig'

const { closing, contact, rsvp, wedding, reception, images, music } = config

const Closing = forwardRef(function Closing(_, ref) {
  return (
    <Panel ref={ref} className="bg-close close" id="s6" aria-label="RSVP">
      <Chapter n="V">With Love</Chapter>
      <RevealGroup className="arch arch-close">
        <Crown />
        <Reveal>
          <img className="monogram monogram-sm" src={images.monogram} alt="" />
        </Reveal>
        <Reveal as="p" className="line">
          {closing.lines[0]}
          <br />
          {closing.lines[1]}
        </Reveal>
        <Reveal>
          <Rule />
          <p className="rsvp-head">{rsvp.heading}</p>
          <p className="guests">{rsvp.guests}</p>
        </Reveal>
        <Reveal>
          <Rule />
          <p className="compl-lead">{rsvp.complimentsLead}</p>
          <p className="compl foil">{rsvp.compliments}</p>
          <p className="dates">
            {wedding.shortDate}
            <span className="amp">&amp;</span>
            {reception.shortDate}
          </p>
        </Reveal>
      </RevealGroup>
      <Reveal className="contact">
        <FrameOrnaments />
        <p className="head">{contact.heading}</p>
        <Rule />
        {contact.phones.map((p) => (
          <a key={p} href={telHref(p)}>
            <PhoneIcon />
            {formatPhone(p)}
          </a>
        ))}
      </Reveal>
      {music.src && music.credit && <p className="credit">{music.credit}</p>}
    </Panel>
  )
})

export default Closing
