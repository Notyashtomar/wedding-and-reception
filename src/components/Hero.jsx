import { forwardRef } from 'react'
import { Panel, Reveal, TitleReveal } from './Reveal'
import { Rule } from './Ornaments'
import config from '../weddingConfig'

const { groom, bride, blessings, wedding, images } = config

// The opening title card: blessings roll in like film credits, then the names.
const Hero = forwardRef(function Hero({ active }, ref) {
  return (
    <Panel ref={ref} active={active} delay={1.7} className="hero" id="s1" aria-label={`${groom.firstName} weds ${bride.firstName}`}>
      <Reveal as="p" className="credit-lead">
        {blessings.lead}
      </Reveal>
      <Reveal className="elders">
        <p>{blessings.elders[0]}</p>
        <p className="and">&amp;</p>
        <p>{blessings.elders[1]}</p>
      </Reveal>
      <Reveal>
        <Rule />
      </Reveal>
      <Reveal>
        <img className="monogram" src={images.monogram} alt="" />
      </Reveal>
      <h1 className="names">
        <TitleReveal as="span" className="name">
          <span className="foil">{groom.firstName}</span>
        </TitleReveal>
        <Reveal as="span" className="weds">
          <i />
          weds
          <i />
        </Reveal>
        <TitleReveal as="span" className="name">
          <span className="foil">{bride.firstName}</span>
        </TitleReveal>
      </h1>
      <Reveal as="p" className="when">
        {wedding.shortDate}
      </Reveal>
      <Reveal as="p" className="sub">
        Wedding &amp; Reception
      </Reveal>
    </Panel>
  )
})

export default Hero
