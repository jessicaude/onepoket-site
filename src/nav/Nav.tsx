import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { PoketLogo } from '../brand/PoketLogo'
import './nav.css'

// The site nav, on every page. Clear over the top of the page, a solid
// page-coloured bar with a hairline once it scrolls. On the legal pages it
// adds "Back to OnePoket", and on the Terms page the Customer | Partners
// switch (a tablist: Left and Right move between the two, as tabs do).

export type TermsDoc = 'customer' | 'partners'

type Props =
  | { page: 'home' }
  | { page: 'privacy' }
  | { page: 'terms'; doc: TermsDoc; onDoc: (doc: TermsDoc) => void; panelId: string }

export function Nav(props: Props) {
  const scrolled = useScrolled()
  const home = props.page === 'home'
  return (
    <header className="nav" data-scrolled={scrolled || undefined}>
      <div className="wrap nav-in">
        <a className="nav-logo" href={home ? '#top' : '/'} aria-label="OnePoket, home">
          <PoketLogo height={30} />
        </a>
        {props.page === 'terms' && <DocSwitch doc={props.doc} onDoc={props.onDoc} panelId={props.panelId} />}
        <span className="nav-sp" />
        {!home && (
          <a className="nav-back" href="/" aria-label="Back to OnePoket">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
              <path d="M8 2.5 4 6.5l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="nav-back-l" aria-hidden>
              Back to{' '}
              <span className="op">
                One<b>Poket</b>
              </span>
            </span>
          </a>
        )}
        <a className="nav-biz" data-page={props.page} href="https://centryos.xyz/">
          For businesses
        </a>
      </div>
    </header>
  )
}

const DOCS: { key: TermsDoc; label: string }[] = [
  { key: 'customer', label: 'Customer' },
  { key: 'partners', label: 'Partners' },
]

// The Customer | Partners switch: the knob slides under the chosen tab
function DocSwitch({ doc, onDoc, panelId }: { doc: TermsDoc; onDoc: (doc: TermsDoc) => void; panelId: string }) {
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const [knob, setKnob] = useState<{ x: number; w: number } | null>(null)
  useEffect(() => {
    const measure = () => {
      const tab = tabs.current[DOCS.findIndex((d) => d.key === doc)]
      if (tab) setKnob({ x: tab.offsetLeft - 3, w: tab.offsetWidth })
    }
    measure()
    document.fonts?.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [doc])
  const keys = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Home' && e.key !== 'End') return
    e.preventDefault()
    const to = e.key === 'Home' ? 0 : e.key === 'End' ? DOCS.length - 1 : (i + (e.key === 'ArrowRight' ? 1 : DOCS.length - 1)) % DOCS.length
    onDoc(DOCS[to]!.key)
    tabs.current[to]?.focus()
  }
  return (
    <div className="mode-tog" role="tablist" aria-label="Choose terms">
      {knob && <span className="mode-knob" style={{ transform: `translateX(${knob.x}px)`, width: knob.w }} />}
      {DOCS.map((d, i) => (
        <button
          key={d.key}
          ref={(el) => {
            tabs.current[i] = el
          }}
          id={`tab-${d.key}`}
          type="button"
          role="tab"
          aria-selected={doc === d.key}
          aria-controls={panelId}
          tabIndex={doc === d.key ? 0 : -1}
          onClick={() => onDoc(d.key)}
          onKeyDown={(e) => keys(e, i)}
        >
          {d.label}
        </button>
      ))}
    </div>
  )
}

function useScrolled() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 4)
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])
  return scrolled
}
