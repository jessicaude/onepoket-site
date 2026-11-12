import { useLayoutEffect, useMemo, useState, type CSSProperties } from 'react'
import { Bar, Check, Stage, Text, type Act } from '../kit'
import { useFontsReady } from '../brand/fonts'
import { PoketLogo } from '../brand/PoketLogo'
import './network.css'

// Section 3, the network. Layout: many of one (the stageshow `many-of-one`
// gold). Store checkouts, each with the OnePoket sheet at its foot, in a grid
// that runs off every edge of a full-bleed band; one store in focus, Kola
// Books, where Ada pays.
//
// What keeps the repetition an image, not a wall (from the gold):
// - One anatomy at one size: a wordmark, two order lines, the sheet with its
//   Pay button. Only the wordmarks and bar lengths vary.
// - Every edge cuts a tile by about half, never to a sliver: the grid's
//   offset is chosen per width (`place`, below).
// - The focus tile stays in its cell and comes forward: drawn a little
//   larger, with the hero shadow and a ring in the brand green, while every
//   other store recedes, dimmed toward the band in both themes. It is the
//   only one with a full-colour sheet and real words inside it. The stores
//   nearest it show their wordmarks, quietly; further out, wordmarks are bars.
//   (The gold keeps the focus the same size; the review asked for more
//   presence, so it is 10% larger, a deliberate departure.)
//
// Story: one beat, once, as the band scrolls in: Ada's Pay button confirms on
// itself ("Pay $12.00" to "Paid $12.00"). Poster: paid.
//
// Real strings: the store wordmarks (fictional), Kola Books' two order lines
// ("The Salt Road" $7.50 and "River Notes" $4.50, which make the $12.00),
// "Welcome back, Ada" and the button. "by CentryOS" is left out at this
// size. The stores around the focus keep their bars.

const TILE_H = 224
const GAP = 16
const PITCH_Y = TILE_H + GAP
// The rows above and below the focus show a little over half a tile each,
// cut by the band's edges, with their middles (and their rails) in frame
const SHOW = 124
const HEIGHT = SHOW + GAP + TILE_H + GAP + SHOW
// The rail under each row of stores
const RAIL = 72

// The stores around the focus, by offset from it. Each wordmark is set its own
// simple way: a weight, a case, a tracking, an ink
type Mark = { name: string; style: CSSProperties }
// Only rows whose wordmarks show are named: the focus row, and the row
// under it, whose top half is in frame (the row above shows its foot)
const AROUND: Record<string, Mark> = {
  '-1,0': { name: 'Ilé Living', style: { fontWeight: 700, letterSpacing: '-0.03em', color: '#3a2a20' } },
  '1,0': { name: 'nori tea', style: { fontSize: 15, fontWeight: 600, letterSpacing: '-0.04em', color: '#2b4a3b' } },
  '-2,0': { name: 'Okra Kitchen', style: { fontWeight: 600, letterSpacing: '-0.02em', color: '#2e4128' } },
  '2,0': { name: 'Ayo Studio', style: { fontWeight: 700, letterSpacing: '-0.02em', color: '#2f2a3a' } },
  '0,1': { name: 'SABI MARKET', style: { fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#3b3324' } },
  '1,1': { name: 'Marula & Co.', style: { fontWeight: 500, letterSpacing: '0.01em', color: '#46302a' } },
  '-1,1': { name: 'lumo lamps', style: { fontSize: 14, fontWeight: 700, letterSpacing: '-0.05em', color: '#3d3a22' } },
  '2,1': { name: 'Tide Swim', style: { fontWeight: 600, letterSpacing: '0.02em', color: '#20364a' } },
}

type S = { paid: boolean }
const initial: S = { paid: false }
const poster: S = { paid: true }

async function script(a: Act<S>) {
  await a.wait(1200)
  a.mark('paid')
  await a.set({ paid: true })
}

// Where the focus tile goes across a band `width` wide, and how wide the tiles
// are: near the middle, whole with room around it, and placed so both side
// edges cut a tile close to half, never to a sliver and never by too little.
// No one tile width manages that at every page width (at 768, 200px tiles
// leave slivers or barely-cut edges), so the width may flex from 184 to 228,
// as close to 200 as the edges allow. Searched once per width.
function place(width: number) {
  let best = { tileW: 200, left: Math.round(width / 2 - 100), score: Infinity }
  for (let tileW = 184; tileW <= 228; tileW += 4) {
    const pitch = tileW + GAP
    // How much of the tile that crosses `edge` shows, as a share of a tile:
    // 0.5 is ideal; a gap at the edge or a sliver scores worst
    const cut = (x0: number, edge: number) => {
      for (let k = -14; k <= 14; k++) {
        const x = x0 + k * pitch
        if (x < edge && x + tileW > edge) return edge === 0 ? (x + tileW) / tileW : (edge - x) / tileW
      }
      return 0
    }
    for (let left = 32; left <= width - tileW - 32; left++) {
      if (Math.abs(left + tileW / 2 - width / 2) > pitch * 0.75) continue
      const score = Math.max(Math.abs(cut(left, 0) - 0.5), Math.abs(cut(left, width) - 0.5)) + Math.abs(tileW - 200) / 400
      if (score < best.score) best = { tileW, left, score }
    }
  }
  return best
}

function useBandWidth() {
  const [band, ref] = useState<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(1280)
  useLayoutEffect(() => {
    if (!band) return
    const measure = () => setWidth(Math.round(band.getBoundingClientRect().width))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(band)
    return () => ro.disconnect()
  }, [band])
  return [ref, width] as const
}

export function Network() {
  const fonts = useFontsReady()
  const [band, width] = useBandWidth()
  const { tileW, left: focusLeft } = useMemo(() => place(width), [width])
  const pitchX = tileW + GAP
  const focusTop = SHOW + GAP
  const first = Math.floor(-focusLeft / pitchX) - 1
  const last = Math.ceil((width - focusLeft) / pitchX)
  const cols = Array.from({ length: last - first + 1 }, (_, i) => first + i)
  return (
    <section className="nw" aria-labelledby="nw-title">
      <div className="wrap">
        <h2 className="nw-title" id="nw-title">
          Pay the same way at every store.
        </h2>
        <p className="nw-sub">
          Works at stores on the CentryOS network that offer{' '}
          <span className="op">
            One<b>Poket</b>
          </span>
          .
        </p>
      </div>
      <div
        ref={band}
        className="nw-band"
        role="img"
        aria-label="Many store checkouts, each with the OnePoket sheet. In the middle, Ada pays Kola Books $12.00 in one tap."
      >
        {fonts && (
          <Stage<S> width={width} height={HEIGHT} initial={initial} poster={poster} play="once" script={script} theme="light" greys="cool" tokens={TOKENS} className="nw-stage">
            {(s) => (
              <>
                {/* The network itself: each row of stores sits on a faint
                    rail that runs edge to edge, seen in the gaps between
                    them, so the stores read as connected, not loose cards */}
                {[-1, 0, 1].map((row) => (
                  <span key={`rail${row}`} className="nw-rail" style={{ top: focusTop + row * PITCH_Y + (TILE_H - RAIL) / 2, height: RAIL }} />
                ))}
                {[-1, 0, 1].map((row) =>
                  cols.map((col) => {
                    const focus = row === 0 && col === 0
                    const left = focusLeft + col * pitchX
                    const style = { left, top: focusTop + row * PITCH_Y, width: tileW }
                    // A wordmark only where the whole store is in frame, never cut by an edge
                    const whole = left >= 0 && left + tileW <= width
                    return focus ? (
                      <FocusStore key={`${col},${row}`} style={style} paid={s.paid} />
                    ) : (
                      <Store key={`${col},${row}`} style={style} mark={whole ? AROUND[`${col},${row}`] : undefined} seed={Math.abs(col * 7 + row * 3)} />
                    )
                  }),
                )}
              </>
            )}
          </Stage>
        )}
      </div>
    </section>
  )
}

const TOKENS = {
  '--ss-accent': '#0A5C48',
  '--ss-accent-soft': '#EAF5F1',
  '--ss-success': '#0A5C48',
  '--ss-font': "'Geist', system-ui, -apple-system, sans-serif",
  '--ss-mono': "'Geist Mono', ui-monospace, monospace",
}

// Order-line bar widths that fit the narrowest tile's line
const LINES = [
  [76, 54, 26],
  [64, 62, 24],
  [82, 46, 28],
  [58, 58, 26],
]

// A quiet store: its wordmark (or a bar, further out), two order lines, and
// the OnePoket sheet with its Pay button, all in muted tones
function Store({ style, mark, seed }: { style: CSSProperties; mark?: Mark; seed: number }) {
  const [a, b, c] = LINES[seed % LINES.length]!
  const [d, , f] = LINES[(seed + 2) % LINES.length]!
  return (
    <div className="nw-store" style={style}>
      <div className="nw-head">{mark ? <Text className="nw-mark" style={mark.style}>{mark.name}</Text> : <Bar w={60 + (seed % 4) * 10} h={8} r={4} tone={3} />}</div>
      <div className="nw-lines">
        <span className="nw-line">
          <span className="nw-thumb" />
          <Bar w={a} h={6} tone={2} />
          <Bar w={c} h={6} tone={2} />
        </span>
        <span className="nw-line">
          <span className="nw-thumb" />
          <Bar w={d} h={6} tone={2} />
          <Bar w={f} h={6} tone={2} />
        </span>
      </div>
      <div className="nw-sheet">
        <PoketLogo height={11} className="nw-logo" />
        <Bar w={b} h={6} tone={2} />
        <span className="nw-pay" />
      </div>
    </div>
  )
}

// Kola Books, where Ada pays: the same anatomy, in full colour, with words
function FocusStore({ style, paid }: { style: CSSProperties; paid: boolean }) {
  return (
    <div className="nw-store nw-store--focus" style={style}>
      <div className="nw-head">
        <Text className="nw-mark nw-mark--kola">Kola Books</Text>
      </div>
      <div className="nw-lines">
        <span className="nw-line">
          <span className="nw-thumb nw-thumb--book" />
          <Text className="nw-item">The Salt Road</Text>
          <Text className="nw-price">$7.50</Text>
        </span>
        <span className="nw-line">
          <span className="nw-thumb nw-thumb--book2" />
          <Text className="nw-item">River Notes</Text>
          <Text className="nw-price">$4.50</Text>
        </span>
      </div>
      <div className="nw-sheet nw-sheet--focus">
        <PoketLogo height={11} className="nw-logo" />
        <Text className="nw-hello">Welcome back, Ada</Text>
        <span className="nw-pay nw-pay--focus" data-paid={paid || undefined}>
          <span className="nw-pay-layer" data-on={!paid || undefined}>
            <span>
              Pay <span className="nw-amt">$12.00</span>
            </span>
          </span>
          <span className="nw-pay-layer" data-on={paid || undefined}>
            <Check on={paid} size={13} className="nw-pay-check" />
            <span>
              Paid <span className="nw-amt">$12.00</span>
            </span>
          </span>
        </span>
      </div>
    </div>
  )
}
