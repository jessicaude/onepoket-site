import { useEffect, useRef } from 'react'
import privacy from './content/privacy.html?raw'
import termsCustomer from './content/terms-customer.html?raw'
import termsPartners from './content/terms-partners.html?raw'
import type { TermsDoc } from '../nav/Nav'
import './legal.css'

// The legal pages: Privacy Policy (/privacy), Terms of Use (/terms) and the
// Payment Partners terms (/terms/partners), behind the Customer | Partners
// switch in the nav.
//
// The documents are reference/onepoket-website.html's own markup, copied out
// verbatim into ./content (masthead, contents list, clauses). Only links to
// the other legal pages changed, from "#terms" and "#privacy" to the routes.
// No legal wording is edited here or in the files.

const DOCS = { privacy, customer: termsCustomer, partners: termsPartners }

export function LegalDoc({ doc, panel }: { doc: 'privacy' | TermsDoc; panel?: { id: string; labelledBy: string } }) {
  const root = useRef<HTMLDivElement>(null)

  // The contents list marks the clause being read, as the reference does
  useEffect(() => {
    const el = root.current
    if (!el) return
    const links = new Map<string, HTMLAnchorElement>()
    el.querySelectorAll<HTMLAnchorElement>('.toc a[href^="#"]').forEach((a) => links.set(a.getAttribute('href')!.slice(1), a))
    const seen = new Map<string, boolean>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.isIntersecting)
        const current = [...el.querySelectorAll<HTMLElement>('.clause')].find((c) => seen.get(c.id))
        links.forEach((a, id) => {
          const on = id === current?.id
          a.classList.toggle('on', on)
          if (on) a.setAttribute('aria-current', 'location')
          else a.removeAttribute('aria-current')
        })
      },
      { rootMargin: '-90px 0px -60% 0px' },
    )
    el.querySelectorAll('.clause').forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [doc])

  return (
    <main className="legal">
      <div
        ref={root}
        className="wrap"
        role={panel ? 'tabpanel' : undefined}
        id={panel?.id}
        aria-labelledby={panel?.labelledBy}
        // Static, first-party markup from the reference file
        dangerouslySetInnerHTML={{ __html: DOCS[doc] }}
      />
    </main>
  )
}
