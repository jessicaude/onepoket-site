import { useEffect, useState } from 'react'
import { Faq } from './faq/Faq'
import { Features } from './features/Features'
import { Footer } from './footer/Footer'
import { Hero } from './hero/Hero'
import { LegalDoc } from './legal/Legal'
import { Nav, type TermsDoc } from './nav/Nav'
import { Network } from './network/Network'

// Real routes, so each page can be shared: / (the home page), /privacy,
// /terms and /terms/partners. Links between pages are ordinary links; the
// host serves index.html for every route (vercel.json; Vite does it in dev
// and preview). Sections are added one at a time (reference/BRIEF.md).

type Route = { page: 'home' } | { page: 'privacy' } | { page: 'terms'; doc: TermsDoc }

function routeOf(path: string): Route {
  const p = path.replace(/\/+$/, '') || '/'
  if (p === '/privacy') return { page: 'privacy' }
  if (p === '/terms') return { page: 'terms', doc: 'customer' }
  if (p === '/terms/partners') return { page: 'terms', doc: 'partners' }
  return { page: 'home' }
}

const TITLES = {
  home: 'OnePoket | Check out in one tap',
  privacy: 'Privacy Policy | OnePoket',
  customer: 'Terms of Use | OnePoket',
  partners: 'Payment Partners Terms | OnePoket',
}

function App() {
  const [route, setRoute] = useState<Route>(() => routeOf(window.location.pathname))

  // Back and forward between /terms and /terms/partners
  useEffect(() => {
    const pop = () => setRoute(routeOf(window.location.pathname))
    window.addEventListener('popstate', pop)
    return () => window.removeEventListener('popstate', pop)
  }, [])

  useEffect(() => {
    document.title = TITLES[route.page === 'terms' ? route.doc : route.page]
  }, [route])

  // Arriving at /#how or /#faq from another page: the sections render after
  // the browser's own jump to the hash, so go there once they exist
  useEffect(() => {
    if (route.page !== 'home' || !window.location.hash) return
    const id = decodeURIComponent(window.location.hash.slice(1))
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
  }, [route.page])

  if (route.page === 'privacy') {
    return (
      <>
        <Nav page="privacy" />
        <LegalDoc doc="privacy" />
        <Footer />
      </>
    )
  }

  if (route.page === 'terms') {
    // The switch changes the document and the address without a reload
    const onDoc = (doc: TermsDoc) => {
      if (doc === route.doc) return
      window.history.pushState(null, '', doc === 'partners' ? '/terms/partners' : '/terms')
      setRoute({ page: 'terms', doc })
      window.scrollTo({ top: 0 })
    }
    return (
      <>
        <Nav page="terms" doc={route.doc} onDoc={onDoc} panelId="terms-doc" />
        <LegalDoc doc={route.doc} panel={{ id: 'terms-doc', labelledBy: `tab-${route.doc}` }} />
        <Footer />
      </>
    )
  }

  return (
    <>
      <Nav page="home" />
      <main>
        <Hero />
        <Features />
        <Network />
        <Faq />
      </main>
      <Footer />
    </>
  )
}

export default App
