import { useLayoutEffect, useState, type ReactNode } from 'react'
import type { Act } from '../kit'
import { useFontsReady } from '../brand/fonts'

// The frame every tile shares (references/bento.md, rule 7): one radius, one
// padding, run-in copy at the top as page text, and a picture that is its own
// Stage, pinned to the tile's bottom and cropped by the tile.

// Each tile plays one beat, once, as the grid scrolls in, STEP after the tile
// before it in reading order (bento.md, rule 11)
export const STEP = 110
export const LEAD = 450

export type Beat = { on: boolean }
export const before: Beat = { on: false }
export const after: Beat = { on: true }
export const beat = (i: number) => async (a: Act<Beat>) => {
  await a.wait(LEAD + i * STEP)
  a.mark('beat')
  await a.set({ on: true })
}

// Every stage draws the product in its light colours, in both page themes
// (BRIEF.md, Look); the tile behind it follows the page
export const stageLook = {
  theme: 'light' as const,
  greys: 'cool' as const,
  tokens: {
    '--ss-accent': '#0A5C48',
    '--ss-accent-soft': '#EAF5F1',
    '--ss-accent-text': '#0A5C48',
    '--ss-success': '#0A5C48',
    '--ss-font': "'Geist', system-ui, -apple-system, sans-serif",
    '--ss-mono': "'Geist Mono', ui-monospace, monospace",
  },
}

export function Tile({ area, lead, children, picture, label }: { area: string; lead: string; children: ReactNode; picture: ReactNode; label: string }) {
  // The picture waits for the fonts, so no text reflows under its beat
  const fonts = useFontsReady()
  return (
    <section className={`fb-tile fb-tile--${area}`}>
      <p className="fb-copy">
        <b>{lead}</b> {children}
      </p>
      <div className="fb-picture-wrap" role="img" aria-label={label} data-ready={fonts || undefined}>
        {fonts && picture}
      </div>
    </section>
  )
}

// The tile owns the crop: a bleeding Stage takes its slot's current width, so
// it never slices a picture before the tile edge (bento.md, rules 8 and 12)
export function usePictureWidth(fallback = 340) {
  const [ref, size] = usePictureSize(fallback, 0)
  return [ref, size.width] as const
}

// Width and height of the picture's slot: the tile below its copy. For a
// picture that starts a gap under the copy and runs off the tile's foot,
// whatever the copy wraps to
export function usePictureSize(fallbackW = 340, fallbackH = 260) {
  // A callback ref: the picture mounts only once the fonts are in, after the
  // tile, so measure whenever it appears
  const [picture, ref] = useState<HTMLDivElement | null>(null)
  const [size, setSize] = useState({ width: fallbackW, height: fallbackH })
  useLayoutEffect(() => {
    const node = picture?.parentElement
    if (!node) return
    const measure = () => {
      const r = node.getBoundingClientRect()
      const next = { width: Math.max(1, Math.round(r.width)), height: Math.max(1, Math.round(r.height)) }
      setSize((was) => (was.width === next.width && was.height === next.height ? was : next))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [picture])
  return [ref, size] as const
}

// The five methods, in the widget's order (reference/onepoket-website.html)
export const METHODS = [
  { key: 'card', label: 'Card' },
  { key: 'apple', label: 'Apple Pay' },
  { key: 'google', label: 'Google Pay' },
  { key: 'cash', label: 'Cash App' },
  { key: 'bank', label: 'Bank' },
]
