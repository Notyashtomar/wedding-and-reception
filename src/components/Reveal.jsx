import { m } from 'motion/react'
import { EASE } from '../lib/ease'

const revealItem = {
  hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.4, ease: EASE } },
}

const group = (delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: delay } },
})

// A full-height section. Its Reveal descendants rise out of a soft blur in sequence once a
// fifth of the section is on screen, or when `active` becomes true if it is controlled.
export function Panel({ active, delay, className = '', children, ...rest }) {
  const trigger =
    active === undefined
      ? { whileInView: 'show', viewport: { once: true, amount: 0.2 } }
      : { animate: active ? 'show' : 'hidden' }
  return (
    <m.section className={`panel ${className}`} initial="hidden" variants={group(delay)} {...trigger} {...rest}>
      {children}
    </m.section>
  )
}

export function Reveal({ as = 'div', className, children, ...rest }) {
  const Tag = m[as]
  return (
    <Tag className={className} variants={revealItem} {...rest}>
      {children}
    </Tag>
  )
}

const revealGroup = {
  hidden: revealItem.hidden,
  show: { ...revealItem.show, transition: { ...revealItem.show.transition, staggerChildren: 0.16 } },
}

// A container that reveals itself and staggers its own Reveal children.
export function RevealGroup({ as = 'div', className, children, ...rest }) {
  const Tag = m[as]
  return (
    <Tag className={className} variants={revealGroup} {...rest}>
      {children}
    </Tag>
  )
}

// A title that "tracks in" like a film title card: wide letter-spacing settling as it sharpens.
const titleItem = {
  hidden: (spacing) => ({ opacity: 0, letterSpacing: `${spacing + 0.4}em`, filter: 'blur(14px)', scale: 1.08 }),
  show: (spacing) => ({ opacity: 1, letterSpacing: `${spacing}em`, filter: 'blur(0px)', scale: 1, transition: { duration: 2.2, ease: EASE } }),
}

// `spacing` is the resting letter-spacing in em.
export function TitleReveal({ as = 'h2', spacing = 0, className, children, ...rest }) {
  const Tag = m[as]
  return (
    <Tag className={className} variants={titleItem} custom={spacing} {...rest}>
      {children}
    </Tag>
  )
}
