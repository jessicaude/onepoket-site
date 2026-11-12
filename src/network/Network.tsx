import { useLayoutEffect, useState, type CSSProperties } from 'react'
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
// Real strings: the store wordmarks (fictional), "Welcome back, Ada" and the
// button. "by CentryOS" is left out at this size.

const TILE_W = 200
const TILE_H = 224
const GAP = 16
const PITCH_X = TILE_W + GAP
const PITCH_Y = TILE_H + GAP
// The rows above and below the focus show about half a tile each
const SHOW = 112
const HEIGHT = SHOW + GAP + TILE_H + GAP + SHOW

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

// Where the focus tile goes across a band `width` wide: near the middle,
// whole with room around it, and placed so both side edges cut a tile close
// to half. Tried in 4px steps; the best both-edges score wins.
function place(width: number) {
  const cut = (x0: number, edge: number) => {
    // How much of the tile that crosses `edge` shows, as a share of a tile:
    // 0.5 is ideal; a gap at the edge or a sliver scores worst
    for (let k = -12; k <= 12; k++) {
      const x = x0 + k * PITCH_X
      if (x < edge && x + TILE_W > edge) return edge === 0 ? (x + TILE_W) / TILE_W : (edge - x) / TILE_W
    }
    return 0
  }
  let best = { left: Math.round(width / 2 - TILE_W / 2), score: Infinity }
  for (let left = 32; left <= width - TILE_W - 32; left += 4) {
    const centre = left + TILE_W / 2
    if (Math.abs(centre - width / 2) > Math.max(PITCH_X / 2, width * 0.18)) continue
    const score = Math.max(Math.abs(cut(left, 0) - 0.5), Math.abs(cut(left, width) - 0.5))
    if (score < best.score) best = { left, score }
  }
  return best.left
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
  const focusLeft = place(width)
  const focusTop = SHOW + GAP
  const first = Math.floor(-focusLeft / PITCH_X) - 1
  const last = Math.ceil((width - focusLeft) / PITCH_X)
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
                {[-1, 0, 1].map((row) =>
                  cols.map((col) => {
                    const focus = row === 0 && col === 0
                    const style = { left: focusLeft + col * PITCH_X, top: focusTop + row * PITCH_Y }
                    return focus ? (
                      <FocusStore key={`${col},${row}`} style={style} paid={s.paid} />
                    ) : (
                      <Store key={`${col},${row}`} style={style} mark={AROUND[`${col},${row}`]} seed={Math.abs(col * 7 + row * 3)} />
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

const LINES = [
  [92, 54, 30],
  [78, 64, 26],
  [104, 46, 34],
  [70, 58, 28],
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
          <Bar w={84} h={6} tone={3} />
          <Bar w={28} h={6} tone={3} />
        </span>
        <span className="nw-line">
          <span className="nw-thumb nw-thumb--book2" />
          <Bar w={66} h={6} tone={3} />
          <Bar w={24} h={6} tone={3} />
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
