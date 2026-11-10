import { Reveal } from './Reveal'

// A film-style chapter marker above each section.
export function Chapter({ n, children }) {
  return (
    <Reveal className="chapter" aria-hidden="true">
      <span className="num">{n}</span>
      <span className="bar" />
      <span className="ttl">{children}</span>
    </Reveal>
  )
}

// Gold lotus finial that sits on the apex of an arch card.
export function Crown() {
  return (
    <span className="crown" aria-hidden="true">
      <svg viewBox="0 0 64 34">
        <path d="M32 2c4 6 4 13 0 20-4-7-4-14 0-20z" fill="currentColor" />
        <path d="M31 23c-6-1-11-6-12-14 6 2 10 7 12 14zM33 23c6-1 11-6 12-14-6 2-10 7-12 14z" fill="currentColor" opacity=".8" />
        <path d="M30 25c-8 1-15-3-20-9 8-1 15 3 20 9zM34 25c8 1 15-3 20-9-8-1-15 3-20 9z" fill="currentColor" opacity=".55" />
        <path d="M12 29h40" stroke="currentColor" strokeWidth="1" />
        <circle cx="8" cy="29" r="1.4" fill="currentColor" />
        <circle cx="56" cy="29" r="1.4" fill="currentColor" />
      </svg>
    </span>
  )
}

export function Rule() {
  return (
    <div className="rule" aria-hidden="true">
      <span />
      <svg viewBox="0 0 12 12">
        <path d="M6 0l1.2 4.8L12 6l-4.8 1.2L6 12 4.8 7.2 0 6l4.8-1.2z" />
      </svg>
      <span />
    </div>
  )
}

function Corner({ pos }) {
  return (
    <span className={`orn ${pos}`} aria-hidden="true">
      <svg viewBox="0 0 28 28">
        <path d="M28 7.5H21Q16.5 7.5 16.5 12Q16.5 16.5 12 16.5Q7.5 16.5 7.5 21V28" fill="none" stroke="currentColor" strokeOpacity=".75" strokeWidth="1" />
        <path d="M28 11.5H23.5Q20.5 11.5 20.5 14.5Q20.5 20.5 14.5 20.5Q11.5 20.5 11.5 23.5V28" fill="none" stroke="currentColor" strokeOpacity=".35" strokeWidth="1" />
        <path d="M2.5 2.5C8 2.5 11.5 5.5 11.5 11.5C5.5 11.5 2.5 8 2.5 2.5Z" fill="currentColor" opacity=".85" />
        <path d="M5 5L11 11" stroke="#1a090d" strokeWidth=".6" />
        <circle cx="15" cy="4.5" r="1" fill="currentColor" />
        <circle cx="4.5" cy="15" r="1" fill="currentColor" />
        <circle cx="19" cy="4.5" r=".6" fill="currentColor" opacity=".7" />
        <circle cx="4.5" cy="19" r=".6" fill="currentColor" opacity=".7" />
      </svg>
    </span>
  )
}

function Crest({ pos }) {
  return (
    <span className={`crest ${pos}`} aria-hidden="true">
      <svg viewBox="0 0 56 18">
        <path d="M28 2l4 7-4 7-4-7z" fill="currentColor" />
        <path d="M22 9c-4-4-8-4-10 0 2 3 6 3 10 0zM34 9c4-4 8-4 10 0-2 3-6 3-10 0z" fill="currentColor" opacity=".7" />
        <circle cx="17" cy="9" r=".9" fill="#1a090d" />
        <circle cx="39" cy="9" r=".9" fill="#1a090d" />
      </svg>
    </span>
  )
}

// Gold filigree corners and crests for the framed contact card.
export function FrameOrnaments() {
  return (
    <>
      <Corner pos="tl" />
      <Corner pos="tr" />
      <Corner pos="bl" />
      <Corner pos="br" />
      <Crest pos="top" />
      <Crest pos="bot" />
    </>
  )
}

export function PinIcon() {
  return (
    <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.8" r="2.3" />
    </svg>
  )
}

export function CalendarIcon() {
  return (
    <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="5.5" width="16" height="14.5" rx="1.5" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
    </svg>
  )
}

export function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </svg>
  )
}
