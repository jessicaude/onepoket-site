import { Stage } from '../kit'
import { Tile, stageLook, usePictureSize } from './shared'

// The total you see. A statement tile, the grid's one accent: the tile is the
// brand-green Pay button itself, and the amount on it is set in display type,
// as wide as the tile allows. A still; the calm tile between two that move.
//
// Real strings: "Pay", "$23.40" (the order total in the reference demos).

const PAD = 28

export function TotalYouSee() {
  const [slot, { width, height }] = usePictureSize(340, 220)
  // The amount fills the line: Geist's tabular figures, with room
  const size = Math.min(96, Math.floor((width - 2 * PAD) / 3.4))
  return (
    <Tile
      area="total"
      lead="The total you see."
      label="A Pay button for $23.40, the amount in large type."
      picture={
        <div ref={slot} className="fb-picture fb-picture--fill">
          <Stage width={width} height={height} {...stageLook} className="fb-stage fb-total">
            {() => (
              <div className="ft-button" style={{ ['--amt' as string]: `${size}px` }}>
                <span className="ft-pay">Pay</span>
                <span className="ft-amt">$23.40</span>
              </div>
            )}
          </Stage>
        </div>
      }
    >
      The amount on the button is the amount you're charged.
    </Tile>
  )
}
