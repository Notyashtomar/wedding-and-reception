// Converts the source artwork in assets-src/ into optimised files in public/images/.
// Run with: npm run assets
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'

const SRC = 'assets-src'
const OUT = 'public/images'
mkdirSync(OUT, { recursive: true })

const backgrounds = ['bg-hero', 'bg-invite', 'bg-wedding', 'bg-venue', 'bg-reception', 'bg-close']

for (const name of backgrounds) {
  await sharp(`${SRC}/${name}.jpg`).webp({ quality: 76, effort: 6 }).toFile(`${OUT}/${name}.webp`)
  console.log('bg', name)
}

// The palace doors are symmetrical about x = 362; the left leaf is kept and mirrored in CSS
// for the right leaf, so the two always meet cleanly at the seam.
const DOOR_SEAM = 362
await sharp(`${SRC}/doors.jpg`)
  .extract({ left: 0, top: 0, width: DOOR_SEAM, height: 1280 })
  .webp({ quality: 78, effort: 6 })
  .toFile(`${OUT}/door.webp`)
console.log('door')

// Removes the flat white backdrop: every white region touching the border, plus enclosed
// white regions of at least `minEnclosed` pixels. Smaller enclosed regions (lily petals)
// stay opaque.
async function cutOut(name, width, minEnclosed) {
  const { data, info } = await sharp(`${SRC}/${name}.jpg`).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width: w, height: h } = info
  const px = (i) => Math.min(data[i * 4], data[i * 4 + 1], data[i * 4 + 2])
  const HARD = 232
  const isBg = new Uint8Array(w * h)
  const seen = new Uint8Array(w * h)
  for (let s = 0; s < w * h; s++) {
    if (seen[s] || px(s) < HARD) continue
    const region = []
    const stack = [s]
    let touchesBorder = false
    seen[s] = 1
    while (stack.length) {
      const i = stack.pop()
      region.push(i)
      const x = i % w
      const y = (i / w) | 0
      if (x === 0 || y === 0 || x === w - 1 || y === h - 1) touchesBorder = true
      for (const j of [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, y > 0 ? i - w : -1, y < h - 1 ? i + w : -1]) {
        if (j >= 0 && !seen[j] && px(j) >= HARD) {
          seen[j] = 1
          stack.push(j)
        }
      }
    }
    if (touchesBorder || region.length >= minEnclosed) for (const i of region) isBg[i] = 1
  }
  for (let i = 0; i < w * h; i++) {
    if (isBg[i]) { data[i * 4 + 3] = 0; continue }
    const x = i % w
    const touchesBg = (x > 0 && isBg[i - 1]) || (x < w - 1 && isBg[i + 1]) || (i >= w && isBg[i - w]) || (i < w * (h - 1) && isBg[i + w])
    if (touchesBg) {
      // feather the anti-aliased rim: lighter pixels become more transparent
      const t = Math.max(0, Math.min(1, (255 - px(i)) / (255 - 150)))
      data[i * 4 + 3] = Math.round(255 * t)
    }
  }
  await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .trim({ threshold: 1 })
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 88, alphaQuality: 90, effort: 6 })
    .toFile(`${OUT}/${name}.webp`)
  console.log('cutout', name)
}

await cutOut('ganesh', 280, 0)
await cutOut('monogram', 360, 2000)

const NIGHT = { r: 22, g: 8, b: 12, alpha: 1 }

const mono = await sharp(`${OUT}/monogram.webp`).resize({ width: 150, height: 150, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer()
await sharp({ create: { width: 180, height: 180, channels: 4, background: NIGHT } })
  .composite([{ input: mono, gravity: 'center' }])
  .png()
  .toFile(`${OUT}/favicon.png`)
console.log('favicon')

// Link-preview card shown by WhatsApp and other messengers.
const ogMono = await sharp(`${OUT}/monogram.webp`).resize({ height: 300 }).toBuffer()
const shade = Buffer.from(
  `<svg width="1200" height="630"><defs><radialGradient id="g" cx="50%" cy="50%" r="50%">
   <stop offset="0" stop-color="#16080c" stop-opacity=".82"/><stop offset=".55" stop-color="#16080c" stop-opacity=".55"/>
   <stop offset="1" stop-color="#16080c" stop-opacity="0"/></radialGradient></defs>
   <ellipse cx="600" cy="315" rx="400" ry="300" fill="url(#g)"/></svg>`,
)
await sharp(`${SRC}/bg-hero.jpg`)
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'centre' })
  .composite([{ input: shade }, { input: ogMono, gravity: 'center' }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(`${OUT}/og.jpg`)
console.log('og')
