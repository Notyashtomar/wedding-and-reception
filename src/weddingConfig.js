// Every piece of text, date, link and asset on the invitation comes from this file.

const weddingConfig = {
  siteTitle: 'Shubham weds Sunaina | Wedding Ceremony',

  gate: {
    mantra: '॥ ॐ श्री गणेशाय नमः ॥',
    presenter: 'The Tomar Family',
    lead: 'cordially invites you to',
    title: 'The Wedding Ceremony',
    button: 'Open the Doors',
    musicNote: 'Opens with music',
  },

  blessings: {
    lead: 'With the divine blessings of',
    elders: ['Smt. Machhla Devi', 'Late Ch. Balbir Singh Tomar'],
  },

  groom: {
    firstName: 'Shubham',
    relation: 'S/o',
    mother: 'Smt. Shashi Tomar',
    father: 'Sh. Parveen Singh Tomar',
  },

  bride: {
    firstName: 'Sunaina',
    relation: 'D/o',
    mother: 'Smt. Sunita Solani',
    father: 'Sh. Rakesh Kr. Solani',
    residence: 'R/o Palam Village, New Delhi',
  },

  invitation: {
    lead: ['We solicit your gracious presence', 'with family and friends', 'on the auspicious occasion of the'],
    rite: 'Wedding Ceremony',
  },

  // ISO 8601 with the IST offset; the countdown and calendar links derive from `start`.
  wedding: {
    id: 'wedding',
    name: 'Wedding Ceremony',
    hindi: 'शुभ विवाह',
    start: '2026-12-12T16:00:00+05:30',
    durationHours: 8,
    timeZone: 'Asia/Kolkata',
    weekday: 'Saturday',
    day: '12',
    monthYear: 'December 2026',
    shortDate: '12 · 12 · 2026',
    schedule: [
      { name: 'Sehrabandi', gloss: 'The tying of the sehra', time: '4:00 PM' },
      { name: 'Ghudchadi', gloss: 'The groom mounts the mare', time: '4:30 PM' },
      { name: 'Departure of Barat', gloss: 'The procession sets forth', time: '6:00 PM' },
    ],
    venue: {
      label: 'Wedding Venue',
      name: 'Dreamz Garden',
      addressLines: ['Plot No. 12, 13, Kh. No. 14,', 'Near KSH Tower, Radha Swami Satsang,', 'Pochanpur, Sector 23, Dwarka,', 'New Delhi, Delhi 110077'],
      // Used for Google Maps search and calendar location.
      mapsQuery: 'Dreamz Garden, Pochanpur, Sector 23, Dwarka, New Delhi, Delhi 110077',
    },
    startedMessage: 'The celebrations have begun',
    startedSubtext: 'Thank you for being part of our special day',
  },

  reception: {
    id: 'reception',
    name: 'Reception',
    hindi: 'स्वागत समारोह',
    start: '2026-12-13T20:00:00+05:30',
    durationHours: 4,
    timeZone: 'Asia/Kolkata',
    weekday: 'Sunday',
    day: '13',
    monthYear: 'December 2026',
    shortDate: '13 · 12 · 2026',
    time: '8:00 PM onwards',
    venue: {
      label: 'Reception Venue',
      name: 'SK Precious Banquet',
      addressLines: ['Plot No. 15 & 16,', 'Janakpuri District Center,', 'Janakpuri, New Delhi,', 'Delhi 110058'],
      mapsQuery: 'SK Precious Banquet, Janakpuri District Center, Janakpuri, New Delhi, Delhi 110058',
    },
  },

  rsvp: {
    heading: 'R.S.V.P.',
    guests: 'All Family & Relatives',
    complimentsLead: 'With best compliments from',
    compliments: 'The Tomar Family',
  },

  closing: {
    lines: ['Your presence is our', 'greatest blessing'],
  },

  contact: {
    heading: 'For Contact',
    phones: ['9717782626', '9311973552'],
    countryCode: '+91',
  },

  music: {
    src: '/audio/music.mp3',
    volume: 0.8,
    credit: 'Music: “Relax Ay Sitar” by Antti Luode, CC BY 3.0',
  },

  images: {
    ganesh: '/images/ganesh.webp',
    monogram: '/images/monogram.webp',
    door: '/images/door.webp',
    backgrounds: {
      hero: '/images/bg-hero.webp',
      invite: '/images/bg-invite.webp',
      wedding: '/images/bg-wedding.webp',
      venue: '/images/bg-venue.webp',
      reception: '/images/bg-reception.webp',
      close: '/images/bg-close.webp',
    },
  },

  effects: {
    petals: true,
    dust: true,
    grain: true,
  },
}

export default weddingConfig
