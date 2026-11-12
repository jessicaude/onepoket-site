import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import './faq.css'

// Section 4, Questions. Typography and layout only, no Stage. The heading
// holds a left column (and stays in view on desktop); the questions run in the
// right column. An accordion after the WAI pattern: each question is a real
// button with aria-expanded and aria-controls, each answer a labelled region;
// one open at a time; Enter and Space toggle (native buttons), Up, Down, Home
// and End move between questions. A closed answer is hidden from assistive
// tech and from the tab order.
//
// The six questions and answers are word for word from
// reference/onepoket-website.html, except answer 5, which drops its last
// sentence ("There's no balance to top up."): the brief rules out balances
// and top-ups, and the change was confirmed in review.

const QUESTIONS: { q: string; a: ReactNode }[] = [
  {
    q: 'What is OnePoket?',
    a: 'A faster way to pay at online stores. Save a payment method once, then pay at any store that offers OnePoket at checkout.',
  },
  {
    q: 'Do I need an account?',
    a: "Yes. You create one inside the store's checkout the first time you pay. It takes your email and a quick ID check. There's nothing to download.",
  },
  {
    q: 'Why do you check my ID?',
    a: 'Payment rules require us to know who is paying. You do it once, and it carries over to every store on the network.',
  },
  {
    q: 'Does the store see my card details?',
    a: 'No. The store receives your payment, not your card number.',
  },
  {
    q: 'Does OnePoket hold my money?',
    a: 'No. Each order is charged to the payment method you choose at checkout.',
  },
  {
    q: "Something's wrong with my order. What do I do?",
    a: (
      <>
        Contact the store first. If it isn't resolved, email <a href="mailto:support@onepoket.com">support@onepoket.com</a>. Report an unauthorised or incorrect payment within 60 days.
      </>
    ),
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(null)
  const base = useId()
  const buttons = useRef<(HTMLButtonElement | null)[]>([])

  // Up and Down move between questions, Home and End jump to the ends
  const move = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = QUESTIONS.length - 1
    const to = e.key === 'ArrowDown' ? (i === last ? 0 : i + 1) : e.key === 'ArrowUp' ? (i === 0 ? last : i - 1) : e.key === 'Home' ? 0 : e.key === 'End' ? last : null
    if (to === null) return
    e.preventDefault()
    buttons.current[to]?.focus()
  }

  return (
    <section className="faq" id="faq" aria-labelledby={`${base}-title`}>
      <div className="wrap faq-grid">
        <div className="faq-side">
          <h2 className="faq-title" id={`${base}-title`}>
            Questions
          </h2>
          <p className="faq-help">
            Something else? Email <a href="mailto:support@onepoket.com">support@onepoket.com</a>.
          </p>
        </div>
        <div className="faq-list">
          {QUESTIONS.map((item, i) => {
            const isOpen = open === i
            const button = `${base}-q${i}`
            const panel = `${base}-a${i}`
            return (
              <div className="faq-item" key={item.q} data-open={isOpen || undefined}>
                <h3 className="faq-q">
                  <button
                    ref={(el) => {
                      buttons.current[i] = el
                    }}
                    id={button}
                    type="button"
                    className="faq-btn"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => setOpen(isOpen ? null : i)}
                    onKeyDown={(e) => move(e, i)}
                  >
                    <span>{item.q}</span>
                    <svg className="faq-sign" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                </h3>
                <div className="faq-panel" id={panel} role="region" aria-labelledby={button}>
                  <div className="faq-panel-in">
                    <p className="faq-a">{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
