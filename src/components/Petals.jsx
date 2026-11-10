// A handful of marigold and rose petals drifting down very slowly behind the content.
const petals = [
  { left: 6, size: 14, delay: 0, dur: 17, sway: 4.8, kind: 'rose' },
  { left: 22, size: 11, delay: 6, dur: 21, sway: 5.6, kind: 'marigold' },
  { left: 39, size: 13, delay: 2.5, dur: 19, sway: 4.4, kind: 'rose' },
  { left: 55, size: 10, delay: 9.5, dur: 23, sway: 6.2, kind: 'marigold' },
  { left: 70, size: 15, delay: 4.5, dur: 18, sway: 5.1, kind: 'rose' },
  { left: 84, size: 11, delay: 12, dur: 22, sway: 5.9, kind: 'marigold' },
  { left: 95, size: 12, delay: 7.5, dur: 20, sway: 4.9, kind: 'rose' },
]

function Rose() {
  return (
    <svg viewBox="0 0 20 20">
      <defs>
        <radialGradient id="rp" cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#d23a4a" />
          <stop offset="1" stopColor="#6e0f1c" />
        </radialGradient>
      </defs>
      <path d="M10 1.5C15 1.5 18.5 6 16.6 11.4 15 15.6 10 18.5 10 18.5S5 15.6 3.4 11.4C1.5 6 5 1.5 10 1.5Z" fill="url(#rp)" />
      <path d="M10 4.5C10 9 9.2 13 8 16" fill="none" stroke="rgba(255,190,190,.35)" strokeWidth=".6" />
    </svg>
  )
}

function Marigold() {
  return (
    <svg viewBox="0 0 20 20">
      <defs>
        <linearGradient id="mp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffc24a" />
          <stop offset="1" stopColor="#e2780f" />
        </linearGradient>
      </defs>
      <path d="M10 2C13.5 2 15.5 5.5 15 9.5 14.4 14 12 18 10 18S5.6 14 5 9.5C4.5 5.5 6.5 2 10 2Z" fill="url(#mp)" />
      <path d="M7.4 3.6 8 6.2M10 2.6v3.4M12.6 3.6 12 6.2" stroke="#c45f08" strokeWidth=".7" strokeLinecap="round" />
    </svg>
  )
}

export default function Petals() {
  return (
    <div className="petals">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{ left: `${p.left}%`, width: p.size, height: p.size, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }}
        >
          <span className="sway" style={{ animationDuration: `${p.sway}s` }}>
            {p.kind === 'rose' ? <Rose /> : <Marigold />}
          </span>
        </span>
      ))}
    </div>
  )
}
