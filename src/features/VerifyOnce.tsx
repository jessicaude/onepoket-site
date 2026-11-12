import { Check, Stage, Text, type Act } from '../kit'
import { LEAD, STEP, Tile, stageLook, usePictureSize } from './shared'

// Verify once. A diagram, not a screen: three stores on one dashed line, the
// network, which runs on past the tile's foot. One identity travels it: an
// "Ada, verified" badge starts at Ilé Living, where she checked her ID first,
// and lands on Kola Books, then Nori Tea. Each store it has visited keeps a
// tick, drawn inside its card; the stores still ahead show an empty ring.
//
// Real strings: the three store wordmarks and "Ada, verified".

const PAD = 28
const TOP = 20
const CARD_H = 52
const STORES = [
  { name: 'Ilé Living', mark: 'ile' },
  { name: 'Kola Books', mark: 'kola' },
  { name: 'nori tea', mark: 'nori' },
]

type V = { at: number }
const initial: V = { at: 0 }
const poster: V = { at: 2 }

// Tile 2 in reading order: its beat starts 2 × STEP after the grid's first
async function script(a: Act<V>) {
  await a.wait(LEAD + 2 * STEP)
  a.mark('kola')
  await a.set({ at: 1 })
  await a.wait(1000)
  a.mark('nori')
  await a.set({ at: 2 })
}

export function VerifyOnce() {
  const [slot, { width, height: slotH }] = usePictureSize(340, 260)
  const card = width - 2 * PAD
  const height = Math.max(slotH, TOP + 2 * 64 + CARD_H + 40)
  // The stores spread down the tile, so the diagram fills it; the line runs
  // on past the last one, off the foot
  const step = Math.min(96, Math.max(64, Math.floor((height - TOP - CARD_H - 40) / 2)))
  return (
    <Tile
      area="verify"
      lead="Verify once."
      label="A diagram of stores on the network. Ada's verified identity starts at Ilé Living and is carried to Kola Books, then Nori Tea."
      picture={
        <div ref={slot} className="fb-picture fb-picture--fill">
          <Stage<V> width={width} height={height} initial={initial} poster={poster} play="once" script={script} {...stageLook} className="fb-stage fb-verify">
            {(s) => (
              <div className="fv" style={{ ['--card' as string]: `${card}px`, ['--step' as string]: `${step}px` }}>
                {/* The network: one line through every store's badge spot */}
                <span className="fv-line" style={{ top: TOP + CARD_H / 2, height: height - TOP }} />
                {STORES.map((store, i) => (
                  <span key={store.mark} className="fv-store" style={{ top: TOP + i * step }}>
                    <Text className={`fv-name fv-name--${store.mark}`}>{store.name}</Text>
                    {/* Visited: a tick inside the card. Ahead: an empty ring */}
                    <span className="fv-state" data-visited={i <= s.at || undefined}>
                      <span className="fv-ring" />
                      <Check on size={20} className="fv-tick" />
                    </span>
                  </span>
                ))}
                {/* The one identity, carried from store to store */}
                <span className="fv-badge" style={{ top: TOP + (CARD_H - 32) / 2, transform: `translateY(${s.at * step}px)` }}>
                  <Check on size={16} className="fv-badge-tick" />
                  <Text className="fv-badge-text">Ada, verified</Text>
                </span>
              </div>
            )}
          </Stage>
        </div>
      }
    >
      Your ID check carries over to every store on the network.
    </Tile>
  )
}
