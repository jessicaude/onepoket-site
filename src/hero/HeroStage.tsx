import { Avatar, Bar, Check, Stage, Text, Window, type Act } from '../kit'
import { PoketLogo } from '../brand/PoketLogo'
import './hero-stage.css'

// Section 1, the hero. Layout: overlapping windows (from the `overlap` gold),
// timed like `hero-demo` and `form-error`.
//
// No plate: the page is the ground. Ilé Living's checkout page is the window
// behind, pinned top, running off the page's right edge and the hero
// section's foot (not the stage's), cut hard at both. Steps on the left, the
// order summary in a tinted panel on the right. The OnePoket sheet sits in
// front over the page's payment step, straddling the window's left edge.
// Contact and delivery are done; the sheet is step three.
//
// Story: a returning shopper on a known device. The card is already saved, so
// the cursor goes straight to Pay. The button presses, turns pending, then
// confirms on itself ("Paid $23.40") and the page's payment step ticks a beat
// later. The cursor stays on the button. Plays once; the poster is the paid
// state.
//
// Real strings: the store wordmark, the steps, the order lines and total,
// "by CentryOS", "Welcome back, Ada", "Visa ending 4242" and the button. The
// store's nav is filler.

type S = { sending: boolean; paid: boolean; stepDone: boolean }

const initial: S = { sending: false, paid: false, stepDone: false }
const poster: S = { sending: true, paid: true, stepDone: true }

const AMOUNT = '23.40'

// The order lines from reference/onepoket-website.html
const ITEMS = [
  { name: 'Adire throw cushion', sub: 'Indigo, qty 2', price: '$15.80', thumb: 'adire' },
  { name: 'Raffia table runner', sub: 'Natural', price: '$6.40', thumb: 'raffia' },
  { name: 'Delivery', sub: 'Lagos, 2 to 3 days', price: '$1.20', thumb: 'ship' },
]

async function script(a: Act<S>) {
  await a.wait(1400)
  a.mark('aim')
  // Aim right of the label so the cursor never sits on the words it presses
  await a.move({ at: 'pay', x: 0.84, y: 0.62 })
  await a.wait(350)
  a.mark('press')
  await a.click()
  a.put({ sending: true })
  await a.wait(1300)
  a.mark('paid')
  a.put({ paid: true })
  await a.wait(450)
  a.put({ stepDone: true })
  // The cursor stays where it tapped, on the paid button, through the payoff
  await a.wait(2400)
}

export function HeroStage() {
  return (
    <Stage
      width={660}
      height={484}
      compact={{ below: 600, width: 374, height: 344 }}
      initial={initial}
      poster={poster}
      script={script}
      play="once"
      // Product surfaces stay light in both page themes (BRIEF.md, Look)
      theme="light"
      greys="cool"
      tokens={{
        '--ss-accent': '#0A5C48',
        '--ss-accent-soft': '#EAF5F1',
        '--ss-accent-text': '#0A5C48',
        '--ss-success': '#0A5C48',
        '--ss-font': "'Geist', system-ui, -apple-system, sans-serif",
        '--ss-mono': "'Geist Mono', ui-monospace, monospace",
      }}
      // Starts on the page clear of its words (beside Delivery; in the store
      // header on a phone), a short trip from Pay
      cursor={{ at: { wide: { x: 320, y: 180 }, compact: { x: 300, y: 60 } } }}
      className="hs"
    >
      {(s, _rect, layout) => {
        const compact = layout === 'compact'
        return (
          <>
            {/* Runs past the stage on the right and at the foot; the hero
                section clips it at the page edge and at its own foot */}
            <Window url="ileliving.com/checkout" className="hs-win">
              <div className="hs-page">
                <header className="hs-top">
                  <span className="hs-store">Ilé Living</span>
                  {!compact && (
                    <span className="hs-nav">
                      <Bar w={38} h={6} tone={2} />
                      <Bar w={46} h={6} tone={2} />
                      <Bar w={30} h={6} tone={2} />
                    </span>
                  )}
                </header>

                <div className="hs-body">
                  <section className="hs-steps">
                    {['Contact', 'Delivery'].map((step) => (
                      <div className="hs-step" key={step}>
                        <Check on size={16} className="hs-check" />
                        <Text className="hs-step-title hs-step-title--done">{step}</Text>
                      </div>
                    ))}
                    <div className="hs-step hs-step--now">
                      <Check on={s.stepDone} size={16} className="hs-check" />
                      <Text className="hs-step-title">Payment</Text>
                    </div>
                  </section>

                  {compact && <div className="hs-payarea" />}

                  {!compact && (
                    <aside className="hs-summary">
                      <div className="hs-summary-in">
                        <div className="hs-items">
                          {ITEMS.map((item) => (
                            <div className="hs-item" key={item.name}>
                              <span className={`hs-thumb hs-thumb--${item.thumb}`}>{item.thumb === 'ship' && <Truck />}</span>
                              <span className="hs-item-lines">
                                <Text className="hs-item-name">{item.name}</Text>
                                <Text className="hs-item-sub">{item.sub}</Text>
                              </span>
                              <Text className="hs-item-price">{item.price}</Text>
                            </div>
                          ))}
                        </div>
                        <div className="hs-total">
                          <Text className="hs-total-k">Total</Text>
                          <Text className="hs-total-v">{`$${AMOUNT}`}</Text>
                        </div>
                      </div>
                    </aside>
                  )}
                </div>
              </div>
            </Window>

            <section className="hs-sheet" aria-label="OnePoket">
              <div className="hs-brand">
                <PoketLogo height={18} className="hs-logo" />
                <Text className="hs-by">by CentryOS</Text>
              </div>
              <div className="hs-saved">
                <Avatar name="Ada" tone="accent" size={30} className="hs-av" />
                <span className="hs-saved-lines">
                  <Text className="hs-saved-t">Welcome back, Ada</Text>
                  <Text className="hs-saved-s">Visa ending 4242</Text>
                </span>
              </div>
              <span className="hs-pay" data-target="pay" data-cursor="pointer" data-paid={s.paid || undefined}>
                <span className="hs-layer" data-on={!s.sending || undefined}>
                  {/* One text run, so the word space isn't added to the layer's gap */}
                  <span>
                    Pay <span className="hs-amt">${AMOUNT}</span>
                  </span>
                </span>
                <span className="hs-layer" data-on={s.sending || undefined}>
                  <Check on={s.paid} pending={s.sending && !s.paid} size={15} className="hs-pay-check" />
                  {/* Left-aligned in a cell as wide as the longer label, so the
                      check never slides as the words change */}
                  <span className="hs-labels">
                    <span className="hs-label" data-on={!s.paid || undefined}>Paying</span>
                    <span className="hs-label" data-on={s.paid || undefined}>
                      Paid <span className="hs-amt">${AMOUNT}</span>
                    </span>
                  </span>
                </span>
              </span>
            </section>
          </>
        )
      }}
    </Stage>
  )
}

function Truck() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M1.5 4h8v6.5h-8zM9.5 6.5h3l2 2.5v1.5h-5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="4.5" cy="11.5" r="1.3" fill="#fff" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="11.5" r="1.3" fill="#fff" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}
