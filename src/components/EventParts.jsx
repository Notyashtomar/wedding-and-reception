import { CalendarIcon, PinIcon } from './Ornaments'
import { eventLinks } from '../lib/event'

// "SATURDAY | 12 | DECEMBER 2026" in the classic invitation layout.
export function DateBox({ evt }) {
  return (
    <div className="datebox" aria-label={`${evt.weekday}, ${evt.day} ${evt.monthYear}`}>
      <span className="side">{evt.weekday}</span>
      <span className="dd foil">{evt.day}</span>
      <span className="side">{evt.monthYear}</span>
    </div>
  )
}

export function Address({ venue }) {
  return (
    <>
      <p className="vlabel">{venue.label}</p>
      <h3 className="place">{venue.name}</h3>
      <p className="addr">
        {venue.addressLines.map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
      </p>
    </>
  )
}

export function EventActions({ evt }) {
  const links = eventLinks(evt)
  return (
    <div className="actions">
      <a className="btn gold wide" target="_blank" rel="noopener noreferrer" href={links.maps}>
        <PinIcon />
        View Location
      </a>
      <a className="btn ghost" target="_blank" rel="noopener noreferrer" href={links.google}>
        <CalendarIcon />
        Google Cal
      </a>
      <a className="btn ghost" href={links.ics} download={links.icsName}>
        <CalendarIcon />
        Apple Cal
      </a>
    </div>
  )
}
