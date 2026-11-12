import { Bar, Stage, Text } from '../kit'
import { Tile, after, beat, before, stageLook, usePictureSize, type Beat } from './shared'

// If an order goes wrong. An object, after the tilted-stack gold: receipts
// dropped in a loose pile, small alternating angles, the top one straightest
// and the only one with words, readable from the first frame. It is a
// refund, back to the card that paid; its Refund tag arrives once. A centered
// composition on a fixed canvas, wider than any tile, so the tile's sides
// crop only empty ground. It starts one gap under the copy.
//
// Real strings: "Ayo Studio", "Refund", "Linen tote", "$18.00",
// "Back to Visa ending 4242".

// The pile's own extent, angles and offsets included; the gap above it,
// under the copy; and the gutter under it
const PILE = 204
const TOP = 20
// Filler on the cards under the top one, opaque, so where two cards' lines
// cross the overlap never paints darker
const FILL = { background: '#e6ecea' }
const GUTTER = 24

export function OrderWrong() {
  const [slot, { height: slotH }] = usePictureSize(360, 250)
  // One gap under the copy, a gutter under the pile; the canvas is as tall as
  // the slot, and any slack goes under the pile
  const height = Math.max(slotH, TOP + PILE + GUTTER)
  return (
    <Tile
      area="wrong"
      lead="If an order goes wrong."
      label="A pile of receipts. On top, a refund from Ayo Studio for $18.00, back to Visa ending 4242."
      picture={
        <div ref={slot} className="fb-picture fb-picture--canvas">
          <Stage<Beat> width={360} height={height} initial={before} poster={after} play="once" script={beat(4)} {...stageLook} className="fb-stage fb-wrong">
            {(s) => (
              <div className="fo-pile" style={{ top: TOP + PILE / 2 }}>
                <section className="fo-card fo-card--back">
                  <Bar w={84} h={8} style={FILL} />
                  <Bar w={128} h={6} style={FILL} />
                  <Bar w={104} h={6} style={FILL} />
                </section>
                <section className="fo-card fo-card--mid">
                  <Bar w={100} h={8} style={FILL} />
                  <Bar w={140} h={6} style={FILL} />
                  <Bar w={116} h={6} style={FILL} />
                </section>
                <section className="fo-card fo-card--top">
                  <div className="fo-head">
                    <Text className="fo-store">Ayo Studio</Text>
                    <Text className="fo-tag" data-on={s.on || undefined}>
                      Refund
                    </Text>
                  </div>
                  <div className="fo-item">
                    <Text>Linen tote</Text>
                    <Text className="fo-amt">$18.00</Text>
                  </div>
                  <Text className="fo-to">Back to Visa ending 4242</Text>
                </section>
              </div>
            )}
          </Stage>
        </div>
      }
    >
      Contact the store first. If it isn't sorted, we'll take it from there.
    </Tile>
  )
}
