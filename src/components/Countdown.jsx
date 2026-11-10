import { AnimatePresence, m } from 'motion/react'
import useCountdown from '../hooks/useCountdown'

const pad = (n) => String(n).padStart(2, '0')

function Digit({ value }) {
  const text = pad(value)
  return (
    <b>
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={text}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          {text}
        </m.span>
      </AnimatePresence>
    </b>
  )
}

export default function Countdown({ target, doneTitle, doneSub }) {
  const { done, days, hours, minutes, seconds } = useCountdown(target)
  if (done) {
    return (
      <div className="count-done" role="status">
        <p className="done-title">{doneTitle}</p>
        <p className="done-sub">{doneSub}</p>
      </div>
    )
  }
  const units = [
    [days, 'Days'],
    [hours, 'Hours'],
    [minutes, 'Mins'],
    [seconds, 'Secs'],
  ]
  return (
    <div className="count" role="timer" aria-label={`${days} days, ${hours} hours, ${minutes} minutes to go`}>
      {units.map(([v, label]) => (
        <div key={label}>
          <Digit value={v} />
          <small>{label}</small>
        </div>
      ))}
    </div>
  )
}
