import { OrderWrong } from './OrderWrong'
import { PayFromLink } from './PayFromLink'
import { PayYourWay } from './PayYourWay'
import { TotalYouSee } from './TotalYouSee'
import { VerifyOnce } from './VerifyOnce'
import './features.css'

// Section 2, the feature bento: "hero and strip", after the stageshow bento
// gold (references/bento.md). The tile list, written before any tile:
//
//   Tile                 Span   Kind        The one thing                        Moves
//   Pay your way         2 × 1  Component   the sheet's method row, large         selection Card to Apple Pay
//   Pay from a link      1 × 1  Hero UI     a phone on a store's chat             the payment link arrives
//   Verify once          1 × 1  Diagram     stores on one line, one mark          the mark is carried along
//   The total you see    1 × 1  Statement   the button amount in display type     still, the one green tile
//   If an order goes...  1 × 1  Object      a tilted pile of receipts, a refund   the refund settles on top
//
// Two UI tiles of five. One phone, no window chrome. Neighbours differ in
// kind across and down. No real string repeats from tile to tile. Each
// picture is its own Stage at 1:1; the copy is page text above it.

export function Features() {
  return (
    <section className="fb" id="how" aria-labelledby="fb-title">
      <div className="wrap">
        <h2 className="fb-title" id="fb-title">
          One account for every checkout.
        </h2>
        <div className="fb-grid">
          <PayYourWay />
          <PayFromLink />
          <VerifyOnce />
          <TotalYouSee />
          <OrderWrong />
        </div>
      </div>
    </section>
  )
}
