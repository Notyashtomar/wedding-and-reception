import config from '../weddingConfig'

const { groom, bride, contact, rsvp } = config

const toUtcStamp = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
const icsEscape = (s) => s.replace(/\\/g, '\\\\').replace(/([,;])/g, '\\$1')

export function formatPhone(num) {
  const d = num.replace(/\D/g, '').slice(-10)
  return `${contact.countryCode} ${d.slice(0, 5)} ${d.slice(5)}`
}

export const telHref = (num) => `tel:${contact.countryCode}${num.replace(/\D/g, '').slice(-10)}`

export const mapsUrl = (venue) => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(venue.mapsQuery)

const phones = contact.phones.map(formatPhone).join(' / ')

// Start/end, Google Calendar link and an .ics download for one event from the config.
export function eventLinks(evt) {
  const start = new Date(evt.start)
  const end = new Date(start.getTime() + evt.durationHours * 3600 * 1000)
  const title = `${evt.name} – ${groom.firstName} weds ${bride.firstName}`
  const location = `${evt.venue.name}, ${evt.venue.addressLines.join(' ').replace(/,$/, '')}`
  const details = `${rsvp.complimentsLead} ${rsvp.compliments}. Contact: ${phones}`

  const google =
    'https://calendar.google.com/calendar/render?' +
    new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      dates: `${toUtcStamp(start)}/${toUtcStamp(end)}`,
      details,
      location,
      ctz: evt.timeZone,
    }).toString()

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${groom.firstName} & ${bride.firstName}//Invite//EN`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${evt.id}-${groom.firstName}-${bride.firstName}-${toUtcStamp(start)}`.toLowerCase(),
    `DTSTAMP:${toUtcStamp(new Date())}`,
    `DTSTART:${toUtcStamp(start)}`,
    `DTEND:${toUtcStamp(end)}`,
    `SUMMARY:${icsEscape(title)}`,
    `LOCATION:${icsEscape(location)}`,
    `DESCRIPTION:${icsEscape(details)}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT3H',
    'ACTION:DISPLAY',
    `DESCRIPTION:${icsEscape(title)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  return {
    start,
    google,
    ics: 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics),
    icsName: `${groom.firstName}-${bride.firstName}-${evt.name.replace(/\s+/g, '-')}.ics`,
    maps: mapsUrl(evt.venue),
  }
}
