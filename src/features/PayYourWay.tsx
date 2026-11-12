import type { ReactNode } from 'react'
import { Stage, Text } from '../kit'
import { PoketLogo } from '../brand/PoketLogo'
import { METHODS, Tile, after, beat, before, stageLook, usePictureSize, type Beat } from './shared'

// Pay your way (the hero tile, two thirds wide). One component, cropped
// large: the OnePoket sheet's "Pay with" row at the largest size that keeps
// every label whole. The method tiles are words only: the widget's own glyphs
// drew Apple Pay and Google Pay as the same generic phone, which reads as a
// placeholder, and the official marks need a brand-guidelines check first.
// Four methods show whole; Bank runs off the tile's right edge with its label
// still in view. The sheet's own Pay button sits
// under the row and changes with the method, as the reference prototype's
// does: green "Pay $23.40" for Card, black "Pay with Apple Pay" for Apple
// Pay, and so on. The sheet runs off the tile's foot. The selection moves
// from Card to Apple Pay once. Narrow, the row becomes the sheet's list.
//
// Real strings: the lockup, "Pay with", the five methods, the button labels
// (from reference/onepoket-website.html, order total $23.40).

const GUTTER = 28
const SHEET_PAD = 24

// The button for each method, as the reference prototype draws it
const BUTTONS: Record<string, ReactNode> = {
  card: (
    <>
      Pay <span className="fw-amt">$23.40</span>
    </>
  ),
  apple: 'Pay with Apple Pay',
  google: 'Pay with Google Pay',
  cash: 'Pay with Cash App',
  bank: (
    <>
      Pay by bank <span className="fw-amt">$23.40</span>
    </>
  ),
}

export function PayYourWay() {
  const [slot, { width, height: slotH }] = usePictureSize(720, 340)
  const narrow = width < 600
  const gap = width < 700 ? 12 : 14
  const start = GUTTER + SHEET_PAD
  // Four whole tiles, then 60% of Bank before the tile edge: its label in
  // view, the rest of the tile clearly cut, never a sliver
  const tile = Math.floor((width - start - 4 * gap) / 4.6)
  // One 16px inset on every side of a method tile (the CSS), clearly an
  // indent from the sheet's "Pay with", never a near miss. The label is as
  // large as the longest one, "Google Pay", allows inside that inset
  const inset = 16
  // (The narrow list's rows are full width: their label is a plain 15px)
  const label = narrow ? 15 : Math.min(18, Math.floor((tile - 2 * inset) / 5.8))
  const tileH = inset * 2 + Math.round(label * 1.3)
  // Wide, the whole sheet is drawn large, not only the row: a bigger lockup,
  // eyebrow and button, so the component fills its tile
  const big = !narrow && width >= 700
  const logo = big ? 22 : 18
  const lockupH = logo + 4 + (big ? 16 : 14)
  const eyebrowH = big ? 18 + 20 + 12 : 16 + 17 + 10
  const buttonH = big ? 54 : 46
  const row = 4 * tile + 3 * gap
  // Lockup, eyebrow, the row, the button: roughly the sheet's content, only to
  // keep the stage tall enough. The sheet itself is anchored to the tile's
  // foot in CSS, so its button always ends 32px above the crop, whatever the
  // type measures; each layout's row height keeps the copy close above it.
  const content = narrow ? 16 + 36 + 14 + 41 + 5 * 46 + 4 * 6 + 14 + 46 : SHEET_PAD + lockupH + 14 + eyebrowH + tileH + (big ? 18 : 16) + buttonH
  const height = Math.max(slotH, content + 52)
  return (
    <Tile
      area="way"
      lead="Pay your way."
      label="The OnePoket sheet's payment methods: Card, Apple Pay, Google Pay, Cash App and Bank. Picking Apple Pay turns the Pay button black: Pay with Apple Pay."
      picture={
        <div ref={slot} className="fb-picture fb-picture--fill">
          <Stage<Beat> width={width} height={height} initial={before} poster={after} play="once" script={beat(0)} {...stageLook} className="fb-stage fb-way">
            {(s) => {
              const selected = s.on ? 'apple' : 'card'
              return (
              <div
                className="fw-sheet"
                data-narrow={narrow || undefined}
                data-big={big || undefined}
                style={{
                  ['--tile' as string]: `${tile}px`,
                  ['--tile-h' as string]: `${tileH}px`,
                  ['--label' as string]: `${label}px`,
                  ['--gap' as string]: `${gap}px`,
                  ['--row' as string]: `${row}px`,
                }}
              >
                <div className="fw-brand">
                  <PoketLogo height={logo} className="fw-logo" />
                  <Text className="fw-by">by CentryOS</Text>
                </div>
                <Text className="fw-eyebrow">Pay with</Text>
                <div className="fw-methods">
                  {METHODS.map((m) => (
                    <span key={m.key} className="fw-method" data-on={m.key === selected || undefined}>
                      <Text className="fw-label">{m.label}</Text>
                    </span>
                  ))}
                </div>
                {/* One button: its colour eases and its label crossfades, the
                    old one gone before the new one arrives */}
                <span className="fw-pay" data-m={selected}>
                  {METHODS.map((m) => (
                    <span key={m.key} className="fw-pay-label" data-on={m.key === selected || undefined}>
                      {BUTTONS[m.key]}
                    </span>
                  ))}
                </span>
              </div>
              )
            }}
          </Stage>
        </div>
      }
    >
      Each order is charged to the method you pick.
    </Tile>
  )
}
