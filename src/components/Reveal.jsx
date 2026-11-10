import { m } from 'motion/react'
import { EASE } from '../lib/ease'

// Only opacity and transform are animated on scroll so every reveal stays on the compositor;
// blur and letter-spacing would repaint or relayout the text on each frame.
const revealItem = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE } },
}

const group = (delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: delay } },
})

// A full-height section. Its Reveal descendants rise in sequence once a fifth of the section
// is on screen, or when `active` becomes true if it is controlled.
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
  show: { ...revealItem.show, transition: { ...revealItem.show.transition, staggerChildren: 0.14 } },
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

// A title that settles into place like a film title card: drifting in from slightly large
// and wide, purely with transforms. Keep gold-foil text on a child, never on this element:
// mobile WebKit can flash the whole gradient box when a text-clipped element is itself composited.
const titleItem = {
  hidden: { opacity: 0, scale: 1.18, scaleX: 1.12, y: 10 },
  show: { opacity: 1, scale: 1, scaleX: 1, y: 0, transition: { duration: 2, ease: EASE } },
}

export function TitleReveal({ as = 'h2', className, children, ...rest }) {
  const Tag = m[as]
  return (
    <Tag className={className} variants={titleItem} {...rest}>
      {children}
    </Tag>
  )
}
