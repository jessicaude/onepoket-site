# Rehearsal: the network (section 3)

Gold: `many-of-one`.

- **Kept from the gold:**
  - one store anatomy at one size;
  - a grid running off every edge, each edge cutting a tile by about half and never to a sliver;
  - one tile in focus, the only one with real words inside it.
- **Changed:**
  - **Full-bleed:** the band runs the page's full width (one Stage as wide as the page), on the page's wash, one step lighter in dark.
  - **Store names:** the stores nearest the focus show fictional wordmarks, at your request (the gold keeps words on the focus only). Further out, wordmarks are bars.
  - **Focus size:** the focus is larger than its cell: 1.1×, and 1.22× on bands 1200px and wider. The review asked for more presence; the gold keeps it the same size.

## Heading and copy

- **Heading:** "Pay the same way at every store."
- **Supporting line:** "Works at stores on the CentryOS network that offer OnePoket." It's body text, so OnePoket keeps its light "One" there. In the heading it would take the heading's weight.

## The picture

- **Each store:** a wordmark, two order lines, and the OnePoket sheet with its Pay button. The quiet stores' sheets show the "poket" wordmark without the mark, which would be a smudge at that size.
- **The focus, Kola Books:** "The Salt Road" $7.50 and "River Notes" $4.50 (which make $12.00), "Welcome back, Ada", and the button.
- **Story:** one beat, once, as the band scrolls in. Ada taps Pay (the button dips to 96%), then it confirms on itself: "Pay $12.00" becomes "Paid $12.00". The poster is the paid state. The background stays still: the bento rules give a section one small beat.
- **Receding stores:**
  - Light: white cards under a 45% veil of the band's wash. It looks exactly like 55% opacity, but nothing behind shows through.
  - Dark: opaque deep-green cards a step above the band, with muted light inks, so names stay faintly readable, matching the light theme.
- **The focus card:** keeps its light product colours in both themes.
- **Focus ring and shadow:**
  - Light: brand green.
  - Dark: a mint ring and a black shadow, with no light halo on the card below.
- **Tile sizing:** tile width flexes per band width (184 to 228px), and the focus's place is searched per width, so both side edges cut a tile by about half. No single width manages that everywhere: at 768, 200px tiles leave slivers or barely cut edges.
- **Wordmarks:** shown only on stores that are whole inside the band, so a name is never cut.
- **Ground:** the stores sit on one flat ground in the band's own colour.

## Captured

- **Gate:** 390, 768, 1024 and 1440, `--gate` light and `--dark` each. Results are under "Final gate and audit" below.
- **Screenshots:** full-section, reduced motion, light and OS dark, at each width.
- **Layout audit:** in-viewport, through the scroll wrapper, at 390, 768, 1024 and 1440, light and dark. Results are below.

## Final gate and audit

- **Gate (after the review fixes):** `rehearsal passed` with no lines on all eight runs: 390, 768, 1024 and 1440, light and dark. Every run reports `inconclusive` because of sampling gaps on this machine.
- **Layout audit:** `no-issues-detected` at 390, 768, 1024 and 1440, light and dark, checking 19, 31, 37 and 43 padded containers.

## Gate fixes, in order

- **`uneven: span.ss-bar runs into the right padding`:** the order-line bars were longer than the narrowest tile's line. They were shortened.
- **`uneven gutters`, 96px against 94px, at 390:** fixed by an exact, symmetric placement search.
- **`framing: only 52px of div.nw-store shows at the right edge`, at 768:** fixed by flexing the tile width.
- **`framing: real words "Marula & Co." are cut by the crop`, at 390:** wordmarks now show only on whole stores.
- **`uneven gutters`, 103/103/368, at 390.** The test reads any tile not cut at its sides or foot as a card floating on a plate. The tile above the focus is whole across at 390, and at that width every layout that cuts the edges by a third or more leaves one. In order:
  - A dashed network drawn underneath didn't count: the test needs a painted surface.
  - Showing less of the outer rows moved that tile's centre off the band, where nothing is hit.
  - Faint rails under each row passed, but the review read them as patches out of step with the cards.
  - The final answer: a flat ground layer in the band's own colour, under the cards, with the outer rows showing a little over half a tile.
- **`clipped glyph: div.nw-sheet > svg draws 126 units past its viewBox`:** the wordmark-only logo cropped its viewBox over the mark. It now leaves the mark's paths out entirely.

## Fresh-eye review (one round), and what changed

1. **Green patches in the gutters.** Removed: the rails were replaced by the flat ground.
2. **Dark background cards read grey.** They're now opaque deep-green cards with a hairline and light, muted inks.
3. **The focus was small at 1440 (about 9% of the band).** It's now 1.22× on bands 1200px and wider.
4. **Light and dark receded differently.** Matched: names stay faintly readable in both.
5. **Hierarchy otherwise sound.** No change.
6. **The payment had no cause.** A press (the button dips) now comes before "Paid".
7. **One beat, then stillness.** Declined: one small beat per section, and the paid frame is the poster.
8. **The logo mark was a smudge on the quiet cards.** They show the wordmark alone now.
9. **The focus shadow is faint in dark mode.** No change: the reviewer called it optional, and it lifts with the mint ring and a black shadow.

## Your review rounds, and what changed

- **The headline and its line:** replaced by the short heading and the supporting line.
- **A dark rectangle behind "stores":** I couldn't reproduce it in any screenshot, and nothing in the page paints behind the heading. The headline was replaced anyway.
- **OnePoket's weight:** the light "One" stays in body text only.
- **Focus presence:** the other stores recede and Kola Books comes forward.
- **Kola Books' order lines:** the two books and their prices.
- **Dark mode:** cards tinted toward the page's dark green rather than lowered in opacity, and no light halo under the focus.

## Assumptions

- **Store names:** invented fictional names alongside Ilé Living, Kola Books, Nori Tea and Ayo Studio: Okra Kitchen, Sabi Market, Marula & Co., Lumo Lamps and Tide Swim.
- **Book titles:** "The Salt Road" and "River Notes" are invented. Their prices add up to Kola Books' $12.00 from the reference.

## Not checked

- **Real-browser frame pacing:** only headless Chrome. Motion runs report `inconclusive` because of sampling gaps on this machine.
- **Bands wider than 1440:** the placement search covers any width, but none was filmed.
- **Dark contact sheets:** `film.mjs --dark` forces the stage's own kit theme, which this stage never uses, so dark mode was judged from OS-dark page screenshots.
- **Safari:** not tested.
