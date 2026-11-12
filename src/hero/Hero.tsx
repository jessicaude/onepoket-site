import { useEffect, useRef, useState, type RefObject } from 'react'
import { PoketLogo } from '../brand/PoketLogo'
import { HeroStage } from './HeroStage'
import './hero.css'

// Section 1. Page copy stays outside the Stage; the Stage is the picture.
export function Hero() {
  // The Stage has no replay handle: remount it at the story boundary
  const [take, setTake] = useState(0)
  const fontsReady = useFontsReady()
  const picture = useRef<HTMLDivElement>(null)
  useBleed(picture, fontsReady)

  return (
    <>
      <header className="nav">
        <div className="wrap nav-in">
          <a className="nav-logo" href="#top">
            <PoketLogo height={30} />
          </a>
          <a className="nav-biz" href="https://centryos.xyz/">
            For businesses
          </a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="hero-pill">
              Built on <b>CentryOS</b>
            </span>
            <h1 className="hero-h1">
              <span>Check out</span> <span>in one tap.</span>
            </h1>
            <p className="hero-lede">
              Save a card, bank account, Apple Pay, Google Pay or Cash App once. Then pay at any store that offers{' '}
              <span className="op">
                One<b>Poket</b>
              </span>
              , without typing it in again.
            </p>
            <div className="hero-cta">
              <a className="btn btn-fill" href="#how">
                See how it works
              </a>
              <a className="btn btn-line" href="#faq">
                Questions
              </a>
            </div>
          </div>

          {/* Replay sits above the picture: the picture runs to the hero's foot */}
          <figure className="hero-figure">
            <button className="replay" type="button" onClick={() => setTake((t) => t + 1)}>
              <i aria-hidden>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M10 6a4 4 0 1 1-1.2-2.85M10 1.5v2.2H7.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </i>
              Replay
            </button>
            <div ref={picture} className="hero-picture" data-ready={fontsReady || undefined} role="img" aria-label="A returning shopper pays Ilé Living in one tap with OnePoket. The saved Visa card is charged $23.40 and the payment confirms on the sheet.">
              {fontsReady && <HeroStage key={take} />}
            </div>
          </figure>
        </div>
      </section>
    </>
  )
}

// The store window runs off the page's right edge, not the stage's: tell the
// scene, in its own design pixels, how far the page goes past the stage, so
// the window is always long enough to reach the screen edge at any width
function useBleed(picture: RefObject<HTMLDivElement | null>, ready: boolean) {
  useEffect(() => {
    const host = picture.current
    if (!host || !ready) return
    let frame = 0
    const measure = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const stage = host.querySelector<HTMLElement>('.ss-stage')
        if (!stage || !stage.offsetWidth) return
        const box = stage.getBoundingClientRect()
        const scale = box.width / stage.offsetWidth
        const bleed = Math.max(0, document.documentElement.clientWidth - box.right) / scale
        host.style.setProperty('--hs-bleed', `${Math.ceil(bleed)}px`)
      })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(host)
    window.addEventListener('resize', measure)
    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [picture, ready])
}

// The stage measures its text, so it starts once the web fonts are in: text
// that reflows when Geist arrives would shift under the first beat. Falls
// back after 1.5s so a blocked font never holds the picture back.
function useFontsReady() {
  // Not seeded from document.fonts.status: before the stylesheet arrives it
  // already reads 'loaded', since nothing is pending yet
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (ready) return
    let live = true
    const done = () => live && setReady(true)
    const timer = window.setTimeout(done, 1500)
    // fonts.ready resolves before the Google stylesheet has declared any face,
    // so wait for the stylesheet, then load the faces the scene draws with
    const link = document.querySelector<HTMLLinkElement>('link[href*="fonts.googleapis.com/css2"]')
    const sheet = !link || link.sheet ? Promise.resolve() : new Promise((go) => link.addEventListener('load', go, { once: true }))
    sheet
      .then(() => Promise.all(['400 16px Geist', '600 16px Geist', '700 16px Geist', '600 16px "Geist Mono"'].map((f) => document.fonts.load(f))))
      .then(done, done)
    return () => {
      live = false
      window.clearTimeout(timer)
    }
  }, [ready])
  return ready
}
