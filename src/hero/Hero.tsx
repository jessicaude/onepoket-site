import { useEffect, useRef, useState, type RefObject } from 'react'
import { useFontsReady } from '../brand/fonts'
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
  const scrolled = useScrolled()

  return (
    <>
      <header className="nav" data-scrolled={scrolled || undefined}>
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

// The nav is clear over the hero's top and turns solid once the page scrolls
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
