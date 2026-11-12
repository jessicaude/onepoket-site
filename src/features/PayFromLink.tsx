import { Bubble, Phone, Stage, Thread } from '../kit'
import { Tile, after, beat, before, stageLook, usePictureSize, type Beat } from './shared'

// Pay from a link. A phone at true size, a gutter from the tile's left and top,
// running off its right edge and its foot, open on Ilé Living's business chat.
// The store's message is there; the payment link arrives under it once. Both
// messages are the store's, so they sit on the left, clear of the right crop.
//
// Real strings (from reference/onepoket-website.html): "Ilé Living",
// "Business chat", the message, "Pay Ilé Living $23.40", "Payment link".

// One gutter, above and to the left, on the tiles' copy gutter
const TOP = 28
const LEFT = 28
// The pro frame at 1:1: a 402pt screen inside 13pt of band and glass a side
const PHONE = 402 + 2 * 13

export function PayFromLink() {
  const [slot, { width, height: slotH }] = usePictureSize(340, 320)
  // The thread ends just above the tile's foot, so the conversation pins to
  // what shows, not to the part of the screen the crop hides
  const height = Math.max(slotH, 300)
  const thread = Math.round(height - TOP - 13 - 62 - 64 - 14)
  return (
    <Tile
      area="link"
      lead="Pay from a link."
      label="A phone open on Ilé Living's business chat. A payment link for $23.40 arrives under the store's message."
      picture={
        <div ref={slot} className="fb-picture fb-picture--fill">
          <Stage<Beat> width={width} height={height} initial={before} poster={after} play="once" script={beat(1)} {...stageLook} className="fb-stage fb-link">
            {(s) => (
              <Phone width={PHONE} className="fl-phone" style={{ top: TOP, left: LEFT }}>
                <div className="fl-app">
                  <header className="fl-head">
                    <span className="fl-back" aria-hidden>
                      <svg viewBox="0 0 12 20" width="12" height="20">
                        <path d="M10 2 2 10l8 8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="fl-who">
                      <b>Ilé Living</b>
                      <small>Business chat</small>
                    </span>
                  </header>
                  <Thread app="imessage" className="fl-thread" style={{ height: thread }}>
                    <Bubble from="them">Hi Ada, your cushions are ready. Here's the link to pay.</Bubble>
                    {s.on && (
                      <Bubble from="them" className="fl-linkbubble">
                        <span className="fl-link">
                          <span className="fl-link-icon" aria-hidden>
                            <svg viewBox="0 0 16 16" width="18" height="18" fill="none">
                              <path d="M6.6 9.4a2.6 2.6 0 0 0 3.7 0l2.2-2.2a2.6 2.6 0 0 0-3.7-3.7l-.8.8M9.4 6.6a2.6 2.6 0 0 0-3.7 0L3.5 8.8a2.6 2.6 0 0 0 3.7 3.7l.8-.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </span>
                          <span className="fl-link-text">
                            <b>
                              Pay Ilé Living <span className="fl-amt">$23.40</span>
                            </b>
                            <small>Payment link</small>
                          </span>
                        </span>
                      </Bubble>
                    )}
                  </Thread>
                </div>
              </Phone>
            )}
          </Stage>
        </div>
      }
    >
      Open a store's payment link and pay with{' '}
      <span className="op">
        One<b>Poket</b>
      </span>{' '}
      the same way.
    </Tile>
  )
}
