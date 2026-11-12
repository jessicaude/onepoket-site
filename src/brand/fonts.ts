import { useEffect, useState } from 'react'

// Stages measure their text, so they start once the web fonts are in: text
// that reflows when Geist arrives would shift under the first beat. Shared by
// every section, and asked once per page. Falls back after 1.5s so a blocked
// font never holds the pictures back.

// The faces the stages draw with
const FACES = ['400 16px Geist', '500 16px Geist', '600 16px Geist', '700 16px Geist', '800 16px Geist', '500 16px "Geist Mono"', '600 16px "Geist Mono"']

let ready = false
let waiting: Promise<void> | null = null

function whenFontsReady() {
  if (!waiting) {
    // fonts.ready resolves before the Google stylesheet has declared any face,
    // and fonts.status already reads 'loaded' before it arrives, so wait for
    // the stylesheet, then load the faces themselves
    const link = document.querySelector<HTMLLinkElement>('link[href*="fonts.googleapis.com/css2"]')
    const sheet = !link || link.sheet ? Promise.resolve() : new Promise((go) => link.addEventListener('load', go, { once: true }))
    const faces = sheet.then(() => Promise.all(FACES.map((f) => document.fonts.load(f)))).then(
      () => undefined,
      () => undefined,
    )
    const timeout = new Promise<void>((go) => window.setTimeout(go, 1500))
    waiting = Promise.race([faces, timeout]).then(() => {
      ready = true
    })
  }
  return waiting
}

export function useFontsReady() {
  const [done, setDone] = useState(ready)
  useEffect(() => {
    if (done) return
    let live = true
    whenFontsReady().then(() => live && setDone(true))
    return () => {
      live = false
    }
  }, [done])
  return done
}
